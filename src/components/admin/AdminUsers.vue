<!-- src/components/admin/AdminUsers.vue -->
<template>
  <div class="admin-users">
    <h2>Gestione Utenti</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Ruolo</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.IsAdmin ? 'Admin' : 'Utente' }}</td>
          <td>
            <button v-if="!user.IsAdmin" @click="promoteToAdmin(user)">Promuovi a Admin</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="statusMessage">{{ statusMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [], // Lista degli utenti da caricare
      statusMessage: '',
    };
  },
  methods: {
    async fetchUsers() {
  try {
    // Sostituisci l'URL qui con il link esatto di MockAPI
    const response = await fetch('https://67210cea98bbb4d93ca73ee2.mockapi.io/user');
    if (!response.ok) throw new Error("Errore nel recupero degli utenti");
    this.users = await response.json();
  } catch (error) {
    console.error("Errore nel recupero degli utenti:", error);
    this.statusMessage = "Errore nel recupero degli utenti.";
  }
},
async promoteToAdmin(user) {
  user.isAdmin = true;
  try {
    await fetch(`https://67210cea98bbb4d93ca73ee2.mockapi.io/user/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify({ isAdmin: true }),
      headers: { 'Content-Type': 'application/json' },
    });
    this.statusMessage = `L'utente ${user.email} è stato promosso a admin.`;
  } catch (error) {
    console.error("Errore nella promozione dell'utente:", error);
    this.statusMessage = "Errore nella promozione dell'utente.";
  }
},
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.admin-users {
  padding: 1em;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1em;
}

th, td {
  border: 1px solid #ddd;
  padding: 0.5em;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

button {
  padding: 0.3em 0.5em;
  cursor: pointer;
}

.status-message {
  color: green;
  font-weight: bold;
  margin-top: 1em;
}
</style>