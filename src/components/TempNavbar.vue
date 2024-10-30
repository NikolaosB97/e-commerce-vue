<template>
  <nav class="navbar">
    <router-link to="/" class="brand">E-Commerce</router-link>
    <ul class="navbar-links">
      <li><router-link to="/products">Prodotti</router-link></li>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li class="cart-link">
        <router-link to="/cart">Carrello</router-link>
        <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
      </li>
      <li>
        <button v-if="isLoggedIn" @click="logout" class="logout-button">Logout</button>
        <router-link v-else to="/login">Login</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    cartItemCount: {
      type: Number,
      required: true
    },
    isLoggedIn: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    logout() {
      this.$emit("logout"); 
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  padding: 15px 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.brand {
  font-size: 1.8rem;
  font-weight: bold;
  color: #ecf0f1;
  text-decoration: none;
}

.navbar-links {
  display: flex;
  gap: 25px;
  list-style: none;
}

.navbar-links a {
  color: #ecf0f1;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s;
}

.navbar-links a:hover {
  color: #3498db;
}

.cart-link {
  position: relative;
  font-size: 1.1rem;
}

.cart-badge {
  position: absolute;
  top: -10px;
  right: -12px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 3px 7px;
  font-size: 0.8rem;
  font-weight: bold;
}

.logout-button {
  background: none;
  border: none;
  color: #ecf0f1;
  font-size: 1.1rem;
  cursor: pointer;
  transition: color 0.3s;
}

.logout-button:hover {
  color: #e74c3c;
}
</style>