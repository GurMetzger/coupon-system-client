import { AddCircle, Person } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import CustomerModel from "../../../Models/CustomerModel";
import { customerAddedAction } from "../../../Redux/CustomersState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./AddCustomer.css";

function AddCustomer(): JSX.Element {

    const { register, handleSubmit } = useForm<CustomerModel>();

    async function send(customer: CustomerModel) {
        try {

            checkCustomer(customer);

            const response = await jwtAxios.post<CustomerModel>(globals.urls.addCustomer, customer);
            const addedCustomer = response.data;

            store.dispatch(customerAddedAction(addedCustomer));
            notify.success("Customer was successfully added!");

        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="AddCustomer">
			
            <br />

            <span><Person /><AddCircle /> Add Customer</span>

            <br /><br />

            <form onSubmit={handleSubmit(send)}>

                <label>First Name: </label> <br />
                <input type="text" name="firstName" ref={register} /> <br /><br />
                
                <label>Last Name: </label> <br />
                <input type="text" name="lastName" ref={register} /> <br /><br />

                <label>*Email: </label> <br />
                <input type="text" name="email" ref={register} required /> <br /><br />

                <label>*Password: </label> <br />
                <input type="password" name="password" ref={register} required /> <br /><br />
    
                <button>Add</button>

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

export default AddCustomer;
