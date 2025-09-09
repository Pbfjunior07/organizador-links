const express = require("express");
const path = require("path"); 
const linksRoutes = require("./routes/links.routes");



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Servir os arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, "../frontend"))); // servir frontend

// Rotas da API
app.use("/api/links", linksRoutes);

// Rota fallback → garante que "/" e qualquer rota desconhecida devolvem o index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});