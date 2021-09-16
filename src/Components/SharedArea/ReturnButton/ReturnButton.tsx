import { TransitEnterexit } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import "./ReturnButton.css";

interface ReturnButtonProps {
	url: string;
}

function ReturnButton(props: ReturnButtonProps): JSX.Element {
    return (
        <div className="ReturnButton">
			
            <NavLink to={props.url}>
                <span><TransitEnterexit /> Back</span>
            </NavLink>

        </div>
    );
}

export default ReturnButton;
