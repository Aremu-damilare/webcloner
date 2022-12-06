import path from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)+"\\clones";

// console.log("dirr", __dirname, )
// console.log("fille", __filename, )



export async function getClones(req, res, id) {   
        res.json({
            "message":"success",
            "data":fs.readdirSync(__dirname),
        })
      ;
}
