import { Business, Delete } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import CompanyModel from "../../../Models/CompanyModel";
import { companyDeletedAction } from "../../../Redux/CompaniesState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./DeleteCompany.css";

function DeleteCompany(): JSX.Element {

    const { register, handleSubmit } = useForm<CompanyModel>();

    async function send(company: CompanyModel) {
        try {
            
            const response = await jwtAxios.delete(globals.urls.deleteCompany + company.id);
            const deletedCompanyID = response.data;
            
            store.dispatch(companyDeletedAction(deletedCompanyID))
            notify.success("Company with ID '" + company.id + "' was successfully deleted!");

        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="DeleteCompany">
			
            <br />

            <span><Business /><Delete /> Delete Company</span>

            <br /><br />

            <form onSubmit={handleSubmit(send)}>

                <br /><br />

                <label>*ID: </label> <br />
                <input type="number" name="id" ref={register} required /> <br /><br />
                
                <br /><br /><br />

                <button>Delete</button>

            </form>

        </div>
    );
}

export default DeleteCompany;
