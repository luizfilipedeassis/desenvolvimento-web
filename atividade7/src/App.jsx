import "./style.css";

import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Article from "./components/Article";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import re9 from "./assets/re9.jpg";

function App() {

  const post = {
    titulo: "Resident Evil Requiem",
    autor: "Luiz Filipe",
    data: "27 de fevereiro de 2026",
    conteudo:
      "Resident Evil Requiem é o nono jogo principal da franquia da Capcom."
  };

  return (
    <>
      <Header />
      <Navigation />

      <main>

        <Article
          titulo={post.titulo}
          autor={post.autor}
          data={post.data}
          conteudo={post.conteudo}
          imagem={re9}
        />

        <Sidebar />

      </main>

      <Footer />
    </>
  );
}

export default App;