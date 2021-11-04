import _ from "lodash";

export const common = [
  { code: "HKI", name: "Helsinki" },
  { code: "PSL", name: "Pasila" },
];

export const directionSiuntio = [
  { code: "ILA", name: "Ilmala" },
  { code: "HPL", name: "Huopalahti" },
  { code: "VMO", name: "Valimo" },
  { code: "PJM", name: "Pitäjänmäki" },
  { code: "MÄK", name: "Mäkkylä" },
  { code: "LPV", name: "Leppävaara" },
  { code: "KIL", name: "Kilo" },
  { code: "KEA", name: "Kera" },
  { code: "KNI", name: "Kauniainen" },
  { code: "KVH", name: "Koivuhovi" },
  { code: "TRL", name: "Tuomarila" },
  { code: "EPO", name: "Espoo" },
  { code: "KLH", name: "Kauklahti" },
  { code: "MAS", name: "Masala" },
  { code: "JRS", name: "Jorvas" },
  { code: "TOL", name: "Tolsa" },
  { code: "KKN", name: "Kirkkonummi" },
  { code: "STI", name: "Siuntio" },
];

export const ringTrackCW = [
  { code: "ILA", name: "Ilmala" },
  { code: "HPL", name: "Huopalahti" },
  { code: "POH", name: "Pohjois-Haaga" },
  { code: "KAN", name: "Kannelmäki" },
  { code: "MLO", name: "Malminkartano" },
  { code: "MYR", name: "Myyrmäki" },
  { code: "LOH", name: "Louhela" },
  { code: "MRL", name: "Martinlaakso" },
  { code: "VKS", name: "Vantaankoski" },
  { code: "VEH", name: "Vehkala" },
  { code: "KTÖ", name: "Kivistö" },
  { code: "AVP", name: "Aviapolis" },
  { code: "LEN", name: "Lentoasema (Airport)" },
  { code: "LNÄ", name: "Leinelä" },
  { code: "HKH", name: "Hiekkaharju" },
  { code: "TKL", name: "Tikkurila" },
  { code: "PLA", name: "Puistola" },
  { code: "TNA", name: "Tapanila" },
  { code: "ML", name: "Malmi" },
  { code: "PMK", name: "Pukinmäki" },
  { code: "OLK", name: "Oulunkylä" },
  { code: "KÄP", name: "Käpylä" },
];

export const ringTrackCCW = ringTrackCW.reverse();

export const directionTampere = [
  { code: "KÄP", name: "Käpylä" },
  { code: "OLK", name: "Oulunkylä" },
  { code: "PMK", name: "Pukinmäki" },
  { code: "ML", name: "Malmi" },
  { code: "TNA", name: "Tapanila" },
  { code: "PLA", name: "Puistola" },
  { code: "TKL", name: "Tikkurila" },
  { code: "HKH", name: "Hiekkaharju" },
  { code: "KVY", name: "Koivukylä" },
  { code: "RKL", name: "Rekola" },
  { code: "KRS", name: "Korso" },
  { code: "SAV", name: "Savio" },
  { code: "KE", name: "Kerava" },
  { code: "AIN", name: "Ainola" },
  { code: "JP", name: "Järvenpää" },
  { code: "SAU", name: "Saunakallio" },
  { code: "JK", name: "Jokela" },
  { code: "HY", name: "Hyvinkää" },
  { code: "RI", name: "Riihimäki" },
  { code: "RY", name: "Ryttylä" },
  { code: "TU", name: "Turenki" },
  { code: "HL", name: "Hämeenlinna" },
  { code: "PRL", name: "Parola" },
  { code: "ITA", name: "Iittala" },
  { code: "TL", name: "Toijala" },
  { code: "VIA", name: "Viiala" },
  { code: "LPÄ", name: "Lempäälä" },
  { code: "TPE", name: "Tampere" },
];

export const directionLahti = [
  { code: "KÄP", name: "Käpylä" },
  { code: "OLK", name: "Oulunkylä" },
  { code: "PMK", name: "Pukinmäki" },
  { code: "ML", name: "Malmi" },
  { code: "TNA", name: "Tapanila" },
  { code: "PLA", name: "Puistola" },
  { code: "TKL", name: "Tikkurila" },
  { code: "HKH", name: "Hiekkaharju" },
  { code: "KVY", name: "Koivukylä" },
  { code: "RKL", name: "Rekola" },
  { code: "KRS", name: "Korso" },
  { code: "SAV", name: "Savio" },
  { code: "KE", name: "Kerava" },
  { code: "HAA", name: "Haarajoki" },
  { code: "MLÄ", name: "Mäntsälä" },
  { code: "HNN", name: "Henna" },
  { code: "LH", name: "Lahti" },
];

export const allStations = _.uniqWith(
  [...common, ...ringTrackCW, ...directionLahti, ...directionSiuntio, ...directionTampere],
  (a, b) => a.name === b.name,
).sort((a, b) => (a.name < b.name ? -1 : 1));

export const getStationsOnSameRoute = (stationCode: string) => {
  if (!stationCode) {
    return allStations;
  }
  if (directionLahti.filter((s) => s.code === stationCode).length) {
    return _.uniq([...common, ...directionLahti]);
  }
  if (directionTampere.filter((s) => s.code === stationCode).length) {
    return _.uniq([...common, ...directionTampere]);
  }
  if (directionSiuntio.filter((s) => s.code === stationCode).length) {
    return _.uniq([...common, ...directionSiuntio]);
  }
  if (ringTrackCW.filter((s) => s.code === stationCode).length) {
    return _.uniq([...common, ...ringTrackCW]);
  }
  return allStations;
};

export const stationName = (code: string) => allStations.find((s: any) => s.code === code)?.name;
