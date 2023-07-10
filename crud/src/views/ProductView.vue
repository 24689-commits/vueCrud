<template>
    <div>
        <h1>Products</h1>
        <div id="prod" v-for="product in products" :key="product.id">
        <div class="card text-center" style="width: 100%;">
            <img :src="product.image" class="card-img-top" :alt="product.name" loading='lazy'>
            <div class="card-body">
                <h5 class="card-title text-center">{{product.name}}</h5>
                <p class="card-text text-center">{{product.description}}</p>
                <p class="card-text text-center">Price: R{{product.price}}</p>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#checkoutModal" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
    products() {
      return this.$store.state.products;
    }
  },
  mounted() {
    this.$store.dispatch('fetchProducts');
  },
        
    }
</script>

<style scoped>
#prod .card {
  padding: 3rem;
  border: none;
  width: 18rem;
  margin-bottom: 20px;
}

#prod .card .card-img-top {
  height: 250px;
  object-fit: contain;
}

#prod .card .card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#prod .card .card-text {
  margin-bottom: 10px;
}

</style>