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

const recursiveFetch = async (url, retVal) => {
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

  return recursiveFetch(next, [...retVal, ...res]);
};

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // get data from GitHub API at build time

  const pokemon = await recursiveFetch("https://pokeapi.co/api/v2/pokemon", []);
  pokemon.forEach(pkmn => {
    createNode({
      name: pkmn.name,
      weight: pkmn.weight,
      abilities: pkmn.abilities,
      baseExperience: pkmn.baseExperience,
      forms: pkmn.forms,
      gameIndices: pkmn.game_indices,
      height: pkmn.height,
      heldItems: pkmn.held_items,
      isDefault: pkmn.is_default,
      locationAreaEncounters: pkmn.location_area_encounters,
      moves: pkmn.moves,
      order: pkmn.order,
      pastTypes: pkmn.past_types,
      species: pkmn.species,
      sprites: pkmn.sprites,
      stats: pkmn.stats,
      types: pkmn.types,

      id: `pokemon-${pkmn.id}`,
      internal: {
        type: "pokemon",
        contentDigest: createContentDigest(pkmn),
      },
    });
  });

  const berries = await recursiveFetch("https://pokeapi.co/api/v2/berry", []);
  berries.forEach(berry => {
    createNode({
      name: berry.name,
      growthTime: berry.growth_time,
      maxHarvest: berry.max_harvest,
      naturalGiftPower: berry.natural_gift_power,
      size: berry.size,
      smoothness: berry.smoothness,
      soilDryness: berry.soil_dryness,
      firmness: berry.firmness,
      flavors: berry.flavors,
      item: berry.item,
      naturalGiftType: berry.natural_gift_type,
      id: `berry-${berry.id}`,
      internal: {
        type: "berry",
        contentDigest: createContentDigest(berry),
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
