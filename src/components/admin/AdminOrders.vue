<!-- src/components/admin/AdminOrders.vue -->
<template>
  <div class="admin-orders">
    <h2>Gestione Ordini</h2>
    <table>
      <thead>
        <tr>
          <th>ID Ordine</th>
          <th>Cliente</th>
          <th>Prodotti</th>
          <th>Stato</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.Email }}</td>
          <td>
            <ul>
              <li v-for="item in order.items" :key="item.productId">
                {{ item.name }} - Quantità: {{ item.quantity }}
              </li>
            </ul>
          </td>
          <td>{{ order.status || 'In Attesa' }}</td>
          <td>
            <select v-model="order.status">
              <option>In Attesa</option>
              <option>In Elaborazione</option>
              <option>Completato</option>
            </select>
            <button @click="updateOrderStatus(order)">Aggiorna</button>
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
      orders: [],
      statusMessage: '',
    };
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await fetch('https://67210cea98bbb4d93ca73ee2.mockapi.io/Orders');
        if (!response.ok) throw new Error("Errore nel recupero degli ordini");
        this.orders = await response.json();
      } catch (error) {
        console.error("Errore nel recupero degli ordini:", error);
        this.statusMessage = "Errore nel recupero degli ordini.";
      }
    },
    async updateOrderStatus(order) {
      try {
        const response = await fetch(`https://67210cea98bbb4d93ca73ee2.mockapi.io/Orders/${order.id}`, {
          method: 'PUT',
          body: JSON.stringify({ ...order, status: order.status }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error("Errore nell'aggiornamento dello stato dell'ordine");
        this.statusMessage = `Stato dell'ordine ${order.id} aggiornato a ${order.status}.`;
      } catch (error) {
        console.error("Errore nell'aggiornamento dello stato dell'ordine:", error);
        this.statusMessage = `Errore nell'aggiornamento dello stato dell'ordine ${order.id}.`;
      }
    }
  },
  created() {
    this.fetchOrders();
  },
};
</script>

<style scoped>
.admin-orders {
  margin: 20px;
  font-family: Arial, sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background-color: #f9f9f9;
}

th {
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: left;
}

td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

select {
  padding: 5px;
  margin-right: 10px;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}

p {
  color: red;
  font-weight: bold;
  margin-top: 20px;
}
</style>