import Image from "next/image";

export default function ArticleList({ articles }) {
  return (
    <div className="flex gap-4 flex-col w-full">
      {articles.map((article) => (
        <div
          className="flex justify-between border-gray-200 border-b pb-2 px-2 gap-6 transition-all duration-200 hover:bg-white"
          key={article.articleid}
        >
          <div className="flex items-center">
            <div className="rounded">
              {article && article.imageurl && (
                <Image
                  src={article.imageurl}
                  width={200}
                  height={200}
                  objectFit="cover"
                  className="max-w-full h-auto rounded-lg transition-shadow ease-in-out shadow-none"
                  alt="image of the article"
                />
              )}
            </div>

            <div className="flex flex-col justify-center items-center py-4 px-8">
              <h1 className="textl-lg font-semibold text-gray-900">Price</h1>
              <h2 className="text-xl font-bold">{article.price}€</h2>
            </div>

            <div className="flex flex-col justify-center items-center py-4 px-8">
              <h1 className="text-lg font-semibold">
                {article.publicationstatus}
              </h1>
            </div>

            <div className="flex flex-col justify-center items-center py-4 px-8">
              <h1 className="text-lg font-semibold">Modificado</h1>
              <h2 className="font-bold text-gray-500">to/do/fecha</h2>
            </div>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <button className="px-4 py-2 bg-red-600 rounded font-bold text-white">
              example
            </button>
            <button className="px-4 py-2 bg-blue-600 rounded font-bold text-white">
              edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
