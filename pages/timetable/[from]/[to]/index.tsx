import React, { useState } from "react";
import { Typography, Button, Grid } from "@mui/material";
import Departure from "../../../../src/components/departure";
import { allStations } from "../../../../src/stations";
import useSWR from "swr";
import { useRouter } from "next/router";
import { TimeTableRow, Train } from "../../../../src/train";
import { useLocalStorage } from "../../../../src/useLocalStorage";

const addToRecents = (from: string, to: string, recents: any[], setRecents: (v: any) => void) => {
  if (!from || !to) return;
  const value = `${from}-${to}`;
  if (recents.includes(value)) return;
  setRecents([value, ...recents]);
};

const Timetable = () => {
  const router = useRouter();
  const { from, to } = router.query;

  const [recents, setRecents] = useLocalStorage("recents", []);
  addToRecents(from as string, to as string, recents, setRecents);

  const [sort, setSort] = useState("departure");

  const { data, error } = useSWR(`/api/departures/${from}/${to}?sort=${sort || "departure"}`);
  if (error) console.log(error);

  const fromStationName = allStations.find((s) => s.code === from)?.name;
  const toStationName = allStations.find((s) => s.code === to)?.name;
  return (
    <>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Typography variant="h2">
          {fromStationName} - {toStationName}
        </Typography>
        <Grid item container direction="column" alignItems="center">
          <Grid item container direction="row" justifyContent="center" alignItems="center">
            Sort by:
            <Button type="button" onClick={() => setSort("arrival")}>
              Arrival
            </Button>
            <Button type="button" onClick={() => setSort("departure")}>
              Departure
            </Button>
          </Grid>
        </Grid>
        <Grid item container direction="column" alignItems="center" spacing={2}>
          {(data || []).map(
            ({ train, departure, arrival }: { train: Train; departure: TimeTableRow; arrival: TimeTableRow }) => {
              return (
                <Grid item xs={12} sm={6} key={train.trainNumber}>
                  <Departure train={train} departure={departure} arrival={arrival} />
                </Grid>
              );
            },
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Timetable;
