import { Layout } from "../components/Layout";
import { ArticleForm } from "../components/ArticleForm";


function NewPage() {
  return (
    <Layout>
      <div className="grid place-items-center bg-5/6">
        <ArticleForm />

      </div>
  </Layout>

  )
}

export default NewPage