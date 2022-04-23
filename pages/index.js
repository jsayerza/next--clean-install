import axios from "axios";
import { Layout } from "../components/Layout";
import { HOST_SV, PORT_SV } from "../config/config";
import { Home } from "components/Home";

function HomePage({ articles }) {
  return (
    <Layout>
      <Home articles={articles} />
      {/*       <div>
        <h1 className="text-xl">Funciona! tailwind!</h1>
      </div>
 */}
    </Layout>
  );
}

//// Funció especial de Next per executar codi de server que s'executa abans que la pantalla es presenti en el client.
////   Després carrega el return de HomePage
export const getServerSideProps = async (context) => {
  /*   const response = await fetch(HOST_SV + PORT_SV + "/api/articles");
  if (!response.ok) {
    const error = new Error("something bad happended");
    console.log(error);
  }
  const articles = await response.json();
  // console.log(data);
  console.log(articles);
 */
  const { data: articles } = await axios.get(
    HOST_SV + PORT_SV + "/api/articles"
  );
  //console.log("getServerSideProps/articles: ", articles);

  return {
    props: {
      articles,
    },
  };
};

export default HomePage;
