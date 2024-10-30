<template>
    <div>
      <h2>Richieste di Amministrazione</h2>
      <ul>
        <li v-for="request in requests" :key="request.userId">
          Utente con ID {{ request.userId }} e email {{ request.email }} ha richiesto accesso amministratore.
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        requests: []
      };
    },
    async created() {
      try {
        const response = await axios.get('http://localhost:3000/admin/requests');
        this.requests = response.data;
      } catch (error) {
        console.error("Errore nel recupero delle richieste:", error);
      }
    }
  };
  </script>