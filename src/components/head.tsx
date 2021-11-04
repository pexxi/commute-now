import React from "react";
import NextHead from "next/head";
import { string } from "prop-types";

const Head = ({ title = "", description = "" }) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title || ""}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
    <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
    <link rel="apple-touch-icon" href="/static/touch-icon.png" />
    <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
    <link rel="icon" href="/static/favicon.ico" />
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
};

export default Head;
