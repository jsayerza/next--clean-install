import { pool } from "../../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      return await updateImage(req, res);
    case "DELETE":
    return await deleteImage(req, res);
  
    default:
      break;
  }
}


const updateImage = async (req, res) => {
  console.log("updateImage/req.body: ", req.body);
  const { id } = req.query;
  //const { imageurl, articleimageid } = req.body;
  const { imageurl } = req.body;
  try {
    await pool.query(
      "UPDATE articleimage " +
      "SET imageurl = ?, mainimage = 1 " +
      "WHERE articleid = ?",
      [imageurl, id]
    );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const deletImage = async (req, res) => {
  try {
    const { id } = req.query;
    //throw new Error("Error-horror");
    await pool.query("DELETE FROM article WHERE articleid = ?", [id]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
