import { Apps, Business } from "@material-ui/icons";
import { NavLink, useLocation } from "react-router-dom";
import "./ViewCompany.css";

function ViewCompany(): JSX.Element {

    const location = useLocation();

    return (
        <div className="ViewCompany">

            <br />
            <span><Business /><Apps /> View Company</span>
            <br />

            <br />

            <NavLink to={{pathname: "/company/details", state: { prevPath: location.pathname }}} >
                <button>View</button>
            </NavLink>

        </div>
    );
}

export default ViewCompany;
