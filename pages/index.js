import axios from "axios";
import { Layout } from "../components/Layout";
import { ArticleCard } from "../components/ArticleCard";
import { HOSTSERVER, PORTSERVER } from "../config/config";
import { useUser } from "context/authContext";

function HomePage({ articles }) {
  //console.log(articles);
  const { user } = useUser();
  console.log(user);

  /*   const renderArticles = () => {
    if (articles.length === 0)
      return (
        <h1 className="text-center text-2xl font-bold">No hi ha articles</h1>
      );

    return articles.map((article) => (
      <ArticleCard key={article.id} article={article} />
    ));
  }; */

  return (
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {!articles.length > 0 ? (
          <h1 className="text-center text-2xl font-bold">No hi ha articles</h1>
        ) : (
          articles.map((article) => (
            <ArticleCard key={article.articleid} article={article} />
          ))
        )}
        <h1 className="text-xl">Funciona! tailwind!</h1>
      </div>
    </Layout>
  );
}

//// Funció especial de Next per executar codi de server que s'executa abans que la pantalla es presenti en el client.
////   Després carrega el return de HomePage
export const getServerSideProps = async (context) => {
  /*   const { data: articles } = await axios.get(
    HOSTSERVER + PORTSERVER + "/api/articles"
  ); */

  const response = await fetch(HOSTSERVER + PORTSERVER + "/api/articles");
  if (!response.ok) {
    const error = new Error("something bad happended");
    console.log(error);
  }
  const articles = await response.json();
  // console.log(data);

  console.log(articles);

  return {
    props: {
      articles,
    },
  };
};

export default HomePage;
