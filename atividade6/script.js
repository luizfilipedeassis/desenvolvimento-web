const inputTarefa = document.getElementById("inputTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("listaTarefas");

btnAdicionar.addEventListener("click", () => {

    const textoTarefa = inputTarefa.value;

    if (textoTarefa !== "") {

        const novaTarefa = document.createElement("li");

        novaTarefa.textContent = textoTarefa;

        listaTarefas.appendChild(novaTarefa);

        inputTarefa.value = "";
    }

});

listaTarefas.addEventListener("click", (evento) => {

    if (evento.target.tagName === "LI") {

        evento.target.remove();
    }

});