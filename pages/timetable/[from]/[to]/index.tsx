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
import Head from "../../../../src/components/Head";

const addToRecents = (from: string, to: string, recents: any[], setRecents: (v: any) => void) => {
  if (!from || !to) return;
  const value = `${from}-${to}`;
  if (recents.includes(value)) return;
  setRecents([value, ...recents].slice(0, 5));
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

  const { data, error } = useSWR(() =>
    !!from && !!to ? `/api/departures/${from}/${to}?sort=${sort || "departure"}` : null,
  );
  if (error) console.log(error);

  const fromStationName = allStations.find((s) => s.code === from)?.name;
  const toStationName = allStations.find((s) => s.code === to)?.name;
  const title = `${fromStationName}-${toStationName}`;
  return (
    <>
      <Head title={title}></Head>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="h2">{title}</Typography>
        </Grid>
        <Grid item container direction="row" justifyContent="center" alignItems="center">
          <Grid item>
            Sort by:
            <Button type="button" onClick={() => setSort("arrival")}>
              Arrival
            </Button>
            <Button type="button" onClick={() => setSort("departure")}>
              Departure
            </Button>
          </Grid>
          <Grid item justifyContent="center" alignItems="center">
            <Button
              variant="outlined"
              startIcon={isFavorite ? <StarIcon /> : <StarBorderIcon />}
              onClick={() => toggleFavorite(from as string, to as string)}
            >
              {isFavorite ? "Remove favorite" : "Add favorite"}
            </Button>
          </Grid>
        </Grid>
        <Grid item direction="column" alignItems="center" spacing={2}>
          {(data || [])
            .slice(0, 5)
            .map(({ train, departure, arrival }: { train: Train; departure: TimeTableRow; arrival: TimeTableRow }) => {
              return <Departure train={train} departure={departure} arrival={arrival} key={train.trainNumber} />;
            })}
        </Grid>
      </Grid>
    </>
  );
};

export default Timetable;
