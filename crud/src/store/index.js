import { createStore } from 'vuex';

const dataUrl = "https://aphelele2.github.io/jsonFile/data/index.json";

export default createStore({
  state: {
    products: null,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addProduct(state, product) {
      state.products.push(product);
    },
  },
  actions: {
    async fetchProducts(context) {
      try {
        let res = await fetch(dataUrl);
        let { products } = await res.json();
        context.commit('setProducts', products);
      } catch (e) {
        console.log(e.message);
      }
    },
    async addProduct(context, newProduct) {
      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
        const addedProduct = await response.json();
        context.commit('addProduct', addedProduct);
      } catch (error) {
        console.error('Error adding product:', error);
        throw error;
      }
    },
  },
  modules: {},
});
