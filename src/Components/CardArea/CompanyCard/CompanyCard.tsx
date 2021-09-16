import { Input } from "@material-ui/icons";
import { NavLink, useLocation } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import "./CompanyCard.css";

interface CompanyCardProps {
    company: CompanyModel;
}

function CompanyCard(props: CompanyCardProps): JSX.Element {

    const location = useLocation();

    return (
        <div className="CompanyCard Card">

            {/* Passing the Company as a prop */}
			<NavLink to={{pathname: "/admin/companies/" + props.company.id, state: { company: props.company, prevPath: location.pathname }}} exact >
                <div>

                    <span>Company <Input /></span>

                    <br /><br />

                    ID: {props.company.id} 
                    <br />
                    Name: {props.company.name} 
                    <br />
                    Email: {props.company.email} 
                    <br />
                    Password: {props.company.password}

                    <br />

                </div>
            </NavLink>

        </div>
    );
}

export default CompanyCard;
