const lista = document.getElementById("objetos");

function carregarObjts() {
  fetch("/objetos")
    .then((resposta) => resposta.json())
    .then((objetos) => {
      lista.innerHTML = "";

      objetos.forEach((objt) => {
        lista.innerHTML += `
          <div class="card">
            <h3>${objt.nome}</h3>
            <p>${objt.descricao}</p>
            <p>Categoria: ${objt.categoria}</p>
            <p>Local: ${objt.local}</p>
            <p>Status: ${objt.status}</p>
          </div>
        `;
      });
    });
}
carregarObjts();

const input = document.getElementById("input");
const botao = document.getElementById("buscar");

botao.addEventListener("click", () => {
  const nome = input.value;
  fetch(`/objetos/busca/${nome}`)
    .then((resposta) => resposta.json())
    .then((objetos) => {
      lista.innerHTML = "";

      objetos.forEach((objt) => {
        lista.innerHTML += `<div class="card">
    <h3>${objt.nome}</h3>
    <p>${objt.descricao}</p>
    <p>categoria: ${objt.categoria}</p>
    <p>local: ${objt.local}</p>
    <p>status: ${objt.status}</p>
    </div>`;
      });
    });
});

const form = document.getElementById("form-cadastro");

const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const categoria = document.getElementById("categoria");
const local = document.getElementById("local");
const data = document.getElementById("data");
const status = document.getElementById("status");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  fetch("/objetos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome.value,
      descricao: descricao.value,
      categoria: categoria.value,
      local: local.value,
      data_ocorrencia: data.value,
      status: status.value,
    }),
  })
    .then((resposta) => {
      console.log("STATUS:", resposta.status);
      return resposta.json();
    })
    .then((dados) => {
      console.log("RESPOSTA:", dados);
      form.reset()
      carregarObjts()
    })
    .catch((erro) => {
      console.log("ERRO:", erro);
    });
});
