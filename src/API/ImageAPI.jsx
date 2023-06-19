import { api } from "./api";
import { FormData } from 'form-data';


// upload image
const uploadImgAPI = (image) => {
  const body = new FormData();
  body.append("image", image);
  return api("POST", "v1/fileUpload", body);
};

// read image
const readImgAPI = (upload) => {
  let url = "v1/fileUpload/files/" + upload;
  return api("GET", url, null, null);
};

export { readImgAPI, uploadImgAPI };
