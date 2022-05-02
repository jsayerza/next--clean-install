import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { SearchResults } from "../components/SearchResults";
import ArticleCard from "../components/ArticleCard";
import { HOST_SV, PORT_SV } from "../config/config";
import debounce from "just-debounce-it";

const SEARCH_STATE = {
  EMPTY: "",
};

const SEARCH_RESULT_STATE = {
  NOT_FOUND: null,
  EMPTY: [],
};

export const Home = ({ articles }) => {
  const [search, setSearch] = useState(SEARCH_STATE.EMPTY);
  const [searchResult, setSearchResult] = useState(SEARCH_RESULT_STATE.EMPTY);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(
    debounce((e) => setSearch(e.target.value), 300),
    [search]
  );

  useEffect(() => {
    // abort controller nativo de javascript
    const controller = new AbortController();

    async function searchedResults() {
      if (search !== SEARCH_STATE.EMPTY) {
        const response = await axios.get(
          //`http://escolapop.hopto.org:3000/api/articles/search/${search}`,
          //`http://localhost:3000/api/articles/search/${search}`,
          HOST_SV + PORT_SV + `/api/articles/search/${search}`,
          // señal para abortar la peticion
          { signal: controller.signal }
        );
        if (response.data.length === 0) {
          return setSearchResult(null);
        }
        console.log("searchedResults/response.data: ", response.data);
        return setSearchResult(response.data);
      }
      return setSearchResult(articles);
    }
    searchedResults();

    // funcion que se dispara cuando se desmonta un componente de react
    return () => controller.abort();
  }, [articles, search]);

  if (searchResult === null) {
    return (
      <>
        <SearchBar change={handleChange} />
        <h1 className="text-center text-2xl font-bold">
          No hi ha resultats de {`"${search}"`}
        </h1>
      </>
    );
  }

  return (
    <>
      <SearchBar change={handleChange} />
      <h1 className="text-center text-2xl font-bold">
        {searchResult === SEARCH_RESULT_STATE.NOT_FOUND ||
        search === SEARCH_STATE.EMPTY
          ? ""
          : `Resultat de "${search}"`}
      </h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {searchResult?.length > 0 ? (
          <SearchResults searched={searchResult} />
        ) : (
          search === SEARCH_STATE.EMPTY &&
          articles.map((article) => (
            <ArticleCard key={article.articleid} article={article} />
          ))
        )}
      </div>
    </>
  );
};
