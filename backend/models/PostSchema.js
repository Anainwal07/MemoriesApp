import { Schema ,model } from "mongoose";

const PostSchema = new Schema({
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    }
}, 
    {timestamps: true}
) ; 

const Post = model('Post' , PostSchema) ; 

export default Post  ; 