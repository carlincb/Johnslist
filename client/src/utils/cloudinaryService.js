import { Cloudinary as CoreCloudinary, Util } from "cloudinary-core";

export const url = (publicId, options) => {
  const cloudinaryOptions = Util.withSnakeCaseKeys(options);
  const cloudinary = CoreCloudinary.new();
  return cloudinary.url(publicId, cloudinaryOptions);
};

export const uploadWidget = (options, callback) => {
  const cloudinaryOptions = Util.withSnakeCaseKeys(options);
  window.cloudinary.openUploadWidget(cloudinaryOptions, callback);
};

export const fetchPhotos = async (imageTag, setter) => {
  const options = {
    cloudName: "",
    format: "json",
    type: "list",
    version: Math.ceil(new Date().getTime() / 1000),
  };
  const urlPath = url(imageTag.toString(), options);
  fetch(urlPath)
    .then((res) => res.text())
    .then((text) =>
      text
        ? setter(JSON.parse(text).resources.map((image) => image.public_id))
        : []
    )
    .catch((error) => console.log(error));
};
