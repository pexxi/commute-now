async function getDepartures(from, to) {
  try {
    const res = await fetch(
      `https://rata.digitraffic.fi/api/v1/live-trains/station/${from}?minutes_before_departure=45&minutes_after_departure=2&minutes_before_arrival=0&minutes_after_arrival=0`,
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
