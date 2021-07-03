export const getFileName = (filePath) =>
  filePath.split("/").pop().split(".")[0];

export const normalizePizza = (pizza) => {
  const { dough, ingredients, sauces, sizes } = pizza;

  const normalizeDough = dough.map((doughItem) => ({
    ...doughItem,
    value: getFileName(doughItem.image).split("-")[1],
  }));

  const normalizeIngredients = ingredients.map((ingredient) => ({
    ...ingredient,
    filling: getFileName(ingredient.image),
  }));

  const normalizeSizes = sizes.map((size) => {
    const multiplieres = {
      1: "small",
      2: "noraml",
      3: "big",
    };
    return {
      ...size,
      value: multiplieres[size.multiplier],
    };
  });

  const normalizeSauces = sauces.map((sauce) => {
    const values = {
      tomato: "Томатный",
      creamy: "Сливочный",
    };

    return {
      ...sauce,
      value: Object.entries(values).find((value) => value[1] === sauce.name)[0],
    };
  });

  return {
    dough: normalizeDough,
    ingredients: normalizeIngredients,
    sauces: normalizeSauces,
    sizes: normalizeSizes,
  };
};
