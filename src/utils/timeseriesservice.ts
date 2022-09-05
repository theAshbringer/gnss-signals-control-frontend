import { onBeforeUnmount, reactive } from "vue";
import { TimeMomentData } from "@/knp-datatypes";
import { DataExchange } from "@/utils/dataexchangeservice";
import TTLBuffer from "./ttlbuffer";

/** Тип ключа группировки. Содержит ключи тех атрибутов из T extends TimeMomentData,
которые имеют тип number */
type Grouper<T extends TimeMomentData> = {
  [P in keyof T]: T[P] extends number | boolean ? P : never;
}[keyof T];

/** Функция группировки данных из массива по признаку (ключу) */
function groupByKey<T extends TimeMomentData>(
  data: T[],
  key: Grouper<T>
): { [index: number]: T[] } {
  const grouped = data.reduce((r, a) => {
    // eslint-disable-next-line no-param-reassign
    r[a[key]] = r[a[key]] || [];
    r[a[key]].push(a);
    return r;
  }, Object.create(null));
  return grouped;
}

/** Тип группы */
type GroupedTTLData<T extends TimeMomentData> = {
  [index: number]: TTLBuffer<T>;
};

/** Класс группированных временных данных с автообновлением */
class KNPGroupedTimeSeriesData<T extends TimeMomentData> extends DataExchange<T[]> {
  /** глубина буфера, с */
  public depth = 30;

  /** признак по которому выполняется группировка */
  public groupBy: Grouper<T> | undefined;

  public groupedData: GroupedTTLData<T>;

  /** текущая глубина "недостающих" данных, с */
  private currentLimit = 30;

  constructor({
    url,
    updateRate,
    depth,
    startImmediately,
  }: {
    url: string;
    depth?: number;
    updateRate?: number;
    startImmediately?: boolean;
  }) {
    super({ url, updateRate, startImmediately });
    this.depth = depth === undefined ? 30 : depth;
    this.groupedData = {};
  }

  /** Расчет глубины запроса данных, с
   *   Возвращает количество секунд, которые прошли
   *   от момента самых "свежих" данных до текущего момента
   */
  calculateCurrentLimit(): number {
    // инициализируем максимально возмножной глубиной
    let currentLimit = this.depth;
    if (Object.keys(this.groupedData).length === 0) {
      return currentLimit;
    }
    if (this.groupBy) {
      // по каждой группе
      for (const key in this.groupedData) {
        // "защищаем" for-in https://eslint.org/docs/rules/guard-for-in
        if (Object.prototype.hasOwnProperty.call(this.groupedData, key)) {
          // получаем глубину "недостающих" данных
          const thisBufferLimit = this.groupedData[<any>key].firstTimedeltaFromNow();
          // если она меньше текущей глубины, то перезаписываем
          if (thisBufferLimit < currentLimit) {
            currentLimit = thisBufferLimit;
          }
        }
      }
    }
    return currentLimit;
  }

  /** Очистка буферов от протухших значений
   */
  expireBuffers(): void {
    if (this.groupBy) {
      // по каждой группе
      for (const groupKey in this.groupedData) {
        // "защищаем" for-in https://eslint.org/docs/rules/guard-for-in
        if (Object.prototype.hasOwnProperty.call(this.groupedData, groupKey)) {
          this.groupedData[<any>groupKey].expire();
        }
      }
    }
  }

  deleteEmptyBuffers(): void {
    if (this.groupBy) {
      // по каждой группе
      for (const groupKey in this.groupedData) {
        // "защищаем" for-in https://eslint.org/docs/rules/guard-for-in
        if (Object.prototype.hasOwnProperty.call(this.groupedData, groupKey)) {
          delete this.groupedData[<any>groupKey];
        }
      }
    }
  }

  emptyData(): void {
    this.groupedData = {};
    this.available = false;
  }

  /** Функция определения глубины запроса перед запросом
   */
  determineGetParams(): { [index: string]: string | number } {
    this.currentLimit = this.calculateCurrentLimit();
    return { limit: this.currentLimit };
  }

  /** Обработка полученных данных
   * Обновляет буферы и распихивает полученные данные по буферам
   */
  processRecievedData(newData: T[]): void {
    this.expireBuffers();
    if (this.groupBy) {
      // разбиваем массив по признаку группировки
      const grouped = groupByKey(newData, this.groupBy);

      // по каждому сгруппированному массиву
      for (const groupKey in grouped) {
        // "защищаем" for-in https://eslint.org/docs/rules/guard-for-in
        if (Object.prototype.hasOwnProperty.call(grouped, groupKey)) {
          // если буфер группы не существует, то создаем его
          if (!this.groupedData[groupKey]) {
            this.groupedData[groupKey] = new TTLBuffer<T>({ depth: this.depth });
          }
          // добавляем в буфер соответствующие полученные данные
          this.groupedData[groupKey].append(grouped[groupKey]);
        }
      }
    }
  }

  /** установка новой глубины буферов */
  setDepth(newDepth: number): void {
    this.stop();
    this.whenLoaded(() => {
      this.depth = newDepth;
      this.emptyData();
      this.start();
    });
  }

  /** установка нового признака группировки */
  setGroup(group: Grouper<T>): void {
    this.stop();
    this.whenLoaded(() => {
      this.groupBy = group;
      this.emptyData();
      this.start();
    });
  }

  /** Хелпер. Ждёт пока сервис закончит получать  */
  whenLoaded(callback: () => void): void {
    if (this.loading) {
      setTimeout(() => {
        this.whenLoaded(callback);
      }, 100);
    } else {
      callback();
    }
  }
}

/** Сервис автоматического получения и обновления реактивных группированных временных данных,
 * получаемых от сервера КНП
 * @param url - URL данных, без /api/v1
 * @param updateData - период запроса данных от сервера КНП, мс
 * @param depth - глубина требуемых данных от сервера КНП, с
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function knpGroupedTimeSeriesDataService<T extends TimeMomentData>({
  url,
  updateRate,
  depth,
  startImmediately,
}: {
  url: string;
  depth?: number;
  updateRate?: number;
  startImmediately?: boolean;
}) {
  const dataGetter = reactive(
    new KNPGroupedTimeSeriesData<T>({
      url,
      depth,
      updateRate,
      startImmediately,
    })
  );
  onBeforeUnmount(() => {
    dataGetter.stop();
  });
  return dataGetter;
}

export { knpGroupedTimeSeriesDataService, KNPGroupedTimeSeriesData, Grouper };
