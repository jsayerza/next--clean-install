import { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "../components/Layout";
import { ArticleCard } from "../components/ArticleCard";
import { HOST_SV, PORT_SV } from "../config/config";
import SearchBar from "components/SearchBar";
import { SearchResults } from "components/SearchResults";

const SEARCH_STATE = {
  EMPTY: "",
};

const SEARCH_RESULT_STATE = {
  EMPTY: [],
};

function HomePage({ articles }) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    async function searchedResults() {
      const response = await axios.get(
        HOST_SV + PORT_SV + `/api/articles/search/${search}`
      );
      console.log(response.data);
      setSearchResult(response.data);
    }
    searchedResults();
  }, [search]);

  return (
    <Layout>
      <SearchBar change={handleChange} />
      <h1 className="text-center text-2xl font-bold">
        {articles.length === 0 || searchResult.length === 0
          ? ""
          : `Resultado de "${search}"`}
      </h1>
      {searchResult === [] && <span>no existe</span>}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {searchResult.length > 0 ? (
          <SearchResults searched={searchResult} />
        ) : (
          articles.map((article) => (
            <ArticleCard key={article.articleid} article={article} />
          ))
        )}
      </div>
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
  console.log("getServerSideProps/articles: ", articles);

  return {
    props: {
      articles,
    },
  };
};

export default HomePage;
