import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  the technique we are using is we will make the method of file uploading , that method will take the url of file as a parameter and if the file uploading processes is succefull then we will unlink the file from the local server

//  we are using multer for uploading the file on the server , we are going with 2 steps for uploading files to cloudinary , first we will upload the file to the slocal erver and then we will upload the file to the cloudinary , because to prevent the loss of data if the file uploading to the cloudinary is failed then we will have the file on the local server and we can upload it again to the cloudinary

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // uploading the file to the cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // will detect file type automatically (png, jpg, gif, mp4, etc.)
    });

    // file has been uploaded to the cloudinary successfully
    // console.log("File uploaded successfully", response.url);
    // returning something to the actual user
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // for cleaning purpose we will delete the file from the local server
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
