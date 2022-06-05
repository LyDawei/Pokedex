import "bootstrap/dist/css/bootstrap.min.css";
import { graphql } from "gatsby";
import React, { useState } from "react";
import { Form, Stack } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Layout from "../components/layout";

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

  const [pokemon, setPokemon] = useState(allPokemon);

  const indexStyle = {
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const handleSearchFilter = ev => {
    const { value } = ev.currentTarget;
    if (!value) {
      setPokemon(allPokemon);
    }
    const test = allPokemon.filter(pkmn => pkmn.name.includes(value));
    setPokemon(test);
  };

  return (
    <Layout>
      <Form.Control
        style={{ display: "flex" }}
        placeholder="Search..."
        onChange={handleSearchFilter}
      />
      <Stack style={indexStyle} direction="horizontal" gap={3}>
        {pokemon.map((pkmn, i) => {
          return (
            <Card style={{ width: "18rem" }} onClick={() => alert("click")}>
              <Card.Body>
                <Card.Title style={{ textTransform: "capitalize" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{pkmn.name}</span>
                    <span>#{pkmn.order}</span>
                  </div>
                </Card.Title>
                <Card.Img variant="top" src={pkmn.sprite} />
                {/* <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
          </Card.Text>
        <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          );
        })}
      </Stack>
    </Layout>
  );
};

export default IndexPage;
