import { reactive, onBeforeUnmount } from "vue";
import { KNPResponse } from "@/knp-datatypes";
import apiClient from "@/http-common";
import { KNPReturnStatus } from "@/knp-common";

/** Класс обмена данными с сервером КНП
 * Позволяет получать и отправлять на сервер данные
 */
class DataExchange<T> {
  constructor({
    url,
    updateRate,
    startImmediately,
  }: {
    url: string;
    updateRate?: number;
    startImmediately?: boolean;
  }) {
    this.updateRate = updateRate === undefined ? 0 : updateRate;
    this.startImmediately = startImmediately === undefined ? true : startImmediately;
    this.url = url;
    this.data = undefined;
    this.available = false;
    this.loading = false;
    this.loadingFailed = false;
    this.posting = false;
    this.postingFailed = false;
    this.intervalID = undefined;
    this.getParams = {};
    this._isDataNotEmpty = false;
  }

  /** если startImmediately == true | undefined, то
   * запрашивает данные и начинает периодические запросы  */
  init(): void {
    if (this.startImmediately) {
      this.get();
      this.start();
    }
  }

  /** Запуск периодических запросов  */
  start(): void {
    if (this.updateRate && this.intervalID === undefined) {
      this.intervalID = setInterval(() => {
        this.get();
      }, this.updateRate);
    }
  }

  /** Реализует запрос данных */
  get(): void {
    if (!this.loading) {
      this.loading = true;
      const params = this.currentGetParams();
      apiClient
        .get<T>(this.url, { params })
        .then((response) => {
          this.processRecievedData(response.data);
          this.loading = false;
          this.available = true;
          this.lastGet = new Date();
          this.loadingFailed = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.loadingFailed = true;
          this.lastGetFail = new Date();
        });
    }
  }

  /** Реализует отправку данных */
  post(newData: T): void {
    if (!this.posting) {
      this.posting = true;
      apiClient
        .post<KNPResponse>(this.url, newData)
        .then((response) => {
          this.posting = false;
          this.postStatus = response.data.status;
          if (this.postStatus !== KNPReturnStatus.OK) {
            this.postingFailed = true;
            this.lastPostFail = new Date();
          } else {
            this.postingFailed = false;
            this.lastPost = new Date();
          }
        })
        .catch((error) => {
          console.log(error);
          this.posting = false;
          this.postingFailed = true;
          this.lastPostFail = new Date();
        });
    }
  }

  /** Оканчивает периодические запросы */
  stop(): void {
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = undefined;
    }
  }

  /** Подготавливает URL параметры GET запроса
   * Берёт параметры из this.getParams и объединяет их с результатом вызова
   * this.determineGetParams
   */
  currentGetParams(): { [index: string]: string | number } {
    return Object.assign(this.getParams, this.determineGetParams());
  }

  /** Функция определения параметров Get запроса "на лету"
   * Если требуется, то может быть переопределена в дочернем классе
   */
  determineGetParams(): { [index: string]: string | number } {
    return this.getParams;
  }

  /** Функция работы с полученными данными.
   * Если требуется, то может быть переопределена в дочернем класе
   */

  processRecievedData(newData: T): void {
    this.data = newData;
  }

  /** Геттер для флага, содержат ли данные полезную информацию (не пустая сущность) */
  get isDataNotEmpty() {
    if (!this.available) return false;
    if (!this.data) return false;
    if (Array.isArray(this.data)) return this.data.length > 0;
    if (Object.prototype.toString.call(this.data) === "[object Object]") {
      return Object.keys(this.data!).length !== 0;
    }
    return true;
  }

  /** Целевые получаемые от сервера данные */
  data: T | undefined;

  /** Период запроса данных, мс */
  updateRate: number;

  /** URL запрашиваемых данных без /api/v1 */
  url = "";

  /** ID интервала периодического запроса данных */
  intervalID: number | undefined;

  /** Данные доступны */
  available: boolean;

  /** Осуществляется запрос данных */
  loading: boolean;

  /** Дата последнего успешного получения данных */
  lastGet: Date | undefined;

  /** Дата последней ошибки получения данных */
  lastGetFail: Date | undefined;

  /** Во время выполнения предыдущего запроса произошла ошибка */
  loadingFailed: boolean;

  /** Данные отправляются */
  posting: boolean;

  /** Дата последнего успешной отправки данных */
  lastPost: Date | undefined;

  /** Дата последней ошибки отправки данных */
  lastPostFail: Date | undefined;

  /** Во время выполнения предыдущей отправки произошла ошибка */
  postingFailed: boolean;

  /** Статус отправки данных */
  postStatus: KNPReturnStatus | undefined;

  /** Параметры Get запроса */
  getParams: { [index: string]: string | number };

  /** Начинать ли загрузку сразу же после сетапа? */
  startImmediately: boolean;

  /** Флаг того, содержат ли данные полезную информацию */
  _isDataNotEmpty: boolean;
}

/** Фабрика реактивных сервисов данных КНП
 * @param url - URL данных, без /api/v1
 * @param updateData - период запроса данных от сервера КНП, мс
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function setupDataService<T>({
  url,
  updateRate,
  startImmediately,
}: {
  url: string;
  updateRate?: number;
  startImmediately?: boolean;
}) {
  const dataGetter = reactive(new DataExchange<T>({ url, updateRate, startImmediately }));
  dataGetter.init();
  onBeforeUnmount(() => {
    dataGetter.stop();
  });
  return dataGetter;
}

export { DataExchange, setupDataService };
