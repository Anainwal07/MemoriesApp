import User from "../models/UserSchema.js";
import Post from "../models/PostSchema.js";
import path from "path"  ;


export const AddPost = async(req , res) => {
    try{
        const userId = req.user_id ; 
        const picturePath = path.basename(req.file.path);
        const {description , location} = req.body ;

        const user = await User.findById({_id : userId});

        if(!user){
            return res.status(400).json({error : "User not found" }) ;
        }
        
        const newPost = await Post.create({
            userId :  user._id ,
            username : user.username, 
            location , 
            description ,
            picturePath , 
            userPicturePath : user.picturePath ,
            likes : {} 
        }) ; 

        if(newPost){
            return res.status(200).json({message : "Post added successfully" , newPost}) ; 
        }
        else{
            return res.status(409).json({message : "Error in adding post"}) ; 
        }
    }
    catch(err){
        return console.log(err.message);
    }
}

export const GetPosts = async(req , res) => {
    try {
        const posts = await Post.find() ; 

        if(!posts){
            return res.status(404).json({message : "No Posts found"}) ;
        }
        return res.status(200).json({posts : posts}) ;
    } catch (error) {
        return res.status(500).json(err.message) ; 
    }
}

export const GetuserPosts = async(req , res) => {
    try {
        const user_id = req.user_id  ;
        const posts = await Post.find({userId : user_id }) ; 

        if(!posts){
            console.log("The user has not made any post")
            res.status(404).json({message: "The User has not made any post"}) ; 
        }

        return res.status(200).json({posts: posts}) ; 
    } catch (error) {
        console.log(error.message);
    }
}

export const DeletePost = async(req , res) => {
    try {
        const post_id = req.params.post_id ; 
        const post = await Post.findById(post_id) ;
        if(!post){
            return res.status(400).json({error : "Post not found" }) ;
        }

        if(post.userId !== req.user_id){
            return res.status(400).json({error : "You are not authorized to delete this post "}) ;
        }
        
        await Post.deleteOne({_id : post_id , userId : req.user_id});
        
        return res.status(200).json({message : "Post deleted successfully" , post : post});

    } catch (error) {
        return console.log(error.message);
    }
}