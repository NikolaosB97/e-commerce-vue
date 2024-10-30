<template>
  <div id="app">
    <TempNavbar :cartItemCount="cartItemCount" :isLoggedIn="isLoggedIn" @logout="handleLogout" />
    <router-view :addToCart="addToCart" :cartItems="cartItems" :removeFromCart="removeFromCart" />
  </div>
</template>

<script>
import TempNavbar from './components/TempNavbar.vue';

export default {
  components: {
    TempNavbar
  },
  data() {
    return {
      cartItems: [],
      isLoggedIn: !!localStorage.getItem("user") 
    };
  },
  computed: {
    cartItemCount() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    }
  },
  methods: {
    addToCart(product) {
      const existingItem = this.cartItems.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(itemId) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    },
    handleLogout() {
      localStorage.removeItem("user");
      this.isLoggedIn = false; 
      this.$router.push("/"); 
    }
  },
  watch: {
   
    '$route': function() {
      this.isLoggedIn = !!localStorage.getItem("user");
    }
  }
};
</script>