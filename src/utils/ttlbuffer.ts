import { TimeMomentData } from '@/knp-datatypes';
/** Класс-хранилище данных с заданным TTL (time to live).
 *  Данные доступны по .data
 *  Этот геттер возвращает массив, отсортированный по id элементов.
 *  Добавление данных осуществляется с помощью .append()
 *  При добавлении данных автоматически происходит удаление из буфера
 *  элементов с истекшим "сроком годности" (.expire())
 *  При необходимости .expire() можно вызывать отдельно
 */
class TTLBuffer<T extends TimeMomentData> {
  constructor({ data, depth }: { data?: T[]; depth: number; }) {
    this._data = data === undefined ? [] : data;
    this.depth = depth;
  }

  // хранилище данных
  private _data: T[];

  /** Геттер данных из буфера */
  public get data(): T[] {
    return this._data;
  }

  /** Глубина хранения данных, с */
  public depth: number;

  /** Текущее количество данных, шт */
  public get length(): number {
    return this._data.length;
  }

  /** Добавление новых данных в буфер, с */
  append(newData: T[]): void {
    // очищаем буфер от протухших элементов
    this.expire();
    // сортируем новые данные
    const newDataSorted = newData.sort((a, b) => a.id - b.id);
    // если буфер пустой, то
    if (this._data.length === 0) {
      // заполняем его новыми данными
      this._data = newDataSorted;
      return;
    }
    // иначе
    // определяем id самого "свежего" элемента в буфере
    const lastID = this.data[this.data.length - 1].id;
    // проходимся по новым данным (они отсортированны по id)
    for (let i = 0; i < newDataSorted.length; i += 1) {
      // если id элемента из новых данных больше id самого "свежего" элемента в бфуере
      if (newDataSorted[i].id > lastID) {
        // то добавляем новые данные от i-го до последнего в буфер
        this._data = this._data.concat(newDataSorted.slice(i));
        // и заканчиваем
        break;
      }
    }
  }

  /** Функция расчета времени в секундах, прошедшего от timestamp
   *  самого свежего элемента в буфере до текущего момента
   */
  firstTimedeltaFromNow(): number {
    // если буфер пустой, то вернём его глубину
    if (this.data.length === 0) { return this.depth; }

    // иначе определим текущее время
    const now = new Date().getTime();
    // определим время по timestamp самого свежего элемента
    const first = this.data[this.data.length - 1].timestamp.getTime();
    // вернём разницу в секундах
    return Math.ceil((now - first) / 1000);
  }

  /** Функция удаления из буфера "протухших" элементов */
  expire(): void {
    // определяем границу (срок годности)
    const boundaryDate = new Date().getTime() - this.depth * 1000;
    // фильтруем по timestamp элементов
    this._data = this._data.filter(
      (data) => data.timestamp.getTime() > boundaryDate,
    );
  }
}

export default TTLBuffer;
