const NKASysNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
] as const;

const BisIDs = [1] as const;

const BISPacketIDs = [1, 17, 33, 49, 50, 51, 52, 53, 54, 65] as const;

/** Перечисление состояний радиовидимости */
enum Visibility {
  GUARANTEED = 2, // гарантирован
  MAYBE = 1, // возможен
  OUT_OF_SIGHT = 0, // вне зоны радиовидимости
}

/** Перечисление состояний приема сигналов */
enum SignalStatus {
  RECEIVE = 4, // прием
  ERROR = 3, // сбой
  UNAVAILABLE = 2, // отсутствует
  UNDEFINED = 1, // не определено
  OUT_OF_SIGHT = Visibility.OUT_OF_SIGHT, // вне зоны радиовидимости
  NOT_ON_AIR = -1, // сигнал не излучается
}

// Здесь какая-то лютая дичь, но пришлось записать два раза практически одно и то же

/** Список кодов сигналов */
const NavSignalsCodes = [
  0x01, 0x21, 0x09, 0x29, 0x16, 0x56, 0x06, 0x46, 0x26, 0x66, 0x0e, 0x4e, 0x2e, 0x6e,
] as const;

/** Перечисление кодов сигналов */
enum NavSignals {
  L1OF = 0x01,
  L1SF = 0x21,
  L2OF = 0x09,
  L2SF = 0x29,
  L3OCd = 0x16,
  L3OCp = 0x56,
  L1OCd = 0x06,
  L1OCp = 0x46,
  L1SCd = 0x26,
  L1SCp = 0x66,
  L2_CSI = 0x0e,
  L2OCp = 0x4e,
  L2SCd = 0x2e,
  L2SCp = 0x6e,
}

/** Перечисление кодов возврата сервера в ответ на POST */
enum KNPReturnStatus {
  OK = 0, // согласованы
  DECODE_ERROR = -1, // ошибка декодирования JSON
  DATA_FORMAT_ERROR = -2, // неверный формат данных
  EXCESSIVE_DATA = -3, // получены избыточные данные в запросе
  BAD_DATA = -4, // некорректные данные
}

/** Перечисление кодов состояний согласованности ЭИ на соседних интервалах */
enum EphemeridesStatus {
  OK = 2, // ЭИ согласована
  NO_DATA = 1, // нет данных
  INCONSIST = 0, // ЭИ не согласована
}

/** Валидные номера строк для кадра ЦИ открытого сигнала с част. раздел. */
const OFFrameStringNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] as const;

/** Валидные номера строк для кадра ЦИ открытого сигнала с част. раздел. */
const SFFrameStringNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export {
  Visibility,
  SignalStatus,
  NavSignals,
  NKASysNumbers,
  NavSignalsCodes,
  BISPacketIDs,
  KNPReturnStatus,
  BisIDs,
  OFFrameStringNumbers,
  SFFrameStringNumbers,
  EphemeridesStatus,
};
