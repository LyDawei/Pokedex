/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import "./layout.scss";
import { Stack, ThemeProvider } from "react-bootstrap";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <ThemeProvider style={{ backgroundColor: "#c3483d" }}>
      <Stack
        direction="column"
        className="col-md-6 mx-auto align-self-center main"
        style={{
          paddingTop: 50,
          width: 1200,
          padding: 50,
          backgroundColor: "#e6e6e6",
          marginTop: 50,
        }}
        gap={3}
      >
        {children}
      </Stack>
    </ThemeProvider>
  );

  // return (
  //   <>
  //     <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
  //     <div
  //       style={{
  //         margin: `0 auto`,
  //         maxWidth: `var(--size-content)`,
  //         padding: `var(--size-gutter)`,
  //       }}
  //     >
  //       <main>{children}</main>
  //       <footer
  //         style={{
  //           marginTop: `var(--space-5)`,
  //           fontSize: `var(--font-sm)`,
  //         }}
  //       >
  //         © {new Date().getFullYear()} &middot; Built with
  //         {` `}
  //         <a href="https://www.gatsbyjs.com">Gatsby</a>
  //       </footer>
  //     </div>
  //   </>
  // )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
