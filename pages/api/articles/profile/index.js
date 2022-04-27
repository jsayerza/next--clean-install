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
        SELECT * FROM v_article_sell  WHERE useremail = '${session.user.email}' ORDER BY datecreation DESC
        `
      );

      return res.status(200).json(result);
    } else {
      console.log(session)
      return res.status(401).json({
        error: "You trying to do something bad or your not logged in",
      });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ error: "You trying to do something bad or your not logged in" });
  }
};
