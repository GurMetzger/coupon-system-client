import { Assignment, Person } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import CustomerModel from "../../../Models/CustomerModel";
import { customerUpdatedAction } from "../../../Redux/CustomersState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./UpdateCustomer.css";

interface UpdateCustomerProps {
	customer?: CustomerModel;
}

function UpdateCustomer(props: UpdateCustomerProps): JSX.Element {

    const { register, handleSubmit } = useForm<CustomerModel>();
    const history = useHistory();

    async function send(customer: CustomerModel) {
        try {

            checkCustomer(customer);

            // === Data that cannot be updated/changed
            customer.id = props.customer?.id;
            
            // The Coupons are persisted in the Backend
            // customer.coupons = props.customer?.coupons;
            // ================
            
            const response = await jwtAxios.put<CustomerModel>(globals.urls.updateCustomer, customer);
            const updatedCustomer = response.data;

            store.dispatch(customerUpdatedAction(updatedCustomer));
            notify.success("Customer was successfully updated!");
            history.push("/admin/customers");

        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="UpdateCustomer">

            <h2><Person /><Assignment /> Update Customer</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>ID: </label> {/* Non-Updatable Field */}
                <span>{props.customer?.id}</span> <br /><br />

                <label>First Name: </label> <br />
                <input type="text" name="firstName" ref={register} defaultValue={props.customer?.firstName} /> <br /><br />

                <label>Last Name: </label> <br />
                <input type="text" name="lastName" ref={register} defaultValue={props.customer?.lastName} /> <br /><br />

                <label>*Email: </label> <br />
                <input type="text" name="email" ref={register} defaultValue={props.customer?.email} required /> <br /><br />

                <label>*Password: </label> <br />
                <input type="password" name="password" ref={register} defaultValue={props.customer?.password} required /> <br /><br />

                <br />

                <button>Update</button>

            </form>
			
        </div>
    );

    function checkCustomer(customer: CustomerModel) {

        // Email must be valid [ ___@__.com ]
        const pattern = globals.emailPattern;
        if (!pattern.test(customer.email)) {   
            throw new Error("Please enter the valid Email format [ ___@__.com ]");       
        }

        // Password must be at least 5 characters long
        if (customer.password.length < 5) {
            throw new Error("Password must be at least 5 characters long!");
        }
    }
}

export default UpdateCustomer;
