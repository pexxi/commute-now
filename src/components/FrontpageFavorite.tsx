import { Button, List, ListItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { stationName } from "../stations";
import Link from "./Link";
import useSWR from "swr";
import { DeparturesAPIResponse } from "../types";
import { formatDistanceToNow, parseISO } from "date-fns";

interface Props {
  from: string;
  to: string;
}
export default function FrontpageFavorite({ from, to }: Props) {
  const [showMore, setShowMore] = useState(0);
  const { data, error } = useSWR<DeparturesAPIResponse>(`/api/departures/${from}/${to}`, { refreshInterval: 5000 });
  if (error) {
    console.error(error);
    return <div>{error}</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href={`/timetable/${from}/${to}`}>
        <Typography variant="h4">
          {stationName(from)} &rarr; {stationName(to)}
        </Typography>
      </Link>
      <p>Next train(s):</p>
      <List dense>
        {data.slice(0, showMore > 0 ? showMore * 5 : 1).map((next, i) => {
          const timeDistance = formatDistanceToNow(parseISO(next.departure.scheduledTime));
          const track = next.departure.commercialTrack ? `, from track: ${next.departure.commercialTrack}` : "";
          return (
            <ListItem key={`fav-${from}-${to}-next-${i}`}>
              Train {next.train.commuterLineID} in {timeDistance}
              {track}
            </ListItem>
          );
        })}
      </List>
      <Button onClick={() => setShowMore(showMore + 1)}>Show more...</Button>
    </div>
  );
}
