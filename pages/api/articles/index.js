import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getArticles(req, res);
    case "POST":
      return await saveArticle(req, res);
    default:
      break;
  }
}

const getArticles = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM v_article");
    //console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error });
  }
};


const saveArticle = async (req, res) => {
  const { articlecategoryid, articletitle, description, price, useremail, articlestatusid, courseid, locationid, publicationstatusid, salesstatusid } = req.body;

  try {
    //console.log("creant un article")
    //console.log("saveArticle/req.body: ", req.body);

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilepath);
      //console.log(result);
    }
    
    const [result] = await pool.query("INSERT INTO article SET ?", {
      articlecategoryid,
      articletitle,
      description,
      price,
      useremail,
      articlestatusid,
      courseid, locationid, publicationstatusid, salesstatusid,
    });
    //console.log("saveArticle/result: ", result);
    return res.json({
      articlecategoryid,
      articletitle,
      description,
      price,
      useremail,
      articlestatusid,
      courseid, locationid, publicationstatusid, salesstatusid,
      articleid: result.insertId,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
