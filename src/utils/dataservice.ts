import { reactive, onBeforeUnmount } from 'vue';
import { DataExchange } from './dataexchangeservice';

/** DEPRECATED
 * Класс данных, получаемых от сервера КНП
 * Он нужен для того, чтобы существующие модули, которые используют этот класс,
 * работали с классом обмена данных
*/
class KNPData<T> extends DataExchange<T> {
  updateRate = 1000;

  public get lastUpdate() {
    return this.lastGet;
  }
}

/** DEPRECATED
 *  Сервис автоматического получения и обновления реактивных данных, получаемых от сервера КНП
 * @param url - URL данных, без /api/v1
 * @param updateData - период запроса данных от сервера КНП, мс
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function knpDataService<T>({ url, updateRate }: { url: string; updateRate?: number; }) {
  const dataGetter = reactive(new KNPData<T>({ url, updateRate }));
  dataGetter.init();
  onBeforeUnmount(() => { dataGetter.stop(); });
  return dataGetter;
}

export { KNPData, knpDataService };
