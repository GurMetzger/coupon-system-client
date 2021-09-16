import { Apps, Business } from "@material-ui/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import GetClientModel, { GetClientType } from "../../../Models/GetClientModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./GetCompany.css";

function GetCompany(): JSX.Element {

    // Used for showing Company ID input field
    const [state, setState] = useState({ getType: "All" });

    const { register, handleSubmit } = useForm<CompanyModel>();
    const history = useHistory();
    const location = useLocation();

    async function send(getRequest: GetClientModel) {
        try {
            
            switch (getRequest.getType) {
                case GetClientType.All:
                    history.push("/admin/companies");
                    break;
                case GetClientType.One:
                    const id = +getRequest.id;

                    // Checks if Company exists in State
                    const companyState = store.getState().companiesState.companies.find(company => company.id === id);
                    if (companyState) {
                        // Passing the Company as param
                        history.push("/admin/companies/" + getRequest.id, { company: companyState, prevPath: location.pathname });
                        return;
                    }

                    // If not, checks if Company exists in Database
                    const response = await jwtAxios.get<CompanyModel>(globals.urls.getOneCompany + id);
                    const companyDb = response.data;
                    if (companyDb) {
                        // Passing the Company as param
                        history.push("/admin/companies/" + getRequest.id, { company: companyDb, prevPath: location.pathname });
                        return; 
                    }

                    // If not in both, Company must not exist
                    throw new Error("Company with ID '" + id + "' doesn't exist!");
            }

        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="GetCompany">
			
            <br />

            <span><Business /><Apps /> Get Companies</span>

            <br /><br /><br />

            <form onSubmit={handleSubmit(send)}>

                <label>Get </label>
                <select name="getType" ref={register} onChange={e => setState({ getType: e.currentTarget.value })} required >
                    <option value="All">All Companies</option>
                    <option value="One">One Company</option>
                </select>
                
                <br /><br />

                {
                    state.getType === GetClientType.One ? <>
                        <label>*ID: </label> <br />
                        <input type="number" name="id" ref={register} required />
                    </> : <>
                        <br />
                    </>
                }

                <br /><br /><br /><br /><br />

                <button>Get</button>

            </form>

        </div>
    );
}

export default GetCompany;
