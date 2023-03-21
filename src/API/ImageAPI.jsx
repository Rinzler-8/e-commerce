import { api } from "./api";

// upload image
const uploadImgAPI = (image) => {
  return api("POST", "v1/fileUpload/", image);
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
export {readImgAPI, uploadImgAPI};
