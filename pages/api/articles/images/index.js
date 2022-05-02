import { pool } from "../../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getImage(req, res);
    case "POST":
      return await saveImage(req, res);

    case "PUT":
      return await updateImage(req, res);
    case "DELETE":
      return await deleteImage(req, res);
  

    default:
      break;
  }
}

const getImage = async (req, res) => {
  try {
    ////TODO: Revisar! ¿estamos recuperando todas las imagenes de la DB?
    const [result] = await pool.query("SELECT * FROM articleimage");
    return res.json(result);
  } catch (e) {
    return res.status(500).json({ e });
  }
};

const saveImage = async (req, res) => {
  try {
    //console.log("req.body: ", req.body);
    const { articleId, url } = req.body;
    ////TODO: Por ahora forzamos 'mainimage: 1' ya que solo usamos una imagen. Se tendrá q gestionar cuando haya más imágenes. JSM 20220422
    const [result] = await pool.query("INSERT INTO articleimage SET ?", {
      articleid: articleId,
      imageurl: url,
      mainimage: 1
    });
    return res.json(result);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const updateImage = async (req, res) => {
  console.log("updateImage/req.body: ", req.body);
  //const { id } = req.query;
  const { imageurl, articleimageid } = req.body;
  //const { imageurl } = req.body;
  try {
    await pool.query(
      "UPDATE articleimage " +
      "SET imageurl = ?, mainimage = 1 " +
      "WHERE articleid = ?",
      [imageurl, articleimageid]
    );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const deleteImage = async (req, res) => {
  try {
    console.log("updateImage/req.body: ", req.body);
    //const { id } = req.query;
    const { articleimageid } = req.body;
    await pool.query("DELETE FROM articleimage WHERE articleid = ?", [articleimageid]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
