import React from "react";
import NextHead from "next/head";

interface Props {
  title?: string;
  description?: string;
}
const Head = ({ title, description }: Props) => {
  const t = title ? `${title} - Let's Commute!` : "Let's Commute!";
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{t}</title>
      <meta name="description" content={description || ""} />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
      <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
      <link rel="apple-touch-icon" href="/static/touch-icon.png" />
      <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
      <link rel="icon" href="/static/favicon.ico" />
    </NextHead>
  );
};

export default Head;
