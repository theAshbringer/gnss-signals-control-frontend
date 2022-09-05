import { NKASysNumbers, BisIDs, OFFrameStringNumbers, SFFrameStringNumbers } from "./knp-common";
import { OFStrFieldNames } from "./knp-lang";

/** Цифровая информация L1OF */
type L1OFDi = Array<string>;

/** Параметры для запроса цифровой информации L1OF с сервера */
type L1OFDiQueryParams = {
  /** Номер КА */
  nka: typeof NKASysNumbers[number];
  /** Начало запрашиваемого периода времени */
  start: string;
  /** Конец запрашиваемого периода времени */
  end: string;
};

/** Метаинформация кадра ЦИ открытых сигналов с частотным разделением */
type OFMeta = {
  /** ID кадра в ЛБД */
  frameId: number;
  /** ID Комплект в ЛБД */
  bisId: typeof BisIDs[number];
  /** ID станции в ЛБД */
  stationId: number;
  /** Номер НКА */
  nka: typeof NKASysNumbers[number];
  /** tk кадра */
  tk: number;
  /** Номер кадра по порядку от начала суток */
  seq: number;
  /** Номер кадра по порядку в суперкадре */
  num: number;
  /** Флаг "все ли строки приняты для данного кадра" */
  isComplete: boolean;
  /** Флаг "пятый ли это кадр в суперкадре" */
  isFifth: boolean;
  /** Номинальное датавремя первой строки первого кадра */
  timestamp: string;
};

/** Метаинформация кадра ЦИ закрытых сигналов с частотным разделением */
type SFMeta = {
  /** ID кадра в ЛБД */
  frameId: number;
  /** ID Комплект в ЛБД */
  bisId: typeof BisIDs[number];
  /** ID станции в ЛБД */
  stationId: number;
  /** Номер НКА */
  nka: typeof NKASysNumbers[number];
  /** tk кадра */
  tk: number;
  /** Номер кадра по порядку от начала суток */
  seq: number;
  /** Номер кадра по порядку в суперкадре */
  num: number;
  /** Флаг "все ли строки приняты для данного кадра" */
  isComplete: boolean;
  /** Номинальное датавремя первой строки первого кадра */
  timestamp: string;
};

/** Массив метаинформации кадров ЦИ открытых сигналов с частотным разделением */
type OFFrames = Array<OFMeta>;

/** Массив метаинформации кадров ЦИ закрытых сигналов с частотным разделением */
type SFFrames = Array<SFMeta>;

/** Параметры для запроса списка кадров ЦИ открытых сигналов с частотным разделением с сервера  */
type FrameListRequest = {
  /** Номер КА */
  nka: typeof NKASysNumbers[number];
  /** ID Комплект в ЛБД */
  bis: typeof BisIDs[number];
  /** Начало периода запрашиваемого времени */
  start: string;
  /** Конец периода запрашиваемого времени */
  end: string;
};

/** Параметры для запроса по ИД Комплект и интервалу времени  */
type BISAndPeriodRequestParams = {
  /** ID Комплект в ЛБД */
  bis: typeof BisIDs[number];
  /** Начало периода запрашиваемого времени */
  start: string;
  /** Конец периода запрашиваемого времени */
  end: string;
};

/** Слово кадра цифровой информации */
type StrField = {
  val: number; // значение величины (по ИКД "Навигационный радиосигнал в диапазонах L1, L2 (редакция 5.1)")
  raw: string; // биты в виде строки нулей и единиц
};

/** Строка кадра ЦИ открытых сигналов с ЧР */
type OFFrameString =
  | Omit<
      {
        [K in typeof OFStrFieldNames[number]]?: StrField;
      },
      "m"
    >
  | { m: StrField };

/** Строка кадра ЦИ закрытых сигналов с ЧР */
type SFFrameString = string;

/** Кадр ЦИ открытых сигналов с ЧР */
type OFFrame = {
  meta: OFMeta;
  content: {
    [K in typeof OFFrameStringNumbers[number]]: OFFrameString;
  };
};

/** Кадр ЦИ закрытых сигналов с ЧР */
type SFFrame = {
  meta: SFMeta;
  content: {
    [K in typeof SFFrameStringNumbers[number]]: SFFrameString;
  };
};

/** Параметры для запроса кадра ЦИ открытых сигналов с ЧР с сервера */
type SingleFrameRequest = {
  /** ID кадра в ЛБД */
  id: number;
};

export {
  L1OFDi,
  L1OFDiQueryParams,
  OFMeta,
  OFFrames,
  OFFrame,
  FrameListRequest,
  SingleFrameRequest,
  OFFrameString,
  SFMeta,
  SFFrames,
  SFFrame,
  SFFrameString,
  BISAndPeriodRequestParams,
};
