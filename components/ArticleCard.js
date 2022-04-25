import Image from "next/image";
import Link from "next/link";
import { BadgeStatus } from "./BadgeStatus";

export function ArticleCard({ article }) {
  console.log(article.imageurl);
  return (
    <Link href={`/articles/${article.articleid}`} key={article.articleid}>
      <a>
        <div className="border border-gray-200 shadow-sm flex flex-col min-w-md max-w-md duration-300 hover:shadow-lg rounded bg-white">
          <div className="flex flex-wrap justify-center">
            {article.imageurl ? (
              <Image
                src={article.imageurl}
                width={432}
                height={345}
                objectFit="cover"
                className="max-w-full h-auto rounded-lg transition-shadow ease-in-out shadow-none"
                alt="image of the article"
              />
            ) : (
              "No hay imagen"
            )}
          </div>
          <div className="p-5">
            <div className="py-2">
              <h1 className="text-2xl font-bold text-center text-gray-900">
                {article.articletitle}
              </h1>
            </div>
            <h3 className="text-md font-semibold">{article.articlecategory}</h3>
            <p className="font-bold text-gray-800 py-4 text-lg">
              {article.description}
            </p>
            <BadgeStatus status={article.articlestatus} />
            <h3 className="font-semibold text-gray-800 text-lg py-1">
              {article.course}
            </h3>
            <h3 className="font-semibold text-gray-800 text-lg">
              {article.location} ({article.locationid})
            </h3>
            <h3 className="font-semibold text-lg">
              {article.publicationstatus}
            </h3>
            <h2>{article.salestatus}</h2>
            <h2 className="text-right text-2xl font-semibold">
              {article.price} €
            </h2>
          </div>
        </div>
      </a>
    </Link>
  );
}
