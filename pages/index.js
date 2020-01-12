import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import Layout from '../components/layout';

class Index extends React.Component {
  static async getInitialProps() {
    return {};
  }

  render() {
    return (
      <Layout title="Home">
        <div className="front">
          <h1 className="title">Let's Commute!</h1>

          <div className="row">
            <Link href="/stops">
              <a className="card">
                <h3>Stops &rarr;</h3>
                <p>Add new favourite timetables</p>
              </a>
            </Link>
          </div>
          <h2 className="title">Favorites</h2>
          <div className="row">
            <Link href="/timetable?from=LPV&amp;to=HKI">
              <a className="card">
                <h3>Leppävaara &rarr; Helsinki</h3>
                <p>Next: Train A xx:xx:xx, track 4</p>
              </a>
            </Link>
          </div>
        </div>

        <style jsx>{`
          h1.title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
          h2.title {
            margin: 0;
            width: 100%;
            padding-top: 40px;
            font-size: 32px;
          }
          .title,
          .description {
            text-align: center;
          }
          .row {
            max-width: 880px;
            margin: 80px auto 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .card {
            padding: 18px 18px 24px;
            width: 220px;
            text-align: left;
            text-decoration: none;
            color: #434343;
            border: 1px solid #9b9b9b;
          }
          .card:hover {
            border-color: #067df7;
          }
          .card h3 {
            margin: 0;
            color: #067df7;
            font-size: 18px;
          }
          .card p {
            margin: 0;
            padding: 12px 0 0;
            font-size: 13px;
            color: #333;
          }
        `}</style>
      </Layout>
    );
  }
}

export default connect()(Index);
