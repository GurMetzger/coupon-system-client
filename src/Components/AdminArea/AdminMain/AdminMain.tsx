import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ClientType } from "../../../Models/CredentialsModel";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notification";
import AddCompany from "../AddCompany/AddCompany";
import AddCustomer from "../AddCustomer/AddCustomer";
import DeleteCompany from "../DeleteCompany/DeleteCompany";
import DeleteCustomer from "../DeleteCustomer/DeleteCustomer";
import GetCompany from "../GetCompany/GetCompany";
import GetCustomer from "../GetCustomer/GetCustomer";
import "./AdminMain.css";

function AdminMain(): JSX.Element {

    useEffect(() => {
        if (store.getState().authState.user?.clientType !== ClientType.Administrator) {
            notify.error("You are not authorized to view this page!");
            history.push("/home");
        }
    });

    const history = useHistory();

    return (
        <div className="AdminMain">
            {
                store.getState().authState.user?.clientType !== ClientType.Administrator ? <>

                    <h1>You are not authorized to view this page!</h1>

                </> : <>

                    <div></div>
                        <AddCompany />
                        <DeleteCompany />
                        <GetCompany />
                    <div></div>

                    <div></div>
                        <AddCustomer />
                        <DeleteCustomer />
                        <GetCustomer />
                    <div></div>

                </>
            }
        </div>
    );
}

export default AdminMain;
