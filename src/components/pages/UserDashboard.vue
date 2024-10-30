<template>
  <div class="dashboard">
    <h2>Benvenuto, {{ user?.email }}!</h2>
    <p>Questa è la tua area personale.</p>

    <!-- Se l'utente è admin, mostra "Admin" -->
    <p v-if="isAdmin" class="admin-badge">Admin</p>

    <!-- Sezione di modifica dati utente -->
    <div class="user-settings">
      <h3>Modifica Dati Personali</h3>
      <form @submit.prevent="updateUserData">
        <div>
          <label>Nome</label>
          <input type="text" v-model="updatedUser.name" required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" v-model="updatedUser.email" required />
        </div>
        <button type="submit">Salva Modifiche</button>
      </form>
      <p v-if="statusMessage" :class="{ success: isSuccess, error: !isSuccess }">{{ statusMessage }}</p>
    </div>

    <!-- Pulsanti di gestione e logout -->
    <button @click="openResetPasswordModal">Resetta Password</button>
    <button @click="logout" class="logout-button">Logout</button>

    <!-- Bottoni per gli utenti admin -->
    <div v-if="isAdmin">
      <button @click="goToAdminUsers">Gestione Utenti</button>
      <button @click="goToAdminOrders">Gestione Ordini</button>
    </div>

    <!-- Link per accedere allo Shop -->
    <button @click="goToShop">Vai allo Shop</button>

    <!-- Modal per il reset della password -->
    <div v-if="showResetModal" class="modal">
      <h3>Resetta Password</h3>
      <form @submit.prevent="submitResetPassword">
        <div>
          <label>Nuova Password</label>
          <input type="password" v-model="newPassword" required />
        </div>
        <div>
          <label>Conferma Password</label>
          <input type="password" v-model="confirmPassword" required />
        </div>
        <button type="submit">Conferma</button>
        <button type="button" @click="closeResetPasswordModal">Annulla</button>
      </form>
      <p v-if="statusMessage">{{ statusMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      user,
      updatedUser: { ...user }, // Copia i dati dell'utente da modificare
      showResetModal: false,
      newPassword: "",
      confirmPassword: "",
      statusMessage: "",
      isSuccess: false,
    };
  },
  computed: {
    isAdmin() {
      return this.user && this.user.email === "ni2a7i4.0.4@gmail.com";
    }
  },
  methods: {
    openResetPasswordModal() {
      this.showResetModal = true;
    },
    closeResetPasswordModal() {
      this.showResetModal = false;
      this.newPassword = "";
      this.confirmPassword = "";
      this.statusMessage = "";
    },
    async submitResetPassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.statusMessage = "Le password non coincidono.";
        return;
      }

      try {
        const response = await fetch(`https://67210cea98bbb4d93ca73ee2.mockapi.io/user/${this.user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: this.newPassword })
        });

        if (!response.ok) throw new Error("Errore nell'aggiornamento della password su MockAPI");

        this.statusMessage = "Password aggiornata con successo! Effettua nuovamente il login.";
        this.logout();
      } catch (error) {
        console.error("Errore nell'aggiornamento della password:", error);
        this.statusMessage = "Errore nell'aggiornamento della password.";
      }
    },
    async updateUserData() {
      try {
        const response = await fetch(`https://67210cea98bbb4d93ca73ee2.mockapi.io/user/${this.user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: this.updatedUser.name,
            email: this.updatedUser.email,
          })
        });

        if (!response.ok) throw new Error("Errore nell'aggiornamento dei dati");

        const updatedData = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedData));
        this.statusMessage = "Dati aggiornati con successo!";
        this.isSuccess = true;
        this.user = updatedData; // Aggiorna la variabile `user`
      } catch (error) {
        console.error(error);
        this.statusMessage = "Errore nell'aggiornamento dei dati dell'utente.";
        this.isSuccess = false;
      }
    },
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
    goToAdminUsers() {
      this.$router.push("/admin/users");
    },
    goToAdminOrders() {
      this.$router.push("/admin/orders");
    },
    goToShop() {
      this.$router.push("/shop");
    }
  }
};
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f4f4f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.admin-badge {
  font-weight: bold;
  color: #d9534f;
  background-color: #f8d7da;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.user-settings h3 {
  font-size: 1.5rem;
  color: #333;
  margin: 1.5rem 0 1rem;
}

.user-settings form div {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin: 0.5rem;
  transition: 0.3s;
}

.success {
  color: #28a745;
}

.error {
  color: #dc3545;
}
</style>