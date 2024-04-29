// import CreateButton from "./../components/Admin/CreateButton";
import ManageOrder from "../components/Admin/manageOrder/ManageOrder";
import ManageOrderUser from "../components/Admin/manageOrder/ManageOrderUser";
import MenuBar from "../components/Admin/menuBar/MenuBar";
import storage from "../storage/Storage";

function OrderPage(props) {
  return (
    <>
      {storage.getItem("role") === "ADMIN" ? (
        <div className="admin-page-container">
          <MenuBar />
          <div className="content-area-admin">
            <ManageOrder></ManageOrder>
          </div>
        </div>
      ) : (
        <div>
          <ManageOrderUser></ManageOrderUser>
        </div>
      )}
    </>
  );
}

export default OrderPage;
