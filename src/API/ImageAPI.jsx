import { api } from "./api";
import FormData from 'form-data';

// upload image
const uploadImgAPI = (image) => {
  const body = new FormData();
  body.append("image", image);
  console.log("response: ", image);
  return api("POST", "v1/fileUpload", body);
};

// read image
const readImgAPI = (upload) => {
  let url = "v1/fileUpload/files/" + upload;
  return api("GET", url, null, null);
};

// get all uploaded files
const allImgAPI = () => {
  let url = "v1/fileUpload";
  return api("GET", url, null, null);
};
export { readImgAPI, uploadImgAPI };
