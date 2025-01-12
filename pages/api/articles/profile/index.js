import { getSession } from "next-auth/react";
import { pool } from "config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getProfileArticles(req, res);
    default:
      return await getProfileArticles(req, res);
  }
}

const getProfileArticles = async (req, res) => {
  try {
    const session = await getSession({ req });

    if (session) {
      const [result] = await pool.query(
        `
        SELECT * FROM v_article  WHERE useremail = '${session.user.email}' ORDER BY datecreation DESC
        `
      );

      return res.status(200).json(result);
    } else {
      //console.log("getProfileArticles/session: ", session)
      return res.status(401).json({
        error: "Has intentat fer alguna acció incorrecta o no estàs identificat",
      });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Has intentat fer alguna acció incorrecta o no estàs identificat" });
  }
};
