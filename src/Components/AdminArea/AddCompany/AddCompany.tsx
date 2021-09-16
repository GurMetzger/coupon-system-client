import { AddCircle, Business } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import CompanyModel from "../../../Models/CompanyModel";
import { companyAddedAction } from "../../../Redux/CompaniesState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./AddCompany.css";

function AddCompany(): JSX.Element {

    const { register, handleSubmit } = useForm<CompanyModel>();

    async function send(company: CompanyModel) {
        try {

            checkCompany(company);

            const response = await jwtAxios.post<CompanyModel>(globals.urls.addCompany, company);
            const addedCompany = response.data;

            store.dispatch(companyAddedAction(addedCompany))
            notify.success("Company was successfully added!");

        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="AddCompany">

            <br />

			<span><Business /><AddCircle /> Add Company</span>

            <br /><br />

            <form onSubmit={handleSubmit(send)}>

                <label>*Name: </label> <br />
                <input type="text" name="name" ref={register} required /> <br /><br />

                <label>*Email: </label> <br />
                <input type="text" name="email" ref={register} required /> <br /><br />

                <label>*Password: </label> <br />
                <input type="password" name="password" ref={register} required /> <br /><br />
                
                <button>Add</button>

            </form>

        </div>
    );

    function checkCompany(company: CompanyModel) {

        // Email must be valid [ ___@__.com ]
        const pattern = globals.emailPattern;
        if (!pattern.test(company.email)) {   
            throw new Error("Please enter the valid Email format [ ___@__.com ]");       
        }

        // Password must be at least 5 characters long
        if (company.password.length < 5) {
            throw new Error("Password must be at least 5 characters long!");
        }
    }
}

export default AddCompany;
