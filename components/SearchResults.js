import { ArticleCard } from "components/ArticleCard";

export const SearchResults = ({ searched }) => {
  return (
    <>
      {searched.map((article) => (
        <ArticleCard key={article.articleid} article={article} />
      ))}
    </>
  );
};
