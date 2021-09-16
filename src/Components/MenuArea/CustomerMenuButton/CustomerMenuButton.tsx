import { Person } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

function CustomerMenuButton(): JSX.Element {
    return (
        <div className="MenuButton">
			
            <NavLink to="/customer" exact >
                <span><Person fontSize="large" /> Customer</span>
            </NavLink>

        </div>
    );
}

export default CustomerMenuButton;
