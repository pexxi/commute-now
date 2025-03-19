import { useState } from "react";
import { allStations, getStationsOnSameRoute } from "../stations";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";

interface Option {
  id: string;
  label: string;
}

export default function StationSelection() {
  const router = useRouter();
  const [from, setFrom] = useState<Option | null>(null);
  const options = allStations.map((s) => ({ label: s.name, id: s.code }));
  const destinations = from ? getStationsOnSameRoute(from.id).map((s) => ({ label: s.name, id: s.code })) : [];

  const openTimetable = (from?: string, to?: string) => {
    if (from && to) {
      router.push(`/timetable/${from}/${to}`);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <p>Search timetables:</p>
      </Grid>
      <Grid item md={6} xs={12}>
        <Autocomplete
          options={options}
          renderInput={(params) => <TextField {...params} label="Departure" />}
          onChange={(_, v: Option | null) => setFrom(v)}
          getOptionLabel={(option: Option) => option.label}
          isOptionEqualToValue={(o: Option, v: Option) => o.id === v.id}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Autocomplete
          options={destinations}
          renderInput={(params) => <TextField {...params} label="Destination" />}
          onChange={(_, to: Option | null) => {
            openTimetable(from?.id, to?.id);
          }}
          getOptionLabel={(option: Option) => option.label}
          isOptionEqualToValue={(o: Option, v: Option) => o.id === v.id}
        />
      </Grid>
    </Grid>
  );
}
