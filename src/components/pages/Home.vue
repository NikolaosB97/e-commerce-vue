<!-- src/pages/Home.vue -->
<template>
  <div class="home">
    <div class="hero-section">
      <h1>Benvenuto nel nostro E-commerce</h1>
      <p>Accedi o registrati per iniziare a fare acquisti!</p>
      <div class="button-group">
        <router-link to="/login">
          <button class="home-button">Accedi</button>
        </router-link>
        <router-link to="/register">
          <button class="home-button secondary">Registrati</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
}

.hero-section {
  text-align: center;
  background-color: #ffffff;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.hero-section h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
}

.hero-section p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}

.button-group {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.home-button {
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.home-button.secondary {
  background-color: #95a5a6;
}

.home-button:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

.home-button.secondary:hover {
  background-color: #7f8c8d;
}
</style>