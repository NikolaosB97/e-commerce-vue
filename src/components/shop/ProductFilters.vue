<template>
    <div>
      <h2>Prodotti</h2>
      <div class="filters">
        <label v-for="category in categories" :key="category">
          <input type="checkbox" :value="category" v-model="selectedCategories" />
          {{ category }}
        </label>
      </div>
      <div class="products-list">
        <div v-for="product in filteredProducts" :key="product.id" class="product-item">
          <h3>{{ product.name }}</h3>
          <p>{{ product.price }}€</p>
          <button @click="addToCart(product)">Aggiungi al Carrello</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import products from '@/product.js';

export default {
  name: 'ProductFilter',
  props: ['addToCart'],
  data() {
    return {
      products, 
      categories: [...new Set(products.map(product => product.category))],
      selectedCategories: []
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(
        product =>
          this.selectedCategories.length === 0 || this.selectedCategories.includes(product.category)
      );
    }
  }
};
  </script>
  <style scoped>
  .filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    justify-content: center;
  }

  .filters label {
    font-size: 1rem;
    color: #555;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-weight: bold;
  }

  .products-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
  }

  .product-item {
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    width: 200px;
  }

  .product-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .product-item h3 {
    font-size: 1.25rem;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .product-item p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 1rem;
  }

  .product-item button {
    margin-top: 0.5rem;
    padding: 0.5rem 1.2rem;
    font-size: 0.9rem;
    font-weight: bold;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }

  .product-item button:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }

  .product-item button:active {
    transform: scale(0.95);
  }
</style>