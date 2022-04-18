import Link from "next/link";

export function ArticleCard({article}) {
  return (
    <Link href={`/articles/${article.articleid}`} key={article.articleid}>
    <a>
      <div  className="border border-gray-200 shadow-md p-6">
        <h1>{article.articletitle}</h1>
        <p>{article.articlecategoryid}</p>
        <p>{article.description}</p>
        <p>{article.price}</p>
      </div>
    </a>
  </Link>
)
}
