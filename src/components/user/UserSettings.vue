<template>
    <div>
      <h2>Impostazioni Utente</h2>
      <form @submit.prevent="updateSettings">
        <label>Email: <input v-model="email" type="email" /></label>
        <button type="submit">Aggiorna</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserSettings',
    data() {
      return {
        email: '', 
      };
    },
    methods: {
      updateSettings() {
        console.log('Aggiornamento impostazioni utente...');
      }
    }
  };
  </script>