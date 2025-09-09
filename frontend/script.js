const apiBase = '/api/links';
const listEl = document.getElementById('links-list');
const formEl = document.getElementById('link-form');
const msgEl = document.getElementById('msg');

function setMsg(text, isError = false) {
  msgEl.textContent = text;
  msgEl.style.color = isError ? '#ff4d4f' : '#2f6fed';
  if (text) setTimeout(() => (msgEl.textContent = ''), 2500);
}

async function fetchLinks() {
  const res = await fetch(apiBase);
  const data = await res.json();
  renderList(data);
}

function renderList(links) {
  listEl.innerHTML = '';
  if (!links.length) {
    listEl.innerHTML = '<li>Nenhum link cadastrado.</li>';
    return;
  }
  for (const link of links) {
    const li = document.createElement('li');
    li.className = 'item';
    li.dataset.id = link.id;

    const left = document.createElement('div');
    const a = document.createElement('a');
    a.href = link.url;
    a.textContent = link.title || link.url;
    a.target = '_blank';
    const desc = document.createElement('div');
    desc.style.fontSize = '12px';
    desc.style.color = '#555';
    desc.textContent = link.description || '';

    left.appendChild(a);
    if (link.description) left.appendChild(desc);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.addEventListener('click', () => onEdit(link));

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Excluir';
    delBtn.className = 'danger';
    delBtn.addEventListener('click', () => onDelete(link.id));

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(left);
    li.appendChild(actions);
    listEl.appendChild(li);
  }
}

async function onEdit(link) {
  const title = prompt('Novo título:', link.title || '');
  if (title === null) return;
  const url = prompt('Nova URL:', link.url || '');
  if (url === null) return;
  const description = prompt('Nova descrição:', link.description || '');
  if (description === null) return;

  const res = await fetch(`${apiBase}/${link.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, url, description })
  });

  if (!res.ok) {
    const err = await res.json();
    setMsg(err.error || 'Erro ao editar link', true);
    return;
  }
  setMsg('Link atualizado!');
  fetchLinks();
}

async function onDelete(id) {
  if (!confirm('Tem certeza que deseja excluir?')) return;
  const res = await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const err = await res.json();
    setMsg(err.error || 'Erro ao excluir', true);
    return;
  }
  setMsg('Link excluído!');
  fetchLinks();
}

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(formEl);
  const payload = Object.fromEntries(formData.entries());

  // Garantir que os campos vieram
  if (!payload.title || !payload.url) {
    setMsg('Título e URL são obrigatórios', true);
    return;
  }

  const res = await fetch(apiBase, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const err = await res.json();
    setMsg(err.error || 'Erro ao salvar', true);
    return;
  }

  formEl.reset();
  setMsg('Link adicionado!');
  fetchLinks();
});

// Inicializa
fetchLinks();