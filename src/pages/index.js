import * as React from "react";
import { Link, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import Layout from "../components/layout";
import Seo from "../components/seo";
import * as styles from "../components/index.module.css";
import Card from "react-bootstrap/Card";

const links = [
  {
    text: "Tutorial",
    url: "https://www.gatsbyjs.com/docs/tutorial",
    description:
      "A great place to get started if you're new to web development. Designed to guide you through setting up your first Gatsby site.",
  },
  {
    text: "Examples",
    url: "https://github.com/gatsbyjs/gatsby/tree/master/examples",
    description:
      "A collection of websites ranging from very basic to complex/complete that illustrate how to accomplish specific tasks within your Gatsby sites.",
  },
  {
    text: "Plugin Library",
    url: "https://www.gatsbyjs.com/plugins",
    description:
      "Learn how to add functionality and customize your Gatsby site or app with thousands of plugins built by our amazing developer community.",
  },
  {
    text: "Build and Host",
    url: "https://www.gatsbyjs.com/cloud",
    description:
      "Now you’re ready to show the world! Give your Gatsby site superpowers: Build and host on Gatsby Cloud. Get started for free!",
  },
];

const samplePageLinks = [
  {
    text: "Page 2",
    url: "page-2",
    badge: false,
    description:
      "A simple example of linking to another page within a Gatsby site",
  },
  { text: "TypeScript", url: "using-typescript" },
  { text: "Server Side Rendering", url: "using-ssr" },
  { text: "Deferred Static Generation", url: "using-dsg" },
];

const moreLinks = [
  { text: "Join us on Discord", url: "https://gatsby.dev/discord" },
  {
    text: "Documentation",
    url: "https://gatsbyjs.com/docs/",
  },
  {
    text: "Starters",
    url: "https://gatsbyjs.com/starters/",
  },
  {
    text: "Showcase",
    url: "https://gatsbyjs.com/showcase/",
  },
  {
    text: "Contributing",
    url: "https://www.gatsbyjs.com/contributing/",
  },
  { text: "Issues", url: "https://github.com/gatsbyjs/gatsby/issues" },
];

const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`;

export const query = graphql`
  query AllPokemonQuery {
    allPokemon {
      edges {
        node {
          name
          order
          sprites {
            front_default
          }
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const allPokemon = data.allPokemon.edges.map(pkmn => ({
    order: pkmn.node.order,
    name: pkmn.node.name,
    sprite: pkmn.node.sprites.front_default,
  }));

  return (
    <div>
      {allPokemon.map(pkmn => {
        return (
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={pkmn.sprite} />
            <Card.Body>
              <Card.Title>{pkmn.name}</Card.Title>
              {/* <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default IndexPage;
