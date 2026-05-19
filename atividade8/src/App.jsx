import { useState } from "react";
import "./style.css";

function App() {

  const [tarefas, setTarefas] = useState([]);

  const [novaTarefa, setNovaTarefa] = useState("");

  function adicionarTarefa() {

    if (novaTarefa.trim() === "") {
      return;
    }

    const tarefa = {
      id: Date.now(),
      text: novaTarefa
    };

    setTarefas([...tarefas, tarefa]);

    setNovaTarefa("");
  }

  function removerTarefa(id) {

    const novaLista = tarefas.filter((tarefa) => tarefa.id !== id);

    setTarefas(novaLista);
  }

  return (
    <div className="container">

      <h1>Lista de Tarefas</h1>

      <div className="input-area">

        <input
          type="text"
          placeholder="Digite uma tarefa"
          value={novaTarefa}
          onChange={(evento) => setNovaTarefa(evento.target.value)}
        />

        <button onClick={adicionarTarefa}>
          Adicionar
        </button>

      </div>

      <ul>

        {tarefas.map((tarefa) => (

          <li key={tarefa.id}>

            <span>{tarefa.text}</span>

            <button onClick={() => removerTarefa(tarefa.id)}>
              Remover
            </button>

          </li>

        ))}

      </ul>

    </div>
  );
}

export default App;