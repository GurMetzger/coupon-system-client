import { ConfirmationNumberSharp } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

function CouponMenuButton(): JSX.Element {
    return (
        <div className="MenuButton">
			
            <NavLink to="/coupons" exact >
                <span><ConfirmationNumberSharp fontSize="large" /> Coupons</span>
            </NavLink>

        </div>
    );
}

export default CouponMenuButton;
