<template>
    <div class="container">
      <button @click="showAddProductModal" class="btn btn-primary">Add Item</button>
      <button @click="sortTableById" class="btn btn-secondary">Sort by ID</button>
  
      <table id="tblAdmin" class="table">
        <thead>
          <tr>
            <th>#id</th>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td><img :src="product.image" alt="Product Image"></td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
            <td>
              <button @click="editProduct(product.id)" class="btn btn-primary">Edit</button>
              <button @click="deleteProduct(product.id)" class="btn btn-secondary">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal -->
      <div id="modal" class="modal" v-show="isModalVisible">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title">Add Item</h2>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="itemImage" class="form-label">Name:</label>
                  <input type="text" class="form-control" v-model="newProduct.name">
                </div>
                <div class="mb-3">
                  <label for="itemImage" class="form-label">Image:</label>
                  <input type="text" class="form-control" v-model="newProduct.image">
                </div>
                <div class="mb-3">
                  <label for="itemDescription" class="form-label">Description:</label>
                  <input type="text" class="form-control" v-model="newProduct.description">
                </div>
                <div class="mb-3">
                  <label for="itemPrice" class="form-label">Price:</label>
                  <input type="text" class="form-control" v-model="newProduct.price">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="addProduct">Add</button>
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newProduct: {
          name: '',
          image: '',
          description: '',
          price: '',
        },
      };
    },
    computed: {
      products() {
        return this.$store.state.products;
      },
    },
    methods: {
      showAddProductModal() {
        this.newProduct = {
          name: '',
          image: '',
          description: '',
          price: '',
        };
  
        const modal = document.getElementById('modal');
        modal.style.display = 'block';
      },
      sortTableById() {
        
      },
      editProduct() {
        
      },
      deleteProduct() {
        
      },
      addProduct() {
        fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newProduct),
        })
          .then(response => response.json())
          .then(addedProduct => {
            this.$store.commit('addProduct', addedProduct);
            console.log('Product added');
            this.newProduct = {
              name: '',
              image: '',
              description: '',
              price: '',
            };
            this.closeModal();
          })
          .catch(error => {
            console.error('Error adding product:', error);
          });
      },
      closeModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';

      },
    },
    mounted() {
      this.$store.dispatch('fetchProducts');
    },
  };
  </script>
  
  <style scoped>
  .modal {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .modal-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  </style>
  