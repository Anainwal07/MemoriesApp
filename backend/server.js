import express from "express" ; 
import cors from "cors"  ;
import connection from "./database/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import multer from "multer";
import helmet from "helmet" ; 
import morgan from "morgan";
import path from "path" ;
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { SignupControllers } from "./contollers/authControllers.js";
import { AddPost } from "./contollers/postControllers.js";
import checktoken from "./utils/checktoken.js";

const app = express() ; 

//middleware
const __filename = fileURLToPath(import.meta.url) ;
const __dirname = path.dirname(__filename) ;
app.use(helmet()) ; 
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"})) ;
app.use(morgan("common")) ;
app.use(bodyParser.json({limit : "30mb" , extended : true})) ;
app.use(bodyParser.urlencoded({limit : "30mb" , extended: true})) ;
app.use("/assets" , express.static(path.join(__dirname, 'public/assets'))) ;
app.use(cors()) ; 
app.use(express.json()) ;

// FILE 
const storage = multer.diskStorage({
    destination : function(req  ,file , cb) {
        cb(null , "public/assets") ;
    },
    filename : function(req , file , cb) {
        cb(null, file.originalname) ; 
    }
}) ;
const upload = multer({storage}) ;

// Routes with files 
app.post("/auth/signup" , upload.single("picturePath") , SignupControllers) ;
app.post("/post/upload" ,checktoken , upload.single("picturePath"), AddPost) ; 


app.use("/auth" , authRoutes) ; 
app.use("/post" , postRoutes) ; 

const PORT = 5000 ; 

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`) ;
})


connection() ; 