import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { HOST_SV } from "config/config";
import { Layout } from "../../components/Layout";
import { BadgeStatus } from "components/BadgeStatus";
import { BadgeSaleStatus } from "components/BadgeSaleStatus";
// import { useUser } from "context/authContext";
//import ButtonMailto from "components/ButtonMailTo";


function ArticleView({ article }) {
  // const { user } = useUser();
  // console.log(user);
  const { data } = useSession();
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      console.log("handleDelete/id: ", id);
      return await axios.delete("/api/articles/" + id)
        .then( (res) => {
          console.log("handleDelete/cap a : ", HOST_SV + `/api/articles/images`);
          console.log("handleDelete/then/id: ", id);
           axios.delete(HOST_SV + `/api/articles/images`, { articleimageid: id })
          .then((res) => {
            console.log("handleDelete/then/eliminat!");
            toast.success("Article eliminat");
            router.push("/");
          })
          .catch((e) =>
            console.error("handleDelete DELETE image error: ", e)
          );

          return router.push("/");
        })
        .catch((e) => console.log("handleDelete delete article error: ", e));
        

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 w-full">
          {article.imageurl ? (
            <Image
              src={article.imageurl}
              height={600}
              width={600}
              alt="image of the article"
            />
          ) : (
            "no hay imagen"
          )}
        </div>
        <div className="flex-1 w-full flex-col">
          <div className="py-4 text-3xl text-gray-900 font-bold flex justify-between items-center">
            <h1>{article.articletitle}</h1>
            <h2>{article.price}€</h2>
          </div>

          <div className="py-4 border-gray-200 border-b">
            <h2 className="text-lg text-gray-900 font-semibold pb-2">
              Descripció:
            </h2>
            <p className="text-lg text-gray-600 font-semibold">
              {article.description}
            </p>
          </div>

          <div className="py-2 flex justify-around items-center gap-4 my-4">
            <div>
              <h2 className="text-lg text-gray-900 font-semibold pb-2">
                Curs:
              </h2>
              <h2 className="text-lg text-gray-900 font-bold pb-2">
                {article.course}
              </h2>
            </div>

            <div>
              <h2 className="text-lg text-gray-900 font-semibold pb-2">
                Ubicació de l&apos;article:
              </h2>
              <h2 className="text-lg text-gray-900 font-bold pb-2">
                {article.location} ({article.locationid})
              </h2>
            </div>
          </div>

          <div className="py-2 flex justify-around items-center gap-4 my-4">
            <div>
              <h2 className="text-lg text-gray-900 font-semibold pb-2">
                Estat de l&apos;article:
              </h2>
              <BadgeStatus status={article.articlestatus} />
            </div>
            <div>
              <h2 className="text-lg text-gray-900 font-semibold pb-2">
                Estat de venda:
              </h2>
{/*               <span className="rounded-full font-bold bg-green-600 px-3 py-1 text-white">
                {article.salestatus}
              </span>
 */}
              <BadgeSaleStatus status={article.salestatus} />
            </div>

          </div>

          {data && data.user.email !== article.useremail && (
            <div className="my-12 flex justify-center">
              <button
                className="bg-cyan-600 hover:bg-gray-800 text-white text-lg font-bold rounded ml-2 py-3 px-5"
                onClick={() => router.push(`mailto:${article.useremail}`)}
              >
                Contacta amb el venedor
              </button>
            </div>
          )}
        </div>
      </div>

      {data && data.user.email === article.useremail && (
        <div className="py-5">
          <button
            className="bg-red-500 hover:bg-red-700 text-white rounded px-3 py-2"
            onClick={() => handleDelete(article.articleid)}
          >
            Elimina article
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-800 text-white rounded ml-2 px-3 py-2"
            onClick={() => {
              //console.log("ArticleView/article.articleid: ", article.articleid)
              router.push("/articles/edit/" + article.articleid);
            }}
          >
            Edita article
          </button>
          {/* <ButtonMailto label="Contacta amb el venedor" mailto="mailto: ${article.email}" /> */}
        </div>
      )}
    </Layout>
  );
}

//// Funció especial de Next per executar codi de server que s_executa abans que la pantalla es presenti en el client. Després carrega el return de HomePage
export const getServerSideProps = async (context) => {
  const { data: article } = await axios.get(
    HOST_SV + "/api/articles/" + context.query.id
  );
  //console.log("ArticleView/getServerSideProps/article: ", article);

  return {
    props: {
      article,
    },
  };
};

export default ArticleView;
