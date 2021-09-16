import { Assignment } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import { ClientType } from "../../../Models/CredentialsModel";
import CustomerModel from "../../../Models/CustomerModel";
import UserModel from "../../../Models/UserModel";
import { registerAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import "./Register.css";

function Register(): JSX.Element {
    
    // Used for showing input fields
    const [state, setState] = useState({ registerType: "Customer" });

    const history = useHistory();
    const { register, handleSubmit } = useForm<CustomerModel | CompanyModel>();

    // If we are already logged in -> Redirect to Home
    useEffect(() => {
        if (store.getState().authState.user) {
            notify.error("Already logged in!");
            history.push("/home");
        }
    });

    async function send(user: CustomerModel | CompanyModel) {
        try {

            checkRegistration(user);

            let clientUrlPath: string;
            switch (state.registerType) {
                case ClientType.Customer:
                    clientUrlPath = "customer";
                    break;
                case ClientType.Company:
                    clientUrlPath = "company";
                    break;

                default:
                    throw new Error("Please select a valid Client Type to register!");
            }

            const response = await axios.post<UserModel>(globals.urls.register + clientUrlPath, user);
            store.dispatch(registerAction(response.data));

            notify.success("Successfully Registered!");
            history.push("/home");

        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Register">

            <h2><span><Assignment /> Register</span></h2>

            <label>Register as </label>
            <select name="clientType" onChange={e => setState({ registerType: e.currentTarget.value })} required >
                <option value="Customer">Customer</option>
                <option value="Company">Company</option>
            </select> <br /><br /><br />

            {
                state.registerType === "Customer" && <>

                    <form onSubmit={handleSubmit(send)}>

                        <label>First Name: </label> <br />
                        <input type="text" name="firstName" ref={register} /> <br /><br />

                        <label>Last Name: </label> <br />
                        <input type="text" name="lastName" ref={register} /> <br /><br />

                        <label>*Email: </label> <br />
                        <input type="text" name="email" ref={register} required /> <br /><br />

                        <label>*Password: </label> <br />
                        <input type="password" name="password" ref={register} required /> <br /><br />

                        <button>Register</button>

                    </form>

                </>
            }
            {
                state.registerType === "Company" && <>

                    <form onSubmit={handleSubmit(send)}>
                        
                        <label>*Name: </label> <br />
                        <input type="text" name="name" ref={register} required /> <br /><br />

                        <label>*Email: </label> <br />
                        <input type="text" name="email" ref={register} required /> <br /><br />

                        <label>*Password: </label> <br />
                        <input type="password" name="password" ref={register} required /> <br /><br />

                        <button>Register</button>

                    </form>

                </>
            }
			
        </div>
    );

    function checkRegistration(user: CompanyModel | CustomerModel) {

        // Email must be valid [ ___@__.com ]
        const pattern = globals.emailPattern;
        if (!pattern.test(user.email)) {   
          throw new Error("Please enter the valid Email format [ ___@__.com ]");       
        }

        // Password must be at least 5 characters long
        if (user.password.length < 5) {
            throw new Error("Password must be at least 5 characters long!");
        }
    }
}

export default Register;
