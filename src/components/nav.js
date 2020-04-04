import React from 'react';
import Link from 'next/link';

const links = [
  { href: 'https://github.com/pexxi/commute-now', label: 'Github' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => (
  <nav>
    <ul className="left">
      <li>
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/stops">
          <a>Stops</a>
        </Link>
      </li>
    </ul>
    <ul className="right">
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
    </ul>

    <style jsx>{`
      nav {
        display: flex;
        max-width: 50%;
        text-align: center;
        margin: 0 auto;
        flex-direction: row;
      }
      ul {
        display: flex;
      }
      ul.left {
        justify-content: flex-start;
      }
      ul.right {
        justify-content: flex-end;
      }
      nav > ul {
        flex-grow: 1;
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
);

export default Nav;
