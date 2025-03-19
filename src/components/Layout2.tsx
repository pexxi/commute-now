import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Head from "./Head2";
import Nav from "./Nav2";

const Layout = ({ children, title = "" }: any) => (
  <>
    <Head title={title} />
    <nav>
      <Container>
        <Nav />
      </Container>
    </nav>
    <main>
      <Container>
        <Grid container direction="column" justifyContent="center" alignItems="stretch">
          {children}
        </Grid>
      </Container>
    </main>
  </>
);

export default Layout;
