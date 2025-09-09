const express = require("express");
const path = require("path"); 
const linksRoutes = require("./routes/links.routes");



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend"))); // servir frontend

// Rotas
app.use("/api/links", linksRoutes);


// Inicializar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});