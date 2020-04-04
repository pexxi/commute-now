import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { connect } from 'react-redux';
import { Card, CardContent, Typography, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import _ from 'lodash';
import Layout from '../components/layout';
import Departure from '../components/departure';

const useStyles = makeStyles({
  card: {
    width: '100%',
  },
  departures: {
    width: '100%',
    padding: '10px',
  },
  title: {
    width: '100%',
    textAlign: 'center',
  },
  departure: {
    width: '100%',
  },
});

function getSortedDepartures(from, to, data, sort) {
  switch (sort) {
    case 'departure': {
      return _.sortBy(
        data,
        train =>
          train.timeTableRows.filter(
            row => row.type === 'DEPARTURE' && row.stationShortCode === from,
          )[0].scheduledTime,
      );
    }
    case 'arrival': {
      return _.sortBy(
        data,
        train =>
          train.timeTableRows.filter(
            row => row.type === 'ARRIVAL' && row.stationShortCode === to,
          )[0].scheduledTime,
      );
    }
    default:
  }
}

async function updateData(from, to) {
  try {
    const res = await fetch(
      `https://rata.digitraffic.fi/api/v1/live-trains/station/${from}?minutes_before_departure=45&minutes_after_departure=15&minutes_before_arrival=0&minutes_after_arrival=0`,
    );
    const data = await res.json();
    const departures = data.filter(
      ({ trainCategory, timeTableRows }) =>
        trainCategory === 'Commuter' &&
        timeTableRows.filter(
          ({ type, stationShortCode }) =>
            type === 'ARRIVAL' && stationShortCode === to,
        ).length === 1,
    );

    return departures;
  } catch (e) {
    return [];
  }
}

function Timetable(props) {
  const { from, to, data } = props;
  const [sort, setSort] = useState('departure');
  const styles = useStyles();

  return (
    <Layout title="Departures">
      <Grid container direction="column" className={styles.departures}>
        <Typography variant="h1" className={styles.title}>
          {from}-{to}
        </Typography>
        <Grid item container direction="column" alignItems="center">
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            Sort by:
            <Button type="button" onClick={() => setSort('arrival')}>
              Arrival
            </Button>
            <Button type="button" onClick={() => setSort('departure')}>
              Departure
            </Button>
          </Grid>
        </Grid>
        <Grid item container direction="column" alignItems="center" spacing={2}>
          {getSortedDepartures(from, to, data, sort).map(train => {
            const [departure, arrival] = train.timeTableRows.filter(
              row =>
                (row.type === 'DEPARTURE' && row.stationShortCode === from) ||
                (row.type === 'ARRIVAL' && row.stationShortCode === to),
            );
            return (
              <Grid
                item
                xs={12}
                sm={6}
                key={train.trainNumber}
                className={styles.departure}
              >
                <Departure
                  train={train}
                  departure={departure}
                  arrival={arrival}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Layout>
  );
}

Timetable.getInitialProps = async ({ query }) => {
  const { from, to } = query;
  const data = await updateData(from, to);
  return { from, to, data };
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Timetable);
