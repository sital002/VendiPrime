import { v2   as cloudinary} from "cloudinary";
import fs from 'fs';

export const uploadImage = async(profile)=>{
  const result =  await cloudinary.uploader.upload(profile.path,{folder:"ecommerce/profile"});
//   fs.rmSync(`/uploads/`);
//   fs.rmdirSync("/uploads");
  return result
}