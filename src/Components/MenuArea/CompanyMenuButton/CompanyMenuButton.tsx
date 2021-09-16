import { Business } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

function CompanyMenuButton(): JSX.Element {
    return (
        <div className="MenuButton">
			
            <NavLink to="/company" exact >
                <span><Business fontSize="large" /> Company</span>
            </NavLink>

        </div>
    );
}

export default CompanyMenuButton;
