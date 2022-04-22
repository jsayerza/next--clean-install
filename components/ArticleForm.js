import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage, useField  } from "formik";
import * as yup from "yup";
import { getDownloadURL } from "firebase/storage";

import { uploadImage } from "../firebase/client";
import { useUser } from "context/authContext";
import { HOST_SV, PORT_SV } from "config/config";

export function ArticleForm({ articleUpdateId = null }) {
  console.log("articleUpdateId: ", articleUpdateId);

  const router = useRouter();
  const { user } = useUser();
  //console.log("ArticleForm/user.email: ", user.email)

  const [updateArticle, setUpdateArticle] = useState({
    articlecategoryid: 0,
    articletitle: "",
    price: "",
    description: "",
    imageurl: "",
  });

  const [urlImg, setUrlImg] = useState("");
  const [articleCategory, setArticleCategory] = useState([]);
  const [articleStatus, setArticleStatus] = useState([]);

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


  const getTables = async () => {
    //console.log("getTables")
    const { data: articleCategory } = await axios.get(
      HOST_SV + PORT_SV + "/api/tables",
      {
        params: {
          table: "articleCategory",
        },
      }
    );
    //console.log("articleCategory: ", articleCategory);
    setArticleCategory(articleCategory);

    const { data: articleStatus } = await axios.get(
      HOST_SV + PORT_SV + "/api/tables",
      {
        params: {
          table: "articleStatus",
        },
      }
    );
    //console.log("articleStatus: ", articleStatus);
    setArticleStatus(articleStatus);
  };

  ////TODO: cambiar esto. No hace falta que vuelva a cargar tablas cada vez que hay un cambio en state!!!
  if (articleCategory.length < 1) {
    //console.log("articleCategory.length: ", articleCategory.length);
    getTables();
  }


  useEffect(() => {
    if (articleUpdateId !== null) {
      axios
        .get(HOST_SV + PORT_SV + `/api/articles/${articleUpdateId}`)
        .then((res) => {
          console.log("useEffect/res.data: ", res.data);
          setUpdateArticle({
            articlecategoryid: res.data.articlecategoryid,
            articletitle: res.data.articletitle,
            description: res.data.description,
            price: res.data.price,
            imageurl: res.data.imageurl,
          });
        });
    }
  }, [articleUpdateId]);

  const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div>
        <label 
          htmlFor={props.id || props.name}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {label}
        </label>
        <select {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };


  return (
    <div className="w-full max-w-xs">
      <Formik
        initialValues={{
          articlecategoryid: articleUpdateId ? updateArticle.articlecategoryid : 0,
          articletitle: articleUpdateId ? updateArticle.articletitle : "",
          price: articleUpdateId ? updateArticle.price : 0,
          description: articleUpdateId ? updateArticle.description : "",
          useremail: articleUpdateId ? updateArticle.useremail : "", 
        }}
        validationSchema={
          new yup.ObjectSchema({
            articletitle: yup.string().required("Title is required"),
            price: yup.number().required("Price is required"),
            description: yup.string().required("Description is required"),
          })
        }
        onSubmit={(values, actions) => {
          console.log("onSubmit/values: ", values);
          if (articleUpdateId !== null) {
            return axios
              .put(HOST_SV + PORT_SV + `/api/articles/${articleUpdateId}`, {
                ...values,
                useremail: `${user.email}`
              })
              .then((res) => router.push("/"));
          }
          return axios
            .post(HOST_SV + PORT_SV + "/api/articles", {
              ...values,
              useremail: `${user.email}`
            })
            .then((response) => {
              console.log(response.data);
              return axios
                .post(HOST_SV + PORT_SV + "/api/articles/image", {
                  articleId: response.data.articleid,
                  url: urlImg,
                })
                .then((res) => router.push("/"))
                .catch((e) => console.error(e));
            })
            .catch((e) => console.log(e));
        }}
        enableReinitialize
      >
        {({ handleSubmit, setFieldValue }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 py-6 pb-8 mb-4"
          >
            {articleUpdateId ? (
              <h1 className="mb-4 text-3xl font-bold">Editar article</h1>
            ) : (
              <h1 className="mb-4 text-3xl font-bold">Afegir article</h1>
            )}

{/*             <div className="mb-4">
              <MySelect 
                label="Categoria: " 
                name="articlecategoryid"
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
              </MySelect>
            </div>
 */}
            <div className="mb-4">
              <label
                htmlFor="articlecategoryid"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Categoria: 
              </label>
              <ErrorMessage
                component="p"
                className="text-xl text-left text-red-500"
                name="articlecategoryid"
              />
              <select>
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
                htmlFor="articletitle"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Posa nom a l'article:
              </label>
              <ErrorMessage
                component="p"
                className="text-xl text-left text-red-500"
                name="articletitle"
              />
              <Field
                type="text"
                name="articletitle"
                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Preu (donació = 0€):
              </label>
              <ErrorMessage
                component="p"
                className="text-xl text-left text-red-500"
                name="price"
              />
              <Field name="price" type="number" className="text-right"/>€
            </div>

            <div className="mb-4">
              <input
                type="file"
                name="imageUrl"
                onChange={(e) =>
                  setFieldValue("imageUrl", handleUpload(e.target.files[0]))
                }
              />
            </div>
            {updateArticle.imageurl ? 
              <div class="flex flex-wrap justify-center">
                <img
                  src={updateArticle.imageurl}
                  class="max-w-full h-auto rounded-lg transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
                  alt="..."
                />
            </div>            
          : 
            <div></div>
            }

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
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
                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="useremail"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                User:
              </label>
              <ErrorMessage
                component="p"
                className="text-xl text-left text-red-500"
                name="useremail"
              />
              <Field
                type="text"
                name="useremail"
                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
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

