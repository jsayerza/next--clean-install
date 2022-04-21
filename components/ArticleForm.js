import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { getDownloadURL } from "firebase/storage";

import { uploadImage } from "../firebase/client";
import { useUser } from "context/authContext";
import { HOST_SV, PORT_SV } from "config/config";


export function ArticleForm({ articleUpdateId = null }) {

  console.log("articleUpdateId: ", articleUpdateId)

  //const fileRef = useRef(null);
  const router = useRouter();
  const { user } = useUser();

  let isAddMode = true;
  
/*   const [article, setArticle] = useState({
    articletitle: "",
    description: "",
    articlecategoryid: "",
    articlestatusid: "",
    price: 0,
  });
 */

  const [updateArticle, setUpdateArticle] = useState({
    articletitle: "",
    price: "",
    description: "",
  });

  const [urlImg, setUrlImg] = useState("");
  const [image, setImage] = useState(null);
  const [articleCategories, setArticleCategories] = useState([]);
  const [articleCategory, setArticleCategory] = useState([]);
  const [articleStatus, setArticleStatus] = useState([]);


  /*   const handleFileUploadButton = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };
 */

  const handleUpload = (file) => {
    const { uploadTask } = uploadImage(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      // si hay error lo ejecutamos
      (err) => console.log(err),
      // si todo fue ok hacemos un callback con una promesa recuperando la url y la seteamos al estado
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(setUrlImg);
      }
    );
  };

/*   const handleFormSubmit = async (e) => {
    //toast.success("Hola handleFormSubmit");
    //console.log("handleFormSubmit/e", e);
    e.preventDefault();

    try {
      //console.log("handleFormSubmit/try");
      //toast.success("Hola handleFormSubmit/try");
      if (router.query.id) {
        //console.log("update");
        const res = await axios.put("/api/articles/" + router.query.id, article);
        //console.log("update/res: ", res);
        toast.success("Article actualitzat");
      } else {
        console.log("add");
        console.log("add/article: ", article);
        const res = await axios.post("/api/articles", article);
        //console.log("add/res: ", res);
        toast.success("Article enregistrat");
      }
      router.push("/");
    } catch (error) {
      toast.log(error.response.data.message);
    }
  };
 */

/*   const handleChange = ({ target: { name, value } }) => {
    console.log(name, value)
    setArticle({ ...article, [name]: value });
  };
 */


  const getTables = async () => {
    //console.log("getTables")
    const {data: articleCategory} = await axios.get(HOST_SV + PORT_SV + "/api/tables", {
      params: {
        table: "articleCategory"
      }
    })
    //console.log("articleCategory: ", articleCategory);
    setArticleCategory(articleCategory);
    
    const {data: articleStatus} = await axios.get(HOST_SV + PORT_SV + "/api/tables", {
      params: {
        table: "articleStatus"
      }
    })
    //console.log("articleStatus: ", articleStatus);
    setArticleStatus(articleStatus);
  }

/*   useEffect(() => {
    //console.log("useEffect");
    ////TODO: cambiar esto. No hace falta que vuelva a cargar tablas cada vez que hay un cambio en state!!!
    getTables();

    const getArticle = async () => {
      const { data } = await axios.get("/api/articles/" + router.query.id);
      setArticle(data);
      console.log("getArticle/data: ", data);
      //const { data: categories } = await axios.get("/api/articles/categories");
      //setArticleCategories(categories);
    };

    if (router.query?.id) {
      isAddMode = false;
      console.log("useEffect/router.query.id: ", router.query.id)
      getArticle(router.query.id);
    }
  }, [router.query.id]);
 */

  useEffect(() => {
    if (articleUpdateId !== null) {
      axios
        .get(`http://localhost:3000/api/articles/${articleUpdateId}`)
        .then((res) => {
          setUpdateArticle({
            articletitle: res.data.articletitle,
            description: res.data.description,
            price: res.data.price,
          });
        });
    }
  }, [articleUpdateId]);

  
  return (
    <div className="w-full max-w-xs">
      <Formik
        initialValues={{
          articletitle: articleUpdateId ? updateArticle.articletitle : "",
          price: articleUpdateId ? updateArticle.price : 0,
          description: articleUpdateId ? updateArticle.description : "",
        }}
        validationSchema={
          new yup.ObjectSchema({
            articletitle: yup.string().required("Title is required"),
            price: yup.number().required("Price is required"),
            description: yup.string().required("Description is required"),
          })
        }
        onSubmit={async (values, actions) => {
          if (articleUpdateId !== null) {
            await axios.put(
              `http://localhost:3000/api/articles/${articleUpdateId}`,
              {
                ...values,
                useremail: `${user.email}`,
              }
            );
            router.push("/");
          }
          return axios
            .post("http://localhost:3000/api/articles", {
              ...values,
              useremail: `${user.email}`,
            })
            .then((response) => {
              return axios
                .post("http://localhost:3000/api/articles/image", {
                  articleId: response.data.articleid,
                  url: urlImg,
                })
                .catch((e) => console.error(e));
            })
            .catch((e) => console.log(e));
        }}
        enableReinitialize
      >
        {({ handleSubmit, setFieldValue }) => (
          <Form
            onSubmit={handleSubmit}
            /* onSubmit={formik.handleSubmit} */
            className="bg-white shadow-md rounded px-8 py-6 pb-8 mb-4"
          >
            {articleUpdateId ? (
              <h1 className="mb-4 text-3xl font-bold">Editar</h1>
            ) : (
              <h1 className="mb-4 text-3xl font-bold">Crear</h1>
            )}

            <div className="mb-4">
              <label
                htmlFor="articletitle"
                className="block text-gray-700 text-sm font-blod mb-2"
              >
                Article:
              </label>
              <ErrorMessage
                component="p"
                className="text-xl text-left text-red-500"
                name="articletitle"
              />
              <Field
                type="text"
                name="articletitle"
                /* onChange={formik.handleChange} */
                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                /* value={formik.values.articletitle} */
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 text-sm font-blod mb-2"
              >
                Preu:
              </label>
              <ErrorMessage
                component="p"
                className="text-xl text-left text-red-500"
                name="price"
              />
              <Field
                name="price"
                type="number"

                /* onChange={formik.handleChange} */
                /* value={formik.values.price} */
              />
            </div>

            {/*           <button
            onClick={(e) => {
              e.preventDefault();
              fileRef.current.click();
            }}
          >
            Upload File
          </button> */}

            <div className="mb-4">
              <input
                type="file"
                name="imageUrl"
                onChange={(e) =>
                  setFieldValue("imageUrl", handleUpload(e.target.files[0]))
                }
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-blod mb-2"
              >
                Descripció:
              </label>
              <ErrorMessage
                component="p"
                className="text-xl text-left text-red-500"
                name="description"
              />
              <Field
                as="textarea"
                name="description"
                rows="2"
                /* onChange={formik.handleChange} */
                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                /* value={formik.values.description} */
              ></Field>
            </div>

            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
            >
              {articleUpdateId ? "Editar" : "Crear"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}


{/*       <form
        onSubmit={handleFormSubmit} 
        className="bg-white shadow-md rounded px-8 py-6 pb-8 mb-4"
      >
        <h1 className="mb-4 text-3xl font-bold">{isAddMode ? 'Afegir Article' : 'Editar Article'}</h1>

        <div className="mb-4">
          <label
            htmlFor="articletitle"
            className="block text-gray-700 text-sm font-blod mb-2"
          >
            Article:
          </label>
          <input
            type="text"
            name="articletitle"
            onChange={handleChange}
            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={article.articletitle}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-blod mb-2"
          >
            Preu:
          </label>
          <input
            type="text"
            name="price"
            id="price"
            onChange={handleChange}
            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={article.price}
          />
        </div>

        <div className="mb-4">
          <input
            ref={fileRef}
            type="file"
            accept="images/*"
            onChange={handleFileUpload}
            multiple={false}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="articlecategoryid" style={{ display: "block" }}>
            Categoria
          </label>
          <select
            name="articlecategoryid"
            value={article.articlecategoryid}
            onChange={handleChange}
            style={{ display: "block" }}
          >
            {articleCategory.map((category) => (
              <option
                key={category.articlecategoryid}
                value={category.articlecategoryid}
                label={category.articlecategory}
              >
                {category.articlecategory}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-blod mb-2"
          >
            Descripció:
          </label>
          <textarea
            name="description"
            rows="2"
            onChange={handleChange}
            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={article.description}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        >
          {router.query.id ? "Editar article" : "Crear article"}
        </button>
      </form>
 */}
