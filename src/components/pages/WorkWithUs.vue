<!-- src/components/WorkWithUs.vue -->
<template>
    <div class="work-with-us">
      <h2>Lavora con Noi</h2>
      <p>Invia una richiesta per diventare amministratore.</p>
      <button @click="sendRequest">Invia Richiesta</button>
      <p v-if="statusMessage">{{ statusMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        statusMessage: ''
      };
    },
    methods: {
      async sendRequest() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    await axios.post("http://localhost:3000/send-admin-request", {
      userId: user.id,
      email: user.email
    });
    this.statusMessage = 'Richiesta inviata con successo!';
  } catch (error) {
    this.statusMessage = 'Errore nell’invio della richiesta.';
  }
}
    }
  };
  </script>
  
  <style scoped>

  .work-with-us {
    text-align: center;
    margin-top: 50px;
  }
  </style>