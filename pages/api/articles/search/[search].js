import { pool } from "config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await setSearch(req, res);
  }
}

const setSearch = async (req, res) => {
  try {
    const { search } = req.query;
    //console.log("setSearch/search: ", search);
    const [result] = await pool.query(
      `SELECT * FROM v_article_sell WHERE (articletitle LIKE '%${search}%') OR (description LIKE '%${search}%')`
    );
    //console.log("setSearch/result: ", result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
