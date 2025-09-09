const db = require("../db");

// Listar todos os links
exports.getLinks = (req, res) => {
  db.all("SELECT * FROM links", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Criar novo link
exports.createLink = (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) {
    return res.status(400).json({ error: "Título e URL são obrigatórios" });
  }

  const sql = "INSERT INTO links (title, url) VALUES (?, ?)";
  db.run(sql, [title, url], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, url });
  });
};

// Deletar link
exports.deleteLink = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM links WHERE id = ?";
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Link não encontrado" });
    }
    res.json({ message: "Link excluído com sucesso" });
  });
};

// Atualizar um link
exports.update = (req, res) => {
  const { id } = req.params;
  const { title, url, description } = req.body;

  if (!title || !url) {
    return res.status(400).json({ error: "Title e URL são obrigatórios" });
  }

  const sql = "UPDATE links SET title = ?, url = ?, description = ? WHERE id = ?";
  db.run(sql, [title, url, description, id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Link não encontrado" });
    }
    res.json({ message: "Link atualizado com sucesso", id, title, url, description });
  });
};