import { v2   as cloudinary} from "cloudinary";
import fs from 'fs';



export const uploadImage = async(profile)=>{
  const filePath = profile.path;
  const result =  await cloudinary.uploader.upload(profile.path,{folder:"ecommerce/profile"});
  fs.unlink(filePath, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File deleted successfully!');
});
  
  return result
}
export const deleteImage  = async (publicId)=>{
  console.log(publicId)
   await cloudinary.uploader.destroy(publicId,(err,result)=>{
    if(err){
      console.log(err)
    }
      if(result){
        console.log(result)
      }

   });


}

