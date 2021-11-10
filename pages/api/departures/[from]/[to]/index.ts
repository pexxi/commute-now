import type { NextApiRequest, NextApiResponse } from "next";
import qs from "query-string";
import sortBy from "lodash/sortBy";
import { TimeTableRow, Train } from "../../../../../src/types";

export interface ResponseItem {
  train: Train;
  departure: TimeTableRow;
  arrival: TimeTableRow;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { from, to, sort } = req.query;

  try {
    const url = qs.stringifyUrl({
      url: `https://rata.digitraffic.fi/api/v1/live-trains/station/${from}/${to}`,
      query: {
        limit: 100,
        include_nonstopping: false,
      },
    });

    const response = await fetch(url);
    const data = await response.json();

    const departures: ResponseItem[] = [];

    data
      // .filter(
      //   ({ trainCategory, timeTableRows }: Train) =>
      //     trainCategory === "Commuter" &&
      //     timeTableRows.filter(
      //       ({ type, stationShortCode, trainStopping }: TimeTableRow) =>
      //         type === "ARRIVAL" && stationShortCode === to && trainStopping,
      //     ).length === 1,
      // )
      .forEach((train: Train) => {
        const [departure, arrival] = train.timeTableRows.filter(
          (row: TimeTableRow) =>
            (row.type === "DEPARTURE" && row.stationShortCode === from) ||
            (row.type === "ARRIVAL" && row.stationShortCode === to),
        );
        departures.push({ train, departure, arrival });
      });

    const sorted = sortBy(departures, (train) =>
      sort === "departure" ? train.departure.scheduledTime : train.arrival.scheduledTime,
    );

    return res.status(200).json(sorted);
  } catch (e) {
    return [];
  }
}
