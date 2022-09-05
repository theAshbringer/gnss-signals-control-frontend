import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { camelizeKeys, decamelizeKeys } from "humps";

// https://stackoverflow.com/questions/65692061/casting-dates-properly-from-an-api-response-in-typescript
// https://stackoverflow.com/questions/70689305/customizing-date-serialization-in-axios
// https://stackoverflow.com/questions/47213651/caught-between-two-no-restricted-syntax-violations

// регулярка для проверки: является ли строка представлением даты-времени?
const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

/** Является ли строка представлением даты-времени? */
function isIsoDateString(value: any): boolean {
  return value && typeof value === "string" && isoDateFormat.test(value);
}
/** Функция обработки даты-времени в данных
 *  Конвертирует все найденные строки, содержащие дату-время, в объект Date
 */
function handleDates(payload: any): any {
  if (payload === null || payload === undefined) {
    return payload;
  }
  if (Array.isArray(payload)) {
    return payload.map((val) => handleDates(val));
  }
  if (typeof payload === "object") {
    Object.keys(payload).forEach((key) => {
      const value = payload[key];
      if (isIsoDateString(value)) {
        // eslint-disable-next-line no-param-reassign
        payload[key] = new Date(value);
      }
      if (typeof value === "object" || Array.isArray(value)) {
        handleDates(value);
      }
    });
  }
  return payload;
}

const baseURL = process.env.VUE_APP_API_BASEURL;

/** Экземпляр axios для доступа к API КНП */
const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "content-type": "application/json",
  },
});

// Гайд по работе с camelCase и snake_case в запросах и ответах axios
// https://morioh.com/p/8e8b33c25ea1
apiClient.interceptors.response.use((response: AxiosResponse) => {
  if (response.data && response.headers["content-type"] === "application/json") {
    // eslint-disable-next-line no-param-reassign
    response.data = camelizeKeys(response.data);
  }
  // обрабатываем дату-время
  // eslint-disable-next-line no-param-reassign
  response = handleDates(response);
  return response;
});

apiClient.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.params) {
    // eslint-disable-next-line no-param-reassign
    config.params = decamelizeKeys(config.params);
  }
  if (config.data) {
    // eslint-disable-next-line no-param-reassign
    config.data = decamelizeKeys(config.data);
  }
  return config;
});

export default apiClient;
