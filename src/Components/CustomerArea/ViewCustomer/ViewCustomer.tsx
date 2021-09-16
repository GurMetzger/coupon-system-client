import { Apps, Person } from "@material-ui/icons";
import { NavLink, useLocation } from "react-router-dom";
import "./ViewCustomer.css";

function ViewCustomer(): JSX.Element {

    const location = useLocation();

    return (
        <div className="ViewCustomer">

            <br />
            <span><Person /><Apps /> View Customer</span>
            <br />
            
            <br />

            <NavLink to={{pathname: "/customer/details", state: { prevPath: location.pathname }}} >
                <button>View</button>
            </NavLink>
			
        </div>
    );
}

export default ViewCustomer;
