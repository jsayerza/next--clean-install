import { pool } from "../../../config/db";

export default async function handler(req, res) {
  
  //console.log(req.method);

  switch (req.method) {
    case "GET":
      return await getArticle(req, res);
    case "DELETE":
      return await deleteArticle(req, res);
    case "PUT":
      return await updateArticle(req, res);
    default:
      break;
  }
}

const getArticle = async (req, res) => {
  try {
    const { id } = req.query;
    const [result] = await pool.query(
      "SELECT * FROM article WHERE articleid = ?",
      [id]
    );
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.query;
    //throw new Error("Error-horror");
    await pool.query("DELETE FROM article WHERE articleid = ?", [id]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.query;
  const { articletitle, articlecategoryid, description, price } = req.body;
  try {
    await pool.query(
      "UPDATE article SET articletitle = ?, articlecategoryid = ?, description = ?, price = ? WHERE articleid = ?",
      [articletitle, articlecategoryid, description, price, id]
    );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
