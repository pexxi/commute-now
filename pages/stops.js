import React from 'react';
import _ from 'lodash';
import Layout from '../components/layout';
import StationSelection from '../components/stationSelection';
import DeparturesList from '../components/departuresList';

class Stops extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: null,
    };
    this.selectDepartureStation = this.selectDepartureStation.bind(this);
    this.clearDepartureStation = this.clearDepartureStation.bind(this);
  }

  async fetchDepartures(from) {
    if (!from) return [];

    const res = await fetch(
      `https://rata.digitraffic.fi/api/v1/live-trains/station/${from}?minutes_before_departure=45&minutes_after_departure=15&minutes_before_arrival=0&minutes_after_arrival=0`,
    );
    const data = await res.json();
    const filtered = data.filter(
      ({ trainCategory, timeTableRows }) =>
        trainCategory === 'Commuter' &&
        timeTableRows.filter(
          ({ type, stationShortCode }) =>
            type === 'DEPARTURE' && stationShortCode === from,
        ).length === 1,
    );

    this.setState({
      data: filtered,
    });
  }

  async selectDepartureStation(from) {
    this.setState({ from });
    await this.fetchDepartures(from);
  }

  clearDepartureStation() {
    this.setState({ from: null });
  }

  render() {
    const { data, from, to } = this.state;
    return (
      <Layout title="Stations">
        <div className="stops">
          <StationSelection
            from={from}
            onSelectFrom={this.selectDepartureStation}
            onClearFrom={this.clearDepartureStation}
          />
          <DeparturesList data={data} from={from} to={to} />
        </div>
      </Layout>
    );
  }
}

export default Stops;
