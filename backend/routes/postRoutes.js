import express from "express" ; 
import { DeletePost, GetPosts, GetuserPosts } from "../contollers/postControllers.js";
import checktoken from "../utils/checktoken.js";

const router = express.Router()  ;

router.get("/get-posts", checktoken , GetPosts) ; 
router.get("/get-userspost" ,checktoken ,  GetuserPosts) ;
router.delete("/delete-post/:post_id" ,checktoken ,  DeletePost) ; 

export default router ; 