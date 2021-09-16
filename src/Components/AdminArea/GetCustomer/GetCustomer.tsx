import { Apps, Person } from "@material-ui/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import GetClientModel, { GetClientType } from "../../../Models/GetClientModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./GetCustomer.css";

function GetCustomer(): JSX.Element {

    // Used for showing Customer ID input field
    const [state, setState] = useState({ getType: "All" });

    const { register, handleSubmit } = useForm<CustomerModel>();
    const history = useHistory();
    const location = useLocation();

    async function send(getRequest: GetClientModel) {
        try {
            
            switch (getRequest.getType) {
                case GetClientType.All:
                    history.push("/admin/customers");
                    break;
                case GetClientType.One:
                    const id = +getRequest.id;

                    // Checks if Customer exists in State
                    const customerState = store.getState().customersState.customers.find(customer => customer.id === id);
                    if (customerState) {
                        // Passing the Customer as param
                        history.push("/admin/customers/" + getRequest.id, { customer: customerState, prevPath: location.pathname });
                        return;
                    }

                    // If not, checks if Customer exists in Database
                    const response = await jwtAxios.get<CustomerModel>(globals.urls.getOneCustomer + id);
                    const customerDb = response.data;
                    if (customerDb) {
                        // Passing the Customer as param
                        history.push("/admin/oneCustomer/" + getRequest.id, { customer: customerDb, prevPath: location.pathname });
                        return; 
                    }

                    // If not in both, Company must not exist
                    throw new Error("Customer with ID '" + id + "' doesn't exist!");
            }

        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="GetCustomer">
			
            <br />

            <span><Person /><Apps /> Get Customers</span>

            <br /><br /><br />

            <form onSubmit={handleSubmit(send)}>

                <label>Get </label>
                <select name="getType" ref={register} onChange={e => setState({ getType: e.currentTarget.value })} required >
                    <option value="All">All Customers</option>
                    <option value="One">One Customer</option>
                </select>
                
                <br /><br />

                {
                    state.getType === GetClientType.One ? <>
                        <label>*ID: </label> <br />
                        <input type="number" name="id" ref={register} required /> <br /><br />
                    </> : <>
                        <br /><br /><br />
                    </>
                }

                <br /><br /><br /><br /><br /><br /><br />

                <button>Get</button>

            </form>

        </div>
    );
}

export default GetCustomer;
