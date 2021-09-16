import { Delete, Person } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import CustomerModel from "../../../Models/CustomerModel";
import { customerDeletedAction } from "../../../Redux/CustomersState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./DeleteCustomer.css";

function DeleteCustomer(): JSX.Element {

    const { register, handleSubmit } = useForm<CustomerModel>();

    async function send(customer: CustomerModel) {
        try {
            
            const response = await jwtAxios.delete(globals.urls.deleteCustomer + customer.id);
            const deletedCustomerID = response.data;
            
            store.dispatch(customerDeletedAction(deletedCustomerID))
            notify.success("Customer with ID '" + customer.id + "' was successfully deleted!");

        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="DeleteCustomer">
			
            <br />

            <span><Person /><Delete /> Delete Customer</span>

            <br /><br />

            <form onSubmit={handleSubmit(send)}>

                 <br /><br /><br />

                <label>*ID: </label> <br />
                <input type="number" name="id" ref={register} required /> <br /><br />
                
                <br /><br /><br /><br /><br /><br />

                <button>Delete</button>

            </form>

        </div>
    );
}

export default DeleteCustomer;
