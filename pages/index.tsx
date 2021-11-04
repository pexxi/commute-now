import { Typography } from "@mui/material";
import Link from "../src/components/Link";
import { stationName } from "../src/stations";
import useSWR from "swr";
import { useLocalStorage } from "../src/useLocalStorage";
import StationSelection from "../src/components/stationSelection";

const defaultFavorites = [
  { from: "LPV", to: "HKI" },
  { from: "HKI", to: "LPV" },
];

export default function Index() {
  const [favorites] = useLocalStorage("favorites", defaultFavorites);
  const [recents] = useLocalStorage("recents", []);

  const { data, error } = useSWR("/api/departures/lpv/hki");
  console.log({ data, error });

  const renderFavorites = () => {
    if (favorites.length === 0) return;
    return (
      <>
        <Typography variant="h3">Favorites</Typography>

        {favorites.map((fav: any, i) => (
          <div className="row" key={`fav-${i}`}>
            <Link href={`/timetable/${fav.from}/${fav.to}`}>
              <Typography variant="h3">
                {stationName(fav.from)} &rarr; {stationName(fav.to)}
              </Typography>
            </Link>
            <p>Next: Train A xx:xx:xx, track 4</p>
          </div>
        ))}
      </>
    );
  };

  const renderRecents = () => {
    if (recents.length === 0) return;
    return (
      <>
        <Typography variant="h3">Recent searches</Typography>

        {recents.map((recent: string, i) => {
          const [from, to] = recent.split("-");
          if (!from || !to) return;
          return (
            <div className="row" key={`recent-${i}`}>
              <Link href={`/timetable/${from}/${to}`}>
                <Typography variant="h4">
                  {stationName(from)} &rarr; {stationName(to)}
                </Typography>
              </Link>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Typography variant="h1">Let&apos;s Commute!</Typography>

      <StationSelection />

      {/* {renderFavorites()} */}

      {renderRecents()}
    </>
  );
}
