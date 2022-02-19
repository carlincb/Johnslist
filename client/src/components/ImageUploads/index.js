import React from "react";
import { uploadWidget } from "../../utils/cloudinaryService";

function ImageUploads({ setImage, formState, setFormState, image }) {
  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: "carlincb",
      tags: [tag],
      uploadPreset: "unsigned",
      sources: ["local"],
    };
    uploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if (photos.event === "success") {
          setImage(photos.info.secure_url);
          setFormState({ ...formState, image: photos.info.secure_url });
        }
      } else {
        console.log(error);
      }
    });
  };
  return (
    <button name="image" value={image} onClick={() => beginUpload("testing")}>
      Upload Image
    </button>
  );
}

export default ImageUploads;
