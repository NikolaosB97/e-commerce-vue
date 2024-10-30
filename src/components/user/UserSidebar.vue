<template>
  <div class="sidebar">
    <router-link to="/shop">
      <button class="sidebar-button">Vai allo Shop</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "UserSidebar",
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  padding: 20px;
  background-color: #f0f0f0;
}

.sidebar-button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  cursor: pointer;
}
</style>