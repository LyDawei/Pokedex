exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  });
};

const fetch = (...args) =>
  import(`node-fetch`).then(({ default: fetch }) => fetch(...args));

const fetchPokemon = async (url, retVal) => {
  if (!url) {
    return retVal;
  }

  let result = await fetch(url);
  const { next, results } = await result.json();
  const res = await Promise.all(
    (
      await Promise.all(results.map(pokemon => fetch(pokemon.url)))
    ).map(r => r.json())
  );

  return fetchPokemon(next, [...retVal, ...res]);
};

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // get data from GitHub API at build time

  const pokemon = await fetchPokemon("https://pokeapi.co/api/v2/pokemon", []);

  pokemon.forEach(pkmn => {
    createNode({
      name: pkmn.name,
      weight: pkmn.weight,
      id: `${pkmn.id}`,
      internal: {
        type: "pokemon",
        contentDigest: createContentDigest(pkmn),
      },
    });
  });

  // create node for build time data example in the docs
  // createNode({
  //   // nameWithOwner and url are arbitrary fields from the data
  //   nameWithOwner: resultData.full_name,
  //   url: resultData.html_url,
  //   // required fields
  //   id: `example-build-time-data`,
  //   parent: null,
  //   children: [],
  //   internal: {
  //     type: `Example`,
  //     contentDigest: createContentDigest(resultData),
  //   },
  // });
};
