import {asyncHandler} from "../utils/asynchandler.js"
import ApiError from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponce} from "../utils/ApiResponce.js";
const registerUser=asyncHandler(async(req,res)=>{
    
   //get the user detail from frontend
   //validation -should not be empty
   // check if user already exists (username,email)
   //check for avatar and cover image
   //upload to cloudinary,avatar
   //create user object -create entry in db
   //remove password and refrese token field from responce
   //check for user creation 
   //return res
   const {fullName , email , Username , password}=req.body 
   console.log("email :",email);
   //validation check
   if (
    [fullName , email , Username , password].some(()=>
    field?.trim()==="")
   ) {
    throw new ApiError(400,"All fields are required")
   }
   //check if the user alreaady exists

  const existedUser= User.findOne({
    $or:[{Username},{email}]
   })
     if(!existedUser){
        throw new ApiError(409,"User with username already exist")
     }

      //check for avatar and cover image
     const avatarLocalpath= req.files?.avatar[0]?.path;
       const coverImageLocalPath=req.files?.coverImage[0].path;

       if(!avatarLocalpath){
        throw new ApiError(400,"avatar file is required")
       }

       //upload to cloudinary,avatar

     const avatar= await uploadOnCloudinary(avatarLocalpath)
     const coverImage=await uploadOnCloudinary(coverImageLocalPath)
      
     if (!avatar) {
        throw new ApiError(400,"avatar not find")
     }
    
     //create user object -create entry in db
   const user= await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url|| "",
        email,
        password,
        Username:Username.toLowerCase()
     })
  //this words in -ve sign will remove the fields
   const createdUser= await User.findById(user._id).select(
    "-password -refreseToken"  
   )
    if (!createdUser) {
        throw new ApiError(500,"something went wrong while sending the user")
    }

    //returning the response 
    return res.status(201).json(
      new ApiResponce(200,createdUser,"user registred successfully")
  )


})

export {
    registerUser,
}