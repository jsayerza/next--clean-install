import {pool} from '../../../config/db'


export default async function handler(req, res) {
  
  //console.log("req.query.table: ", req.query.table)

  switch (req.query.table) {
    case "articleCategory":
      return await getArticleCategory(req, res);

    case "articleStatus":
      return await getArticleStatus(req, res);

    case "course":
      return await getCourse(req, res);
  
    case "location":
      return await getLocation(req, res);
        
    case "publicationStatus":
      return await getPublicationStatus(req, res);
        
    case "saleStatus":
      return await getSaleStatus(req, res);
            
    default:
      break;
  }

};


const getArticleCategory = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM articlecategory");
    //console.log(result);
    return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json({error});
  }
};

const getArticleStatus = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM articlestatus");
    return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json({error});
  }
};

const getCourse = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM course");
    return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json({error});
  }
};

const getLocation = async (req, res) => {
  try {
    //const [result] = await pool.query("SELECT * FROM location ORDER BY location");
    const [result] = await pool.query("SELECT locationid, CONCAT(location, ' (', locationid, ')') AS location FROM location ORDER BY location");
    return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json({error});
  }
};

const getPublicationStatus = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM publicationstatus");
    return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json({error});
  }
};

const getSaleStatus = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM salestatus");
    return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json({error});
  }
};


