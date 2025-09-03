let links = [];
let idCounter = 1;

function getAllLinks(req, res) {
  res.json(links);
}

function createLink(req, res) {
  const { title, url, description } = req.body;
  if (!title || !url) {
    return res.status(400).json({ error: "Título e URL são obrigatórios" });
  }

  const newLink = { id: idCounter++, title, url, description };
  links.push(newLink);
  res.status(201).json(newLink);
}

function updateLink(req, res) {
  const { id } = req.params;
  const { title, url, description } = req.body;

  const link = links.find((l) => l.id === parseInt(id));
  if (!link) {
    return res.status(404).json({ error: "Link não encontrado" });
  }

  link.title = title || link.title;
  link.url = url || link.url;
  link.description = description || link.description;

  res.json(link);
}

function deleteLink(req, res) {
  const { id } = req.params;
  const index = links.findIndex((l) => l.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Link não encontrado" });
  }
  const deleted = links.splice(index, 1);
  res.json(deleted[0]);
}

module.exports = { getAllLinks, createLink, updateLink, deleteLink };