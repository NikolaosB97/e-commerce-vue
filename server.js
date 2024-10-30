const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let adminRequests = []; // Array temporaneo per salvare le richieste

app.post("/send-admin-request", (req, res) => {
  const { userId, email } = req.body;

  // Controllo se l'utente è l'admin
  if (email === "ni2a7i4.0.4@gmail.com") {
    res.status(200).send("Utente già amministratore.");
  } else {
    // Salva la richiesta in locale
    adminRequests.push({ userId, email });
    res.status(200).send("Richiesta salvata.");
  }
});

app.get("/admin/requests", (req, res) => {
  res.status(200).json(adminRequests);
});

app.listen(3000, () => console.log("Server avviato sulla porta 3000"));