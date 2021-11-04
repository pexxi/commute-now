import React from "react";
import Link from "next/link";
import { Grid } from "@mui/material";

const links = [{ href: "https://github.com/pexxi/commute-now", label: "Github" }];

const Nav = () => (
  <Grid container direction="row">
    <Grid item xs={6}>
      <Link href="/">
        <a>Home</a>
      </Link>
    </Grid>
    <Grid item xs={6} textAlign="right">
      {links.map(({ href, label }, index) => (
        <Link href={href} key={`nav-link-${index}`}>
          <a>{label}</a>
        </Link>
      ))}
    </Grid>
  </Grid>
);

export default Nav;
