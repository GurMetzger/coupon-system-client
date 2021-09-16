import { Assignment, Business } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import { companyUpdatedAction } from "../../../Redux/CompaniesState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./UpdateCompany.css";

interface UpdateCompanyProps {
    company?: CompanyModel;
}

function UpdateCompany(props: UpdateCompanyProps): JSX.Element {

    const { register, handleSubmit } = useForm<CompanyModel>();
    const history = useHistory();

    async function send(company: CompanyModel) {
        try {

            checkCompany(company);

            // === Data that cannot be updated/changed
            company.id = props.company?.id;
            company.name = props.company?.name;
            
            // The Coupons are persisted in the Backend
            // company.coupons = props.company?.coupons;
            // ================

            const response = await jwtAxios.put<CompanyModel>(globals.urls.updateCompany, company);
            const updatedCompany = response.data;

            store.dispatch(companyUpdatedAction(updatedCompany));
            notify.success("Company was successfully updated!");
            history.push("/admin/companies");

        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="UpdateCompany">

            <h2><Business /><Assignment /> Update Company</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>ID: </label> {/* Non-Updatable Field */}
                <span>{props.company?.id}</span> <br /><br />

                <label>Name: </label> <br /> {/* Non-Updatable Field */}
                <span>{props.company?.name}</span> <br /><br />

                <label>*Email: </label> <br />
                <input type="text" name="email" ref={register} defaultValue={props.company?.email} required /> <br /><br />

                <label>*Password: </label> <br />
                <input type="password" name="password" ref={register} defaultValue={props.company?.password} required /> <br /><br />

                <br />

                <button>Update</button>

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

export default UpdateCompany;
