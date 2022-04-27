import { useState, useEffect } from "react";
import Layout from "components/Layout";
import axios from "axios";
import { HOST_SV, PORT_SV } from "../config/config";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import ArticleCard from "components/ArticleCard";
import { map } from "@firebase/util";
import ArticleList from "components/ArticleList";

function ProfilePage() {
  const router = useRouter();
  const [profileArticles, setProfileArticles] = useState([]);

  useEffect(() => {
    async function profileArticles() {
      const session = await getSession();
      if (!session || session === null || session === undefined) {
        return router.push("/");
      }

      if (session) {
        const { data } = await axios.get(
          HOST_SV + PORT_SV + "/api/articles/profile"
        );
        console.log(data);
        setProfileArticles(data);
      }
    }

    profileArticles();
  }, [router]);

  return (
    <Layout>
      <h1 className="text-left text-2xl font-bold my-2">Els teus articles</h1>
      <div>
        <ArticleList articles={profileArticles} />
      </div>
    </Layout>
  );
}

/* export const getServerSideProps = async (context) => {
  const { data: articles } = await axios.get(
    HOST_SV + PORT_SV + "/api/articles/profile"
  );

  console.log(articles);
  return {
    props: {
      ses
      articles,
    },
  };
}; */

export default ProfilePage;
