import { Grade } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

function AdminMenuButton(): JSX.Element {
    return (
        <div className="MenuButton">
			
            <NavLink to="/admin" exact >
                <span><Grade fontSize="large" /> Admin</span>
            </NavLink>

        </div>
    );
}

export default AdminMenuButton;
