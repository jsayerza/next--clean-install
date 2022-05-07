import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { getDownloadURL } from "firebase/storage";
import Image from "next/image";

import { uploadImage } from "../firebase/client";
// import { useUser } from "context/authContext";
import { useSession } from "next-auth/react";
import { HOST_SV } from "../config/config";

export function ArticleForm({ articleUpdateId = null }) {
  //console.log("articleUpdateId: ", articleUpdateId);
  //console.log("ArticleForm/HOST_SV: ", HOST_SV);
  //console.log("ArticleForm/NEXT_PUBLIC_HOST_SV: ", NEXT_PUBLIC_HOST_SV);
  //console.log("ArticleForm/NEXT_PUBLIC_SECRET: ", NEXT_PUBLIC_SECRET);

  const router = useRouter();
  // const { user } = useUser();
  const { data } = useSession();
  //console.log("ArticleForm/data:" , data);
  //console.log("ArticleForm/user.email: ", user.email)
  //console.log("ArticleForm/user: ", user)

  const [updateArticle, setUpdateArticle] = useState({
    articlecategoryid: 0,
    articletitle: "",
    price: 0,
    description: "",
    imageurl: "",
    articlestatusid: 0,
    courseid: 0,
    locationid: 0,
    publicationstatusid: 0,
    salestatusid: 0,
  });

  const [urlImg, setUrlImg] = useState("");
  const [articleCategory, setArticleCategory] = useState([]);
  const [articleStatus, setArticleStatus] = useState([]);
  const [course, setCourse] = useState([]);
  const [location, setLocation] = useState([]);
  const [publicationStatus, setPublicationStatus] = useState([]);
  const [saleStatus, setSaleStatus] = useState([]);

  const handleUpload = (file) => {
    const { uploadTask } = uploadImage(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("handleUpload/progress: ", progress);
      },
      // si hay error lo ejecutamos
      (err) => console.log(err),
      // si todo fue ok hacemos un callback con una promesa recuperando la url y la seteamos al estado
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(setUrlImg);
      }
    );
  };

  useEffect(() => {
    const getTables = async () => {
      //console.log("getTables")
      const { data: articleCategory } = await axios.get(
        HOST_SV + "/api/tables",
        {
          params: {
            table: "articleCategory",
          },
        }
      );
      //console.log("articleCategory: ", articleCategory);
      setArticleCategory(articleCategory);

      const { data: articleStatus } = await axios.get(
        HOST_SV + "/api/tables",
        {
          params: {
            table: "articleStatus",
          },
        }
      );
      //console.log("articleStatus: ", articleStatus);
      setArticleStatus(articleStatus);

      const { data: course } = await axios.get(
        HOST_SV + "/api/tables",
        {
          params: {
            table: "course",
          },
        }
      );
      //console.log("course: ", course);
      setCourse(course);

      const { data: location } = await axios.get(
        HOST_SV + "/api/tables",
        {
          params: {
            table: "location",
          },
        }
      );
      //console.log("location: ", location);
      setLocation(location);

      const { data: publicationStatus } = await axios.get(
        HOST_SV + "/api/tables",
        {
          params: {
            table: "publicationStatus",
          },
        }
      );
      //console.log("publicationStatus: ", publicationStatus);
      setPublicationStatus(publicationStatus);

      const { data: saleStatus } = await axios.get(
        HOST_SV + "/api/tables",
        {
          params: {
            table: "saleStatus",
          },
        }
      );
      //console.log("saleStatus: ", saleStatus);
      setSaleStatus(saleStatus);
    };

    ////TODO: revisar esto. ¿carga varias veces?
    if (articleCategory.length < 1) {
      //console.log("articleCategory.length: ", articleCategory.length);
      getTables();
    }
    if (articleUpdateId !== null) {
      axios
        .get(HOST_SV + `/api/articles/${articleUpdateId}`)
        .then((res) => {
          //console.log("useEffect/res.data: ", res.data);
          setUpdateArticle({
            articlecategoryid: res.data.articlecategoryid,
            articletitle: res.data.articletitle,
            description: res.data.description,
            price: res.data.price,
            imageurl: res.data.imageurl,
            articlestatusid: res.data.articlestatusid,
            courseid: res.data.courseid,
            locationid: res.data.locationid,
            publicationstatusid: res.data.publicationstatusid,
            salestatusid: res.data.salestatusid,
          });
        });
    }
  }, [articleCategory.length, articleUpdateId]);

  /*   const MySelect = ({ label, ...props }) => {
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
 */

  /*   const MySelect = ({ label, name, table, key, optionlabel }) => {

    //label="Categoria: " 
    //name="articlecategoryid"
    //table="articleCategory"
    //key="articlecategoryid"
    //optionlabel="articlecategory"


    return (
      <div>
              <label
                htmlFor="articlecategoryid"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                {label}
              </label>
              <ErrorMessage
                component="p"
                className="text-xl text-left text-red-500"
                name={name}
              />
              <Field
                component="select"
                name={name}
                id={name}
                multiple={false}
                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                    <option
                      key={0}
                      value={0}
                      label="Selecciona..."
                    >
                      Selecciona...
                    </option>
                  
                {table.map((list) => (
                    <option
                      key={list.name}
                      value={list.name}
                      label={list.optionlabel}
                    >
                      {list.optionlabel}
                    </option>
                  ))}

              </Field>

      </div>
    );
  };
 */

  return (
    <div className="w-full max-w-xs">
      <Formik
        initialValues={{
          articlecategoryid: articleUpdateId
            ? updateArticle.articlecategoryid
            : 0,
          articletitle: articleUpdateId ? updateArticle.articletitle : "",
          price: articleUpdateId ? updateArticle.price : 0,
          description: articleUpdateId ? updateArticle.description : "",
          //useremail: articleUpdateId ? updateArticle.useremail : "",
          articlestatusid: articleUpdateId ? updateArticle.articlestatusid : 0,
          courseid: articleUpdateId ? updateArticle.courseid : 0,
          locationid: articleUpdateId ? updateArticle.locationid : 0,
          publicationstatusid: articleUpdateId
            ? updateArticle.publicationstatusid
            : 0,
          salestatusid: articleUpdateId ? updateArticle.salestatusid : 0,
        }}
        validationSchema={
          new yup.ObjectSchema({
            articletitle: yup.string().required("Title is required"),
            price: yup.number().required("Price is required"),
            description: yup.string().required("Description is required"),
          })
        }
        onSubmit={(values, actions) => {
          //console.log("onSubmit/values: ", values);
          if (articleUpdateId !== null) {
            //console.log("onSubmit/PUT");
            //console.log("onSubmit/PUT/articleUpdateId: ", articleUpdateId);
            //console.log("onSubmit/PUT/updateArticle.imageurl: ", updateArticle.imageurl);
            //console.log("onSubmit/PUT/urlImg: ", urlImg);
            return (
              axios
                .put(HOST_SV + `/api/articles/${articleUpdateId}`, {
                  ...values,
                  useremail: `${data?.user?.email}`,
                })
                //.then((res) => router.push("/"));
                .then((res) => {
                  //// Solo modificar la imágen si hay una nueva imágen para sustituir JSM 20220424
                  if (urlImg != "") {
                    //console.log("onSubmit/PUT/urlImg/entra!");
                    return axios.put(HOST_SV + `/api/articles/images`,
                        {
                          imageurl: urlImg,
                          articleimageid: articleUpdateId,
                        }
                      )
                      .then((res) => router.push("/"))
                      .catch((e) =>
                        console.error("onSubmit PUT image error: ", e)
                      );
                  } else {
                    router.push("/");
                  }
                })
                .catch((e) => console.log("onSubmit PUT article error: ", e))
            );
          } else {
            //console.log("onSubmit/POST");
            //console.log("onSubmit/POST/values: ", values);
            //console.log("onSubmit/POST/`${user.email}`: ", `${user.email}`);
            return axios
              .post(HOST_SV + "/api/articles", {
                ...values,
                useremail: `${data?.user?.email}`,
              })
              .then((response) => {
                //console.log(response.data);
                return axios
                  .post(HOST_SV + "/api/articles/images", {
                    articleId: response.data.articleid,
                    url: urlImg,
                  })
                  .then((res) => router.push("/"))
                  .catch((e) =>
                    console.error("onSubmit POST image error: ", e)
                  );
              })
              .catch((e) => console.log("onSubmit POST article error: ", e));
          }
        }}
        enableReinitialize
      >
        {({ handleSubmit, setFieldValue }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 py-6 pb-8 mb-4"
          >
            {articleUpdateId ? (
              <h1 className="mb-4 text-3xl font-bold">Actualitzar article</h1>
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

            {/*             <div className="mb-4">
              <MySelect 
                label="Categoria: " 
                name="articlecategoryid"
                table="articleCategory"
                key="articlecategoryid"
                optionlabel="articlecategory"
              >
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
              <Field
                component="select"
                name="articlecategoryid"
                id="articlecategoryid"
                multiple={false}
                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option key={0} value={0} label="Selecciona...">
                  Selecciona...
                </option>

                {articleCategory.map((category) => (
                  <option
                    key={category.articlecategoryid}
                    value={category.articlecategoryid}
                    label={category.articlecategory}
                  >
                    {category.articlecategory}
                  </option>
                ))}
              </Field>
            </div>

            <div className="mb-4">
              <label
                htmlFor="articletitle"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Posa nom a l&apos;article:
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
              <input
                type="file"
                name="imageUrl"
                onChange={(e) =>
                  setFieldValue("imageUrl", handleUpload(e.target.files[0]))
                }
              />
            </div>
            {updateArticle.imageurl ? (
              <div className="flex flex-wrap justify-center">
                <Image
                  width={250}
                  height={250}
                  src={updateArticle.imageurl}
                  className="max-w-full h-auto rounded-lg transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
                  alt="..."
                />
              </div>
            ) : (
              <div></div>
            )}

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
                htmlFor="courseid"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Curs escolar:
              </label>
              <ErrorMessage
                component="p"
                className="text-xl text-left text-red-500"
                name="courseid"
              />
              <Field
                component="select"
                name="courseid"
                id="courseid"
                multiple={false}
                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option key={0} value={0} label="Selecciona...">
                  Selecciona...
                </option>

                {course.map((list) => (
                  <option
                    key={list.courseid}
                    value={list.courseid}
                    label={list.course}
                  >
                    {list.course}
                  </option>
                ))}
              </Field>
            </div>

            <div className="mb-4">
              <label
                htmlFor="articlestatusid"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Estat de conservació:
              </label>
              <ErrorMessage
                component="p"
                className="text-xl text-left text-red-500"
                name="articlestatusid"
              />
              <Field
                component="select"
                name="articlestatusid"
                id="articlestatusid"
                multiple={false}
                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option key={0} value={0} label="Selecciona...">
                  Selecciona...
                </option>

                {articleStatus.map((list) => (
                  <option
                    key={list.articlestatusid}
                    value={list.articlestatusid}
                    label={list.articlestatus}
                  >
                    {list.articlestatus}
                  </option>
                ))}
              </Field>
            </div>

            <div className="mb-4">
              <label
                htmlFor="locationid"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Localitat (ubicació):
              </label>
              <ErrorMessage
                component="p"
                className="text-xl text-left text-red-500"
                name="locationid"
              />
              <Field
                component="select"
                name="locationid"
                id="locationid"
                multiple={false}
                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option key={0} value={0} label="Selecciona...">
                  Selecciona...
                </option>

                {location.map((list) => (
                  <option
                    key={list.locationid}
                    value={list.locationid}
                    label={list.location}
                  >
                    {list.location} {list.locationid}
                  </option>
                ))}

                <option key={99999} value={99999} label="Altres">
                  Altres
                </option>
              </Field>
            </div>

            <div className="mb-4">
              <label
                htmlFor="publicationstatusid"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Estat de publicació:
              </label>
              <ErrorMessage
                component="p"
                className="text-xl text-left text-red-500"
                name="publicationstatusid"
              />
              <Field
                component="select"
                name="publicationstatusid"
                id="publicationstatusid"
                multiple={false}
                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option key={0} value={0} label="Selecciona...">
                  Selecciona...
                </option>

                {publicationStatus.map((list) => (
                  <option
                    key={list.publicationstatusid}
                    value={list.publicationstatusid}
                    label={list.publicationstatus}
                  >
                    {list.publicationstatus}
                  </option>
                ))}
              </Field>
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Preu (0€ = donació):
              </label>
              <ErrorMessage
                component="p"
                className="text-xl text-left text-red-500"
                name="price"
              />
              <Field name="price" type="number" className="text-right" />€
            </div>

            <div className="mb-4">
              <label
                htmlFor="salestatusid"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Estat de venda:
              </label>
              <ErrorMessage
                component="p"
                className="text-xl text-left text-red-500"
                name="salestatusid"
              />
              <Field
                component="select"
                name="salestatusid"
                id="salestatusid"
                multiple={false}
                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option key={0} value={0} label="Selecciona...">
                  Selecciona...
                </option>

                {saleStatus.map((list) => (
                  <option
                    key={list.salestatusid}
                    value={list.salestatusid}
                    label={list.salestatus}
                  >
                    {list.salestatus}
                  </option>
                ))}
              </Field>
            </div>

            {/*             <div className="mb-4">
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
 */}

            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
            >
              {articleUpdateId ? "Actualitzar" : "Afegir"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
