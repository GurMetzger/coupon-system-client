import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import CredentialsModel, { ClientType } from "../../../Models/CredentialsModel";
import globals from "../../../Services/Globals";
import "./Login.css";
import notify from "../../../Services/Notification";
import { loginAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import axios from "axios";
import UserModel from "../../../Models/UserModel";
import { useEffect } from "react";
import { VpnKey } from "@material-ui/icons";

function Login(): JSX.Element {
    
    const { register, handleSubmit } = useForm<CredentialsModel>();
    const history = useHistory();

    // If we are already logged in -> Redirect to Home
    useEffect(() => {
        if (store.getState().authState.user) {
            notify.error("Already logged in!");
            history.push("/home");
        }
    });

    async function send(credentials: CredentialsModel) {
        try {

            checkCredentials(credentials);
            
            let clientUrlPath: string;
            switch (credentials.clientType) {

                case ClientType.Administrator:
                    clientUrlPath = "admin";
                    break;
                case ClientType.Company:
                    clientUrlPath = "company";
                    break;
                case ClientType.Customer:
                    clientUrlPath = "customer";
                    break;

                default:
                    throw new Error("Please select a valid Client Type to login!");
            }
            
            const response = await axios.post<UserModel>(globals.urls.login + clientUrlPath, credentials);
            store.dispatch(loginAction(response.data));

            notify.success("Successfully Logged in!");
            history.push("/" + clientUrlPath);
            
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Login">
			
            <h2><span><VpnKey /> Login</span></h2>

            <form onSubmit={handleSubmit(send)} >

                <label>I am a </label>
                <select name="clientType" ref={register} required >
                    <option value="Customer">Customer</option>
                    <option value="Company">Company</option>
                    <option value="Administrator">Administrator</option>
                </select> <br /><br />

                <label>Email: </label> <br />
                <input type="text" name="email" ref={register} required /> <br /><br />

                <label>Password: </label> <br />
                <input type="password" name="password" ref={register} required /> <br /><br />

                <button>Login</button>

            </form>

        </div>
    );

    function checkCredentials(credentials: CredentialsModel) {

        // Email must be valid [ ___@__.com ]
        const pattern = globals.emailPattern;
        if (!pattern.test(credentials.email)) {   
          throw new Error("Please enter the valid Email format [ ___@__.com ]");       
        }

        // Password must be at least 5 characters long
        if (credentials.password.length < 5) {
            throw new Error("Password must be at least 5 characters long!");
        }
    }
}

export default Login;
