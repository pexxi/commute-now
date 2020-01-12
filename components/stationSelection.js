import React from 'react';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import { allStations, getStationsOnSameRoute } from './stations';

class StationSelection extends React.Component {
  getDestinations() {
    const { from } = this.props;
    return (
      <div className="destinations">
        {' '}
        {getStationsOnSameRoute(from).map((s, i) => (
          <p key={`to-${i}`}>
            <Button
              type="button"
              onClick={() =>
                Router.push(`/timetable?from=${from}&to=${s.code}`)
              }
            >
              <a>
                {s.code} {s.name}
              </a>
            </Button>
          </p>
        ))}
      </div>
    );
  }

  allStationsFrom() {
    const { onSelectFrom } = this.props;
    return (
      <div>
        {allStations.map((s, i) => (
          <p key={`from-${i}`}>
            <Button type="button" onClick={() => onSelectFrom(s.code)}>
              <a>
                {s.code} {s.name}
              </a>
            </Button>
          </p>
        ))}
      </div>
    );
  }

  selectedStationFrom() {
    const { from, onClearFrom } = this.props;
    return (
      <div className="from">
        <div className="selectedStation">
          <p>selected: {from}</p>
          <Button onClick={onClearFrom}>Change</Button>
        </div>
      </div>
    );
  }

  render() {
    const { from } = this.props;
    return (
      <div className="stationSelection">
        <div className="column">
          <h1>From</h1>
          <div className="from">
            {from ? this.selectedStationFrom(from) : this.allStationsFrom()}
          </div>
        </div>
        {from && (
          <div className="column">
            <h1>To</h1>
            <div className="to">{this.getDestinations()}</div>
          </div>
        )}
        <style jsx>{`
          div.stationSelection {
            display: flex;
            width: 50%;
            margin: 0 auto;
          }
          div.column {
            flex-grow: 1;
          }
        `}</style>
      </div>
    );
  }
}

export default StationSelection;
