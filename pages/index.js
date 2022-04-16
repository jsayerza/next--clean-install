// import axios from "axios";
import { Layout } from "../components/Layout";
/* import { ArticleCard } from "../components/ArticleCard";
import { HOSTSERVER, PORTSERVER } from "../config/config"; */

function HomePage({ articles }) {
  //console.log(articles);

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
        <h1 className="text-xl">Funciona! tailwind!</h1>
      </div>
    </Layout>
  );
}

//// Funció especial de Next per executar codi de server que s'executa abans que la pantalla es presenti en el client.
////   Després carrega el return de HomePage
/* export const getServerSideProps = async (context) => {
  
  const {data: articles} = await axios.get(HOSTSERVER + PORTSERVER + "/api/articles")
  //console.log(articles);

  return {
    props: {
      articles,
    },
  }
}
 */
export default HomePage;
