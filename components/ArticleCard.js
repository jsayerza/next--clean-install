import Link from "next/link";

export function ArticleCard({article}) {
  return (
    <Link href={`/articles/${article.articleid}`} key={article.articleid}>
    <a>
      <div  className="border border-gray-200 shadow-md p-6">
        <h1>{article.articletitle}</h1>
        <p>{article.articlecategory} ({article.articlecategoryid})</p>
        <p>{article.description}</p>
        <p>{article.price} €</p>
        <p>user: {article.useremail}</p>
        <div class="flex flex-wrap justify-center">
          <img
          src={article.imageurl}
          class="max-w-full h-auto rounded-lg transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
          alt="..."
        />
        </div>
      </div>
    </a>
  </Link>
)
}
