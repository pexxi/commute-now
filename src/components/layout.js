import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Head from './head';
import Nav from './nav';
// import 'typeface-roboto';

const Layout = ({ children, title = '' }) => (
  <div className="layout">
    <Head title={title} />
    <Nav />
    <Grid container direction="column" justify="center" alignItems="stretch">
      {children}
    </Grid>
    <style global jsx>{`
      body * {
        font-family: Roboto, Arial;
      }
    `}</style>
  </div>
);

Layout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

export default Layout;
