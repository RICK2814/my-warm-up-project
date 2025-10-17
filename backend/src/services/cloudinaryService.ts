import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image to Cloudinary
export const uploadImage = async (imagePath: string, folder: string = 'company-logos'): Promise<string> => {
  try {
    const result = await cloudinary.v2.uploader.upload(imagePath, {
      folder: folder,
      use_filename: false,
      unique_filename: true,
      overwrite: false,
    });

    return result.secure_url;
  } catch (error) {
    throw error;
  }
};

// Upload image buffer to Cloudinary
export const uploadImageBuffer = async (buffer: Buffer, folder: string = 'company-logos'): Promise<string> => {
  try {
    // For buffer uploads, we need to use the upload_stream method
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: folder,
          use_filename: false,
          unique_filename: true,
          overwrite: false,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result.secure_url);
          }
        }
      );
      
      uploadStream.end(buffer);
    });
  } catch (error) {
    throw error;
  }
};

// Delete image from Cloudinary
export const deleteImage = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.v2.uploader.destroy(publicId);
  } catch (error) {
    throw error;
  }
};