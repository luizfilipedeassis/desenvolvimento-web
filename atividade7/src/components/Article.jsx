function Article(props) {
  return (
    <article>

      <h2>{props.titulo}</h2>

      <p>Autor: {props.autor}</p>

      <p>Data: {props.data}</p>

      <p>{props.conteudo}</p>

      <img src={props.imagem} alt={props.titulo} />

    </article>
  );
}

export default Article;