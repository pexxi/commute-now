import React, { useState } from "react";
import { Typography, Button, Grid, IconButton } from "@mui/material";
import Departure from "../../../../src/components/Departure";
import { allStations } from "../../../../src/stations";
import useSWR from "swr";
import { useRouter } from "next/router";
import { TimeTableRow, Train } from "../../../../src/types";
import { useLocalStorage } from "../../../../src/useLocalStorage";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const addToRecents = (from: string, to: string, recents: any[], setRecents: (v: any) => void) => {
  if (!from || !to) return;
  const value = `${from}-${to}`;
  if (recents.includes(value)) return;
  setRecents([value, ...recents]);
};

const Timetable = () => {
  const router = useRouter();
  const { from, to } = router.query;

  const [recents, setRecents] = useLocalStorage<string[]>("recents", []);
  addToRecents(from as string, to as string, recents, setRecents);

  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const isFavorite = favorites.includes(`${from}-${to}`);
  const toggleFavorite = (from: string, to: string) => {
    const value = [from, to].join("-");
    if (favorites.includes(value)) {
      // remove
      setFavorites(favorites.filter((f) => f !== value));
    } else {
      // add
      setFavorites([value, ...favorites]);
    }
  };

  const [sort, setSort] = useState("departure");

  const { data, error } = useSWR(`/api/departures/${from}/${to}?sort=${sort || "departure"}`);
  if (error) console.log(error);

  const fromStationName = allStations.find((s) => s.code === from)?.name;
  const toStationName = allStations.find((s) => s.code === to)?.name;
  return (
    <>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item container direction="row" justifyContent="center" alignItems="center">
          <Grid item>
            <Typography variant="h2">
              {fromStationName} - {toStationName}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => toggleFavorite(from as string, to as string)}>
              {isFavorite ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Grid>
        </Grid>
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
