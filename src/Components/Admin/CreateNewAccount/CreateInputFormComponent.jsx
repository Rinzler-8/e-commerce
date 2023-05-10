import React, { useRef, useState, useEffect } from "react";
import { Button, Container, Row, Col, Toast, ToastHeader, ToastBody } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import InputComponent from "./InputComponent";
import SelectUserStatus from "./SelectUserStatus";
import SelectCreateRole from "./SelectCreateRole";
import "./style.css";
import { getEmailExists, getUsernameExists, getMobileExists } from "../../../API/AccountAPI";
import { Avatar } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { uploadImgAPI } from "../../../API/ImageAPI";
import { useDispatch, useSelector } from "react-redux";
import { actionFetchUserRolePI, actionFetchUserStatusAPI } from "../../../Redux/Action/EnumAction";

function CreateInputFormComponent(props) {
  let { onHandleCreateNewAccount } = props;
  let dispatchRedux = useDispatch();
  // State quản lý đóng mở thông báo.
  let [showNotificationCreate, setShowNotificationCreate] = useState(false);

  const phoneRegExp = /((84|0)[3|5|7|8|9])+([0-9]{8})\b/;
  const emailRegExp = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
  const passRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

  let listUserStatus = useSelector((state) => state.userStatusReducer);
  let listRole = useSelector((state) => state.roleReducer);
  let nameImage;
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState();
  const [previewAvatarFile, setPreviewAvatarFile] = useState();
  const avatarInputFile = useRef(null);

  const onChangeAvatarInput = (e) => {
    // Assuming only image
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      setPreviewAvatarUrl(reader.result);
      setPreviewAvatarFile(file);
    };
  };

  useEffect(() => {
    dispatchRedux(actionFetchUserStatusAPI());
    dispatchRedux(actionFetchUserRolePI());
  }, []);

  return (
    <div>
      {/* Thông báo thêm mới thành công */}
      <Toast isOpen={showNotificationCreate}>
        <ToastHeader
          style={{ backgroundColor: "blue", color: "black", fontSize: 20 }}
          toggle={() => {
            setShowNotificationCreate(false);
          }}
        >
          Notification
        </ToastHeader>
        <ToastBody style={{ color: "black", fontSize: 25 }}>Create Account Success!!</ToastBody>
      </Toast>
      {/* Formik */}
      <Formik
        initialValues={{
          Email: "",
          Username: "",
          Password: "",
          Fullname: "",
          Mobile: "",
          Address: "",
          Status: "INACTIVE",
          Role: ["USER"],
        }}
        validationSchema={Yup.object({
          Username: Yup.string()
            .min(6, "Phải từ 6 đến 50 ký tự!")
            .max(50, "Phải từ 6 đến 50 ký tự!")
            .required("Trường này là bắt buộc!")
            .test("checkUniqueUsername", "Tên người dùng đã được đăng ký!", async (username) => {
              // call api
              const isExists = await getUsernameExists(username);
              return !isExists;
            }),

          Email: Yup.string()
            .matches(emailRegExp, "Email không hợp lệ!")
            .required("Trường này là bắt buộc!")
            .test("checkUniqueEmail", "Email đã được đăng ký!", async (email) => {
              // call api
              const isExists = await getEmailExists(email);
              return !isExists;
            }),
          Firstname: Yup.string(),
          Lastname: Yup.string(),
          Password: Yup.string().matches(passRegExp, "Mật khẩu yếu, vui lòng thử lại!").required("Trường này là bắt buộc!"),
          Mobile: Yup.string().required("Trường này là bắt buộc!").matches(phoneRegExp, "Số điện thoại không hợp lệ!"),
          Address: Yup.string(),
        })}
        onSubmit={async (values, actions) => {
          nameImage = await uploadImgAPI(previewAvatarFile);
          let accountCreateNew = {
            email: values.Email,
            username: values.Username,
            firstName: values.Firstname,
            lastName: values.Lastname,
            password: values.Password,
            fullname: values.Fullname,
            urlAvatar: nameImage ? nameImage : require(`../../../Assets/img/account-default-img.png`),
            mobile: values.Mobile,
            address: values.Address,
            status: values.Status,
            role: values.Role.length > 0 ? values.Role : ["USER"],
          };
          console.log("Thông tin Account tạo mới: ", accountCreateNew);
          onHandleCreateNewAccount(accountCreateNew);
          // Hiển thị thông báo
          setShowNotificationCreate(true);
          // Reset dữ liệu sau khi thêm, dùng hàm của formik để reset.
          actions.resetForm();
        }}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ validateField, validateForm }) => (
          <Container>
            <Row>
              <Col
                sm={{
                  offset: -3,
                  size: 8,
                }}
              >
                {/* Form thêm mới */}
                <Form>
                  {/* Email */}
                  <Field fullWidth name="Email" type="text" placeholder="Nhập Email" label="Email:" component={InputComponent} />

                  {/* Username */}
                  <Field fullWidth name="Username" type="text" placeholder="Nhập tên tài khoản" label="Tên Tài Khoản:" component={InputComponent} />

                  <Field fullWidth className="input" name="Password" type={"text"} placeholder="Nhập Mật khẩu" label="Mật khẩu:" component={InputComponent} />
                  {/* Fullname */}
                  <Field fullWidth name="Firstname" type="text" placeholder="Nhập tên" label="Tên: " component={InputComponent} />
                  <Field fullWidth name="Lastname" type="text" placeholder="Nhập họ" label="Họ:" component={InputComponent} />
                  {/* Mobile */}
                  <Field fullWidth name="Mobile" type="text" placeholder="Nhập số điện thoại" label="Số điện thoại:" component={InputComponent} />

                  {/* Address */}
                  <Field fullWidth name="Address" type="text" placeholder="Nhập địa chỉ" label="Địa chỉ:" component={InputComponent} />
                  {/* Role */}
                  <Field fullWidth name="Role" placeholder="Chọn phân quyền" label="Phân quyền:" listItem={listRole} component={SelectCreateRole} />

                  {/* Status */}
                  <Field fullWidth name="Status" placeholder="Chọn trạng thái" label="Trạng thái:" listItem={listUserStatus} component={SelectUserStatus} />

                  <br />
                  <Avatar
                    alt="Remy Sharp"
                    src={previewAvatarUrl ? previewAvatarUrl : require(`../../../Assets/img/account-default-img.png`)}
                    sx={{ width: 200, height: 200, marginTop: "20px" }}
                  />
                  <div className="mt-2">
                    <Button color="primary" onClick={() => avatarInputFile.current.click()} style={{ marginBottom: "20px" }}>
                      <FileUploadIcon /> Chọn ảnh
                    </Button>
                    <input type="file" id="avatarInput" ref={avatarInputFile} onChange={onChangeAvatarInput} style={{ display: "none" }} />
                  </div>
                  <br />
                  {/* submit */}
                  <Row>
                    <Col>
                      <Button color="success" type="submit">
                        Lưu
                      </Button>
                    </Col>
                    <Col>
                      <Button color="primary" type="reset">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        )}
      </Formik>
    </div>
  );
}

export default CreateInputFormComponent;
