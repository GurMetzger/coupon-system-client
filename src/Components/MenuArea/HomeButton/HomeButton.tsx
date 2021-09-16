import { Home } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

function HomeButton(): JSX.Element {
    return (
        <div className="MenuButton">
            
            <NavLink to="/home" exact >
                <span><Home fontSize="large" /> Home</span>
            </NavLink>

        </div>
    );
}

export default HomeButton;
