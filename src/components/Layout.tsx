import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Head from "./Head";
import Nav from "./Nav";

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
