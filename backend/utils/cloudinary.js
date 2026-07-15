import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

const uploadOnCloudinary = async (file) => {
    const filename = file.split(/[\\/]/).pop();
    const port = process.env.PORT || 5000;
    const localUrl = `http://localhost:${port}/public/${filename}`;

    // If Cloudinary environment variables are missing, use local fallback
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        console.warn("Cloudinary configuration is incomplete. Using local file fallback:", localUrl);
        return localUrl;
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        const result = await cloudinary.uploader.upload(file)
        // Only delete the local file if it was successfully uploaded to Cloudinary
        fs.unlinkSync(file)
        return result.secure_url
    } catch (error) {
        console.error("Cloudinary upload failed. Using local fallback URL:", error);
        // Do NOT unlink the file so it can be served locally from the public folder
        return localUrl;
    }
}

export default uploadOnCloudinary