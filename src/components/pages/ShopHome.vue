<template>
    <div>
    
      <header class="hero">
        <h1>Benvenuto nel nostro Negozio Online</h1>
        <p>Scopri i migliori prodotti e le offerte del giorno.</p>
        <router-link to="/products">
          <button class="shop-now-btn">Compra Ora</button>
        </router-link>
      </header>
  
      <section class="featured-products">
        <h2>Prodotti Popolari</h2>
        <div class="products-list">
        
          <div v-for="product in featuredProducts" :key="product.id" class="product-item">
            <h3>{{ product.name }}</h3>
            <p>{{ product.price }}€</p>
            <router-link :to="`/products/${product.id}`">
              <button>Vedi Dettagli</button>
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>

  
import products from '@/product.js';

export default {
  name: "ShopHome",
  data() {
    return {
      featuredProducts: products 
    };
  }
};
  </script>
  
  <style scoped>
  .hero {
    text-align: center;
    padding: 3rem 1rem;
    background-color: #e3f2fd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  .hero h1 {
    font-size: 3rem;
    color: #333;
    margin-bottom: 1rem;
  }

  .hero p {
    font-size: 1.25rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto 1.5rem auto;
    line-height: 1.6;
  }

  .shop-now-btn {
    margin-top: 1.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 1.1rem;
    font-weight: bold;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }

  .shop-now-btn:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }

  .featured-products {
    padding: 2rem;
    background-color: #f4f6f9;
    border-radius: 8px;
  }

  .featured-products h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 2rem;
    text-align: center;
  }

  .products-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
  }

  .product-item {
    background-color: white;
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
</style>