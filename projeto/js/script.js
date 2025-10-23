const form = document.getElementById('formCadastro');
const listaUsuarios = document.getElementById('listaUsuarios');
const filtro = document.getElementById('filtro');
const erro = document.getElementById('erro');

let usuarios = [];

// Função para renderizar os cards
function renderizarUsuarios(lista = usuarios) {
  listaUsuarios.innerHTML = '';

  if (lista.length === 0) {
    listaUsuarios.innerHTML = '<p>Nenhum usuário cadastrado.</p>';
    return;
  }

  lista.forEach((user, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${user.nome}</h3>
      <p><strong>E-mail:</strong> ${user.email}</p>
      <p><strong>Idade:</strong> ${user.idade}</p>
      <p><strong>Cargo:</strong> ${user.cargo}</p>
    `;

    // Remover usuário com duplo clique
    card.ondblclick = () => {
      if (confirm(`Remover ${user.nome}?`)) {
        usuarios.splice(index, 1);
        salvarLocalStorage();
        renderizarUsuarios();
      }
    };

    listaUsuarios.appendChild(card);
  });
}

// Salvar no localStorage
function salvarLocalStorage() {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Carregar usuários salvos
function carregarLocalStorage() {
  const dados = localStorage.getItem('usuarios');
  if (dados) {
    usuarios = JSON.parse(dados);
    renderizarUsuarios();
  }
}

// Cadastrar novo usuário
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const idade = document.getElementById('idade').value.trim();
  const cargo = document.getElementById('cargo').value.trim();

  if (!nome || !email || !idade || !cargo) {
    erro.textContent = 'Todos os campos são obrigatórios.';
    return;
  }

  erro.textContent = '';

  const novoUsuario = { nome, email, idade, cargo };
  usuarios.push(novoUsuario);
  salvarLocalStorage();
  renderizarUsuarios();

  form.reset();
});

// Filtro por nome
filtro.addEventListener('input', (e) => {
  const termo = e.target.value.toLowerCase();
  const filtrados = usuarios.filter(u => u.nome.toLowerCase().includes(termo));
  renderizarUsuarios(filtrados);
});

// Inicialização
carregarLocalStorage();
