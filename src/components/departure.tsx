import { Card, Typography, Grid, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { format } from "date-fns";
import fi from "date-fns/locale/fi";
import { TimeTableRow, Train } from "../types";

interface Props {
  train: Train;
  departure: TimeTableRow;
  arrival: TimeTableRow;
}
function Departure({ train, departure, arrival }: Props) {
  return (
    <Grid container direction="column" py={1}>
      <Card>
        <Grid item container direction="row">
          <Box bgcolor="secondary.main" p={2} sx={{ minWidth: "4rem" }}>
            <Grid item justifyContent="center" alignItems="center">
              <Typography variant="h3" style={{ color: "white" }} gutterBottom={false}>
                {train.commuterLineID}
              </Typography>
            </Grid>
          </Box>
          <Grid item container direction="row" xs justifyContent="space-between">
            <Grid item>
              <Box p={2}>
                <Typography>
                  {format(new Date(departure.scheduledTime), "H:mm", {
                    locale: fi,
                  })}
                </Typography>
                {train.cancelled ? (
                  <Typography color="red">Cancelled</Typography>
                ) : (
                  <Typography>Track: {departure.commercialTrack}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item container justifyContent="center" alignItems="center" xs>
              <ArrowForwardIcon />
            </Grid>
            <Grid item>
              <Box p={2}>
                <Typography>
                  {format(new Date(arrival.scheduledTime), "H:mm", {
                    locale: fi,
                  })}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default Departure;
