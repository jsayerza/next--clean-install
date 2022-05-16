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
    /* const [result] = await pool.query("SELECT * FROM v_article"); */
/*     const [result] = await pool.query("SELECT * FROM v_article ORDER BY datecreation DESC"); */
    const [result] = await pool.query("SELECT * FROM v_article_sell ORDER BY datecreation DESC");
    
    //console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error });
  }
};


const saveArticle = async (req, res) => {
  //console.log("saveArticle/req.body: ", req.body);
  //articlesizeid
  const { articlecategoryid, salestatusid, articletitle, description, price, useremail, articlestatusid, courseid, locationid, publicationstatusid } = req.body;

  try {
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilepath);
      //console.log("saveArticle/result: ", result);
    }
    
    const [result] = await pool.query("INSERT INTO article SET ?", {
      articlecategoryid,
      articletitle,
      description,
      price,
      useremail,
      articlestatusid,
      courseid, locationid, publicationstatusid, salestatusid,
    });
    //console.log("saveArticle/result: ", result);
    return res.json({
      articlecategoryid,
      articletitle,
      description,
      price,
      useremail,
      articlestatusid,
      courseid, locationid, publicationstatusid, salestatusid,
      articleid: result.insertId,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
