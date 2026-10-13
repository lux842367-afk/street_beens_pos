
const STORAGE_KEY = "streetBeansProductCatalog";
const UPDATE_EVENT = "streetBeansCatalogUpdated";

export const defaultSizes = [
  { name: "Regular", price: 0 },
  { name: "Large", price: 20 },
  { name: "Extra Large", price: 35 },
];

export const defaultMilkOptions = [
  { name: "Regular Milk", price: 0 },
  { name: "Oat Milk", price: 20 },
  { name: "Almond Milk", price: 25 },
  { name: "Lactose-Free Milk", price: 20 },
];

export const defaultExtras = {
  "Iced Coffee": [
    { name: "Extra Espresso Shot", price: 25 },
    { name: "Vanilla Syrup", price: 15 },
    { name: "Caramel Syrup", price: 15 },
    { name: "Hazelnut Syrup", price: 15 },
  ],
  "Non Coffee": [
    { name: "Oreo Crumbs", price: 15 },
    { name: "Whipped Cream", price: 15 },
    { name: "Caramel Syrup", price: 15 },
  ],
  "Fruity Soda": [
    { name: "Fruit Jelly", price: 15 },
    { name: "Extra Soda", price: 10 },
  ],
};

const defaultProducts = [
  {
    name: "Black Americano",
    category: "Iced Coffee",
    price: 90,
  },
  {
    name: "Cappuccino",
    category: "Iced Coffee",
    price: 90,
  },
  {
    name: "Caramel Macchiato",
    category: "Iced Coffee",
    price: 90,
  },
  {
    name: "Mocha Caramel",
    category: "Iced Coffee",
    price: 90,
  },
  {
    name: "Milky Oreo",
    category: "Non Coffee",
    price: 90,
  },
  {
    name: "Strawberry Oreo",
    category: "Non Coffee",
    price: 90,
  },
  {
    name: "Cookies and Cream",
    category: "Non Coffee",
    price: 90,
  },
  {
    name: "White Caramel",
    category: "Non Coffee",
    price: 90,
  },
  {
    name: "Blue Berry",
    category: "Fruity Soda",
    price: 90,
  },
  {
    name: "Green Apple",
    category: "Fruity Soda",
    price: 90,
  },
  {
    name: "Strawberry",
    category: "Fruity Soda",
    price: 90,
  },
  {
    name: "Grapes",
    category: "Fruity Soda",
    price: 90,
  },
];

function createDefaultCatalog() {
  const categories = Object.keys(defaultExtras);

  return {
    categories,
    products: defaultProducts.map((product) => ({
      ...product,
      available: true,
      hasMilk:
        product.category === "Iced Coffee" ||
        product.category === "Non Coffee",
      sizes: defaultSizes.map((size) => ({ ...size })),
      milkOptions:
        product.category === "Iced Coffee" ||
        product.category === "Non Coffee"
          ? defaultMilkOptions.map((milk) => ({ ...milk }))
          : [],
      extras: (defaultExtras[product.category] || []).map((extra) => ({
        ...extra,
      })),
    })),
  };
}

export function loadCatalog() {
  const defaults = createDefaultCatalog();

  if (typeof window === "undefined") {
    return defaults;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
      return defaults;
    }

    const catalog = JSON.parse(saved);

    if (
      !catalog ||
      !Array.isArray(catalog.categories) ||
      !Array.isArray(catalog.products)
    ) {
      return defaults;
    }

    return catalog;
  } catch (error) {
    console.error("Unable to load product catalog:", error);
    return defaults;
  }
}

export function saveCatalog(catalog) {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog));
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function subscribeCatalog(callback) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener(UPDATE_EVENT, callback);

  return () => {
    window.removeEventListener(UPDATE_EVENT, callback);
  };
}
