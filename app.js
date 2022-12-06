import Scrape  from 'website-scraper';
import PuppeteerPlugin from 'website-scraper-puppeteer';
import path from 'path';
import {fileURLToPath} from 'url';
import express from 'express'
import { getClones } from './controllers/getClonesController.js'
import fs from 'fs'
import bodyParser from 'body-parser'


const app = express();
const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)+"\\public\\clones";

let __dirname_clone = path.dirname(__filename)+"\\public\\clones\\";


// console.log(__dirname)

var jsonParser = bodyParser.json({limit: '50mb'})
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(express.static('public'))
app.get('/cloner/start', async (req, res, next) => {
        
    if (!req.query.url || !req.query.name) {
      res.status(400).json({ error: 'url and subdomain name are required' })
    } else {
      let name = req.query.name
      let found = false

      if(fs.existsSync(path.resolve(__dirname, name))){
        res.status(403).json({ error: 'folder already exits' })
        console.log("file existss")
      } else {  

        const results = await Scrape({            
          urls: [req.query.url],                        
          directory: path.resolve(__dirname, name),
          // Load the Puppeteer plugin
          plugins: [ 
            new PuppeteerPlugin({
              launchOptions: { headless: true }, /* optional */
              scrollToBottom: { waitUntil: 'load', timeout: 0, viewportN: 10 }, /* optional */
              blockNavigation: true, /* optional */
                })
              ]
          });
        res.status(200).json({ "success": "success" })
        console.log("%%%%%%%")
      }                            
    }
  })

  
app.get("/cloner/clones", (req, res, next) => {
  let __dirname = path.dirname(__filename)+"\\controllers";
  res.sendFile(path.join(__dirname, '/clones.html'));
});


app.get(`/cloner/clonedetail`, (req, res, next) => {
  let url = req.query.clone
  let __dirname = path.dirname(__filename)+"\\controllers";

  res.sendFile(path.join(__dirname, '/clonedetail.html'));
});


app.post('/cloner/saveiframe/', jsonParser,function(request, response){
  
  let data = request.body.iframeContent
  let path = request.body.name

  // console.log("request bodyy",data, "nammmm", path);

  const __filename = fileURLToPath(import.meta.url);
  
  let __filepath =  __dirname_clone+path+"\\index.html"

  fs.writeFileSync(__filepath, data)

});


app.get("/cloner/list", (req, res, next) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename)+"\\public\\clones";

    res.json({
      "message":"success",
      "data":fs.readdirSync(__dirname),
  });
});
 
app.get("/cloner/delete", (req, res, next) => {
  const dir = req.query.folder;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename)+"\\public\\clones\\"+dir;
  // delete directory recursively
    fs.rm(__dirname, { recursive: true }, err => {
      if (err) {
        throw err
      }      
      res.json({
        "message":"success",
        "folder":dir,});
  })
});


app.listen(process.env.port || 8000);
console.log('Running at Port 8000', process.env.port);

