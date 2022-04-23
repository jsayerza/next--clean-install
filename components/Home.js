import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { HOST_SV, PORT_SV } from "config/config";
import SearchBar from "components/SearchBar";
import { SearchResults } from "components/SearchResults";
import { ArticleCard } from "components/ArticleCard";
import debounce from "just-debounce-it";

const SEARCH_STATE = {
  EMPTY: "",
};

const SEARCH_RESULT_STATE = {
  EMPTY: [],
};

export const Home = ({ articles }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleChange = useCallback(
    debounce((e) => setSearch(e.target.value), 300),
    [search]
  );

  useEffect(() => {
    // abort controller nativo de javascript
    const controller = new AbortController();

    async function searchedResults() {
      const response = await axios.get(
        HOST_SV + PORT_SV + `/api/articles/search/${search}`,
        // señal para abortar la peticion
        { signal: controller.signal }
      );
      //console.log(response.data);
      setSearchResult(response.data);
    }
    searchedResults();

    // funcion que se dispara cuando se desmonta un componente de react
    return () => controller.abort();
  }, [search]);

  return (
    <>
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
    </>
  );
};
