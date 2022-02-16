import React from "react";
import { uploadWidget } from "../../utils/cloudinaryService";

function ImageUploads() {
  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: "",
      tags: [tag],
      uploadPreset: "",
      sources: ["local"],
    };
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if (photos.event === "success") {
          console.log(photos.info.secure_url);
        }
      } else {
        console.log(error);
      }
    });
  };
  return <button onClick={() => beginUpload("testing")}>Upload Image</button>;
}

export default ImageUploads;
