import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dwl2ptbze",
  api_key: "923739614246597",
  api_secret: "Rj0WKAPqgM7oBnBJy3ZteRjvw1Q",
});

const storage = new multer.memoryStorage();

const imageUploadUtil = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
};

const upload = multer({ storage });

export { upload, imageUploadUtil };
