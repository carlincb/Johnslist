import { Cloudinary as CoreCloudinary, Util } from "cloudinary-core";

export const url = (publicId, options) => {
  const cloudinaryOptions = Util.withSnakeCaseKeys(options);
  const cloudinary = CoreCloudinary.new();
  return cloudinary.url(publicId, cloudinaryOptions);
};
