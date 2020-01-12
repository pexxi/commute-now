import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { format } from 'date-fns';
import fi from 'date-fns/locale/fi';

const useStyles = makeStyles({
  card: {
    width: '100%',
  },
  departures: {
    width: '100%',
  },
  departure: {
    width: '100%',
  },
});

function Departure({ train, departure, arrival }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.lineId}>
          {train.commuterLineID}
        </Typography>
        <Typography className={classes.departureTime}>
          Departure:{' '}
          {format(new Date(departure.scheduledTime), 'H:mm', {
            locale: fi,
          })}
          , track: {departure.commercialTrack}
        </Typography>
        <Typography className={classes.arrivalTime}>
          Arrival:{' '}
          {format(new Date(arrival.scheduledTime), 'H:mm', {
            locale: fi,
          })}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Departure;
