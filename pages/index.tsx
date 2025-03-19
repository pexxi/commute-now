import { Grid, IconButton, Typography } from "@mui/material";
import Link from "../src/components/Link";
import { stationName } from "../src/stations";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import { useLocalStorage } from "../src/useLocalStorage";
import StationSelection from "../src/components/StationSelection2";
import FrontpageFavorite from "../src/components/FrontpageFavorite";

const defaultFavorites = ["LPV-HKI", "HKI-LPV"];

export default function Index() {
  const [favorites, setFavorites] = useLocalStorage("favorites", defaultFavorites);
  const [recents] = useLocalStorage("recents", []);

  const renderFavorites = () => {
    if (favorites.length === 0) return;
    return (
      <>
        <Typography variant="h3">Favorites</Typography>

        {favorites.map((fav: string, i) => {
          const [from, to] = fav.split("-");
          if (from && to) {
            return <FrontpageFavorite from={from} to={to} key={`fav-${i}`} />;
          }
        })}
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
          const isFavorite = favorites.includes(recent);
          return (
            <Grid container direction="row" key={`recent-${i}`}>
              <Grid item>
                <Link href={`/timetable/${from}/${to}`}>
                  <Typography variant="h4">
                    {stationName(from)} &rarr; {stationName(to)}
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <IconButton onClick={() => toggleFavorite(from, to)}>
                  {isFavorite ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      </>
    );
  };

  const toggleFavorite = (from: string, to: string) => {
    const value = [from, to].join("-");
    if (favorites.includes(value)) {
      // remove
      const newFavorites = favorites.filter((f) => f !== value);
      setFavorites(newFavorites);
    } else {
      // add
      const newFavorites = [value, ...favorites];
      setFavorites(newFavorites);
    }
  };

  return (
    <>
      <Typography variant="h1">Let&apos;s Commute!</Typography>

      <StationSelection />

      <Grid container>
        <Grid item md={6} xs={12}>
          {renderFavorites()}
        </Grid>
        <Grid item md={6} xs={12}>
          {renderRecents()}
        </Grid>
      </Grid>
    </>
  );
}
