/** В этом файле размещены константы, типы/интерфейсы и словари, относящиеся
 * к компоненту BisConfig.vue, который отвечает за конфигурацию контроля Комплект на сервере */

/** Наименования численных настроек в конфиге Комплект.
 * Аналогичны тем, что приходят с сервера, только в camelCase */
const BisConfigSettingNameNumeric = [
  "signalCompletenessPercent",
  "signalStoringTime",
  "stationReceivingThreshold",
  "stationReceivingErrorThreshold",
  "stationVisibilityThreshold",
  "residualPairsDifferenceThreshold",
  "residualAverageDifferenceThreshold",
  "ephemeridesControlThreshold",
  "digitalInfoTransmittingDelayThreshold",
  "minElevationForNavSolution",
  "signalValidityPercent",
  "signalValidityAnalyzingTime",
  "stationValidityThreshold",
  "stationValidityErrorThreshold",
] as const;

/** Наименования булевых настроек (чекбоксов) в конфиге Комплект.
 * Аналогичны тем, что приходят с сервера, только в camelCase */
const BisConfigSettingNameBoolean = [
  "useSingleFreqNka",
  "checkPacketReceiveTime",
  "checkDiReceiveInTime",
] as const;

/** Наименования ВСЕХ настроек в конфиге Комплект */
const BisConfigSettingName = [
  ...BisConfigSettingNameNumeric,
  ...BisConfigSettingNameBoolean,
] as const;

// ======================Типы=================================
/** Тип для конфигурации контроля Комплект (для численных настроек) */
type BisControlConfigNumeric = {
  [K in typeof BisConfigSettingNameNumeric[number]]?: number;
};

/** Тип для конфигурации контроля Комплект (для булевых настроек) */
type BisControlConfigBoolean = {
  [K in typeof BisConfigSettingNameBoolean[number]]?: boolean;
};

/** Тип для конфигурации контроля Комплект (для ВСЕХ (численные + булевые) настроек) */
type BisControlConfig = BisControlConfigNumeric & BisControlConfigBoolean;

/** Тип параметров, необходимых для отрисовки одной настройки для конфигурации Комплект в шаблоне */
interface BisControlConfigUIItem {
  label: string;
  defaultValue: number;
  minRangeValue: number;
  maxRangeValue?: number;
}

/** Тип параметров, необходимых для отрисовки всех настроек для конфигурации Комплект в шаблоне */
interface BisControlConfigUI {
  num: { [K in typeof BisConfigSettingNameNumeric[number]]: BisControlConfigUIItem };
  bool: { [K in typeof BisConfigSettingNameBoolean[number]]: BisControlConfigUIItem };
}

// ======================Словари===============================
/** Параметры для отрисовки настроек для конфигурации Комплект в шаблоне */
const BisControlConfigUI: BisControlConfigUI = {
  num: {
    signalStoringTime: {
      label: "Глубина буфера сигналов для определения состояния приема [сек]",
      defaultValue: 10,
      minRangeValue: 1,
      maxRangeValue: 30,
    },
    signalCompletenessPercent: {
      label: 'Порог для определения состояния "Сбой" [%]',
      defaultValue: 90,
      minRangeValue: 1,
      maxRangeValue: 100,
    },
    stationVisibilityThreshold: {
      label: 'Кол-во станций для определения обобщенного состояния приема сигнала "Не определено"',
      defaultValue: 1,
      minRangeValue: 1,
    },
    stationReceivingThreshold: {
      label: 'Кол-во станций для определения обобщенного состояния приема сигнала "Прием"',
      defaultValue: 1,
      minRangeValue: 1,
    },
    stationReceivingErrorThreshold: {
      label: 'Кол-во станций для определения обобщенного состояния приема сигнала "Сбой"',
      defaultValue: 1,
      minRangeValue: 1,
    },
    residualPairsDifferenceThreshold: {
      label: "Порог для парных разностей невязок [м]",
      defaultValue: 5,
      minRangeValue: 0,
    },
    residualAverageDifferenceThreshold: {
      label: "Порог для разности невязки и средней невязки [м]",
      defaultValue: 10,
      minRangeValue: 0,
    },
    ephemeridesControlThreshold: {
      label: "Порог для согласованности ЭИ на границе двух интервалов tb [м]",
      defaultValue: 2,
      minRangeValue: 0,
    },
    digitalInfoTransmittingDelayThreshold: {
      label: "Порог для своевременности приема ЦИ [с]",
      defaultValue: 10,
      minRangeValue: 0,
    },
    minElevationForNavSolution: {
      label: "Порог для вынесения решения об использовании невязок в решении НВЗ [угл. град]",
      defaultValue: 15,
      minRangeValue: 0,
    },
    signalValidityPercent: {
      label: "Порог для определения годности сигнала [%]",
      defaultValue: 90,
      minRangeValue: 1,
      maxRangeValue: 100,
    },
    signalValidityAnalyzingTime: {
      label: "Глубина буфера сигналов для определения годности [сек]",
      defaultValue: 10,
      minRangeValue: 1,
      maxRangeValue: 30,
    },
    stationValidityThreshold: {
      label: "Кол-во станций для определения обобщенного состояния годности сигнала",
      defaultValue: 1,
      minRangeValue: 1,
    },
    stationValidityErrorThreshold: {
      label: "Кол-во станций для определения обобщенного состояния негодности сигнала",
      defaultValue: 1,
      minRangeValue: 1,
    },
  },
  bool: {
    useSingleFreqNka: {
      label: "Использовать одночастотные КА в решении НВЗ?",
      defaultValue: 0,
      minRangeValue: 0,
      maxRangeValue: 1,
    },
    checkPacketReceiveTime: {
      label: "Отбрасывать пакеты с запаздыванием более 10 секунд из обработки?",
      defaultValue: 0,
      minRangeValue: 0,
      maxRangeValue: 1,
    },
    checkDiReceiveInTime: {
      label: "Использовать ЦИ, запаздывание которой превышает порог для своевременности приема ЦИ?",
      defaultValue: 0,
      minRangeValue: 0,
      maxRangeValue: 1,
    },
  },
} as const;

export {
  BisConfigSettingNameNumeric,
  BisConfigSettingNameBoolean,
  BisConfigSettingName,
  BisControlConfigNumeric,
  BisControlConfigBoolean,
  BisControlConfig,
  BisControlConfigUIItem,
  BisControlConfigUI,
};
