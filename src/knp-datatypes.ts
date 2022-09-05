import {
  SignalStatus,
  NavSignals,
  NKASysNumbers,
  BISPacketIDs,
  KNPReturnStatus,
  EphemeridesStatus,
  BisIDs,
} from "@/knp-common";

/** Массив счетчиков пакетов от одного Комплект */
type BisPacketCounters = {
  [K in typeof BISPacketIDs[number]]?: number;
};

/** Массив счетчиков пакетов от одной станции.
 * Ключи массива - ID Комплект.
 * По каждому ключу находится массив счетчиков пакетов от одного Комплект */
interface StationPacketCounters {
  [index: number]: BisPacketCounters;
}

/** Полные данные от КНП со счетчиками пакетов.
 * Ключи массива - ID станции.
 * По кажому ключу находится массив счетчиков пакетов от одной станции.
 */
interface AllPacketCounters {
  [index: number]: StationPacketCounters;
}

/** Данные временного ряда */
type TimeMomentData = {
  id: number;
  timestamp: Date;
};

/** Невязка */
type Residual = TimeMomentData & {
  residual: number;
  nka: typeof NKASysNumbers[number];
  bis: number;
  nkaElevation: number;
  nkaInGuaranteedElevation: boolean;
  status: boolean;
  delta: number;
  average: number;
};

/** Архивная невязка */
type ArchiveResidualSingle = TimeMomentData & {
  nkaId: typeof NKASysNumbers[number];
  bisId: number;
  residual: number;
  delta: number;
};

/** Архивная средняя невязка */
type ArchiveAvgResidualSingle = TimeMomentData & {
  bisId: number;
  average: number;
};

/** Набор архивных невязок */
type ArchiveResiduals = {
  [index: number]: ArchiveResidualSingle[];
} & {
  ["average"]: ArchiveAvgResidualSingle[];
};

/** Набор архивных невязок */
type ArchiveNavSolution = TimeMomentData & {
  bisId: number;
  e: number;
  n: number;
  u: number;
  dt: number;
};

/** Статус наличия соединения с Комплект и данных от него.
 * Ключ connected - флаг наличия соединения,
 * ключ data - флаг наличия данных.
 * Ключи могут принимать значения true (присутствует) / false (отсутствует).
 */
interface BisConnectionStatus {
  connected: boolean;
  data: boolean;
}

/** Обобщенные данные о приеме НС с НКА */
type NKASummarySignalReceiveStatus = {
  [key in NavSignals]: SignalStatus;
};

type SummarySignalReceiveStatus = {
  [K in typeof NKASysNumbers[number]]: NKASummarySignalReceiveStatus;
};

/** Оперативная ЦИ, пришедшая с t_k не подряд */
type TKNotSequential = Array<{
  nkaSysNumber: typeof NKASysNumbers[number];
  tK: number;
  diff: number;
}>;

/** Ответ сервера КНП на POST запросы */
type KNPResponse = {
  status: KNPReturnStatus;
  description: string;
  result: string;
};

/** Контроль согласованности ЭИ на соседних интервалах */
type ControlConsistEphInf = {
  [key in typeof NKASysNumbers[number]]: EphemeridesStatus;
};

/** Список Комплектов */
type BISList = {
  bisId: typeof BisIDs[number];
  bisNumber: number;
  stationId: number;
}[];

/** Решение навигационной задачи */
type NavSolution = TimeMomentData & {
  bis: number;
  latitude: number;
  longitude: number;
  height: number;
  e: number;
  n: number;
  u: number;
  dt: number;
  distance: number;
  gDOP: number; // LOL, камелизация превращает GDOP в gDOP
  nkaList: string;
  excluded: boolean;
};

/** Угол места и азимут НКА от Комплект в указанное время */
type CurrentAngles = {
  nkaNumber: typeof NKASysNumbers[number];
  bisId: typeof BisIDs[number];
  timestamp: Date;
  elevation: number;
  azimuth: number;
};

/** Единичная запись результатов сравнения кадра и СИ */
type ComparisonRecord = {
  param: string;
  si: number;
  di: number;
  diff: number;
};

/** Результат сравнения кадра и СИ */
type Comparison = {
  time: {
    tb: number;
    nt: number;
    na: number;
    timestamp: Date;
  };
  result: ComparisonRecord[];
};

export {
  TimeMomentData,
  AllPacketCounters,
  SummarySignalReceiveStatus,
  BisConnectionStatus,
  KNPResponse,
  Residual,
  ControlConsistEphInf,
  TKNotSequential,
  NavSolution,
  CurrentAngles,
  BISList,
  ArchiveResidualSingle,
  ArchiveAvgResidualSingle,
  ArchiveResiduals,
  ArchiveNavSolution,
  Comparison,
  ComparisonRecord,
};
