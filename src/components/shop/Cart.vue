<template>
  <div class="cart-container">
    <h2>Carrello</h2>
    <div v-if="cartItems.length === 0" class="empty-cart-message">Il carrello è vuoto.</div>
    <ul v-else class="cart-items">
      <li v-for="item in cartItems" :key="item.id" class="cart-item">
        <span class="cart-item-name">{{ item.name }}</span>
        <span class="cart-item-details">{{ item.price }}€ - Quantità: {{ item.quantity }}</span>
        <button @click="removeItem(item.id)" class="remove-button">Rimuovi</button>
      </li>
    </ul>

    <button v-if="cartItems.length > 0" @click="completeOrder" class="complete-order-button">
      Completa Ordine
    </button>
    <p v-if="statusMessage" class="status-message">{{ statusMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: {
    cartItems: {
      type: Array,
      required: true
    },
    removeFromCart: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      statusMessage: ''
    };
  },
  methods: {
    completeOrder() {
      // codice per completare l'ordine
    },
    removeItem(itemId) {
      // Emetti l'ID dell'articolo da rimuovere al componente genitore
      this.removeFromCart(itemId);
    }
  }
};
</script>

<style scoped>
.cart-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cart-container h2 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
}

.cart-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item-name {
  font-size: 1.1rem;
  color: #333;
}

.cart-item-details {
  font-size: 1rem;
  color: #666;
}

.empty-cart-message {
  text-align: center;
  font-size: 1.2rem;
  color: #999;
  margin: 2rem 0;
}

.complete-order-button {
  display: block;
  width: 100%;
  padding: 0.8rem 0;
  font-size: 1.1rem;
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1.5rem;
  text-align: center;
}

.complete-order-button:hover {
  background-color: #218838;
}

.remove-button {
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-button:hover {
  background-color: #c82333;
}

.status-message {
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  color: #28a745;
  margin-top: 1.5rem;
}
</style>