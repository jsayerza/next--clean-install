import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { HOST_SV, PORT_SV } from "config/config";
import { Layout } from "../../components/Layout";


function ArticleView({article}) {
    //console.log("article: ", article);

    const router = useRouter();
    
    const handleDelete = async (id) => {
        try {
            //console.log(id);
            await axios.delete("/api/articles/" + id);
            router.push("/");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };


    return (
        <Layout>

            <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="min-w-full">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="min-w-full">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="flex flex-wrap justify-center">
                                                    <img
                                                    src={article.imageurl}
                                                    className="max-w-sm h-auto rounded-lg transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl p-1 bg-white border "
                                                    alt="..."
                                                />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>

                                <td>
                                    <table class="min-w-full">
                                    <tbody>
                                        <tr class="border-b">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                Article:
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {article.articletitle}
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            articlecategory: 
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {article.articlecategory}
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                description:
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {article.description}
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                articlestatus:
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {article.articlestatus}
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                course:
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {article.course}
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                location:
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {article.locationid} - {article.location}
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                publicationstatus:
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {article.publicationstatus}
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                salesstatus:
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {article.salestatus}
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                price:
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {article.price} €
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                Referència:
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {/* ////TODO: Hay que mostrar el nombre del vendedor, no el email. 
                                                2 opciones:
                                                1. Guardar el nombre del vendedor en el article
                                                2. Hacer fetch del nombre en Firebase, a partir del email del vendedor*/}

                                                {article.useremail}
                                            </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>    
                    </table>
                </div>
                </div>
            </div>
            </div>




{/*             <h1>{article.articletitle}</h1>

            <p>{article.articlecategory}</p>
            <p>{article.description}</p>
            <p>{article.articlestatus}</p>
            <p>{article.courseid}</p>
            <p>{article.locationid}</p>
            <p>{article.publicationstatusid}</p>
            <p>{article.salesstatusid}</p>
            <p>{article.price} €</p>
            <p>Referència: {article.useremail}</p>
 */}
{/*             <div className="flex flex-wrap justify-center">
                <img
                src={article.imageurl}
                className="max-w-sm h-auto rounded-lg transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl p-1 bg-white border "
                alt="..."
            />
            </div>
 */}
            <div className="py-5">
                <button className="bg-red-500 hover:bg-red-700 text-white rounded px-3 py-2" 
                    onClick={() => handleDelete(article.articleid)}
                >
                    Elimina article
                </button>
                <button className="bg-gray-500 hover:bg-gray-800 text-white rounded ml-2 px-5 py-2"
                    onClick={() => {
                        //console.log("ArticleView/article.articleid: ", article.articleid)
                        router.push("/articles/edit/" + article.articleid)
                    }
                    }
                >
                    Edita article
                </button>
            </div>
        </Layout>
    )
}

//// Funció especial de Next per executar codi de server que s'executa abans que la pantalla es presenti en el client. Després carrega el return de HomePage
export const getServerSideProps = async (context) => {
  
    const {data: article} = await axios.get(HOST_SV + PORT_SV + "/api/articles/" + context.query.id);
    //console.log("ArticleView/getServerSideProps/article: ", article);
  
    return {
      props: {
        article,
      },
    }
  }

export default ArticleView;