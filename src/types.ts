export interface DeparturesAPIResponseItem {
  train: Train;
  departure: TimeTableRow;
  arrival: TimeTableRow;
}
export type DeparturesAPIResponse = DeparturesAPIResponseItem[];

export interface Train {
  trainNumber: number;
  departureDate: string;
  trainType: "S" | "HL";
  trainCategory: "Commuter" | "Long-distance";
  commuterLineID: string;
  runningCurrently: boolean;
  cancelled: boolean;
  version: number;
  timetableType: "REGULAR";
  timeTableRows: TimeTableRow[];
}

export interface TimeTableRow {
  stationShortCode: "TUS";
  type: "DEPARTURE" | "ARRIVAL";
  trainStopping: boolean; // does the train stop at this station
  commercialStop: boolean;
  commercialTrack: string;
  cancelled: boolean;
  scheduledTime: string;
  actualTime: string;
  differenceInMinutes: number;
}
