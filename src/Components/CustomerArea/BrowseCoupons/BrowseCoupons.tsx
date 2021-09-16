import { ConfirmationNumberSharp, ShoppingCart } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import "./BrowseCoupons.css";

function BrowseCoupons(): JSX.Element {
    return (
        <div className="BrowseCoupons">

            <br />
            <span><ConfirmationNumberSharp /><ShoppingCart /> Browse Coupons</span>
            <br /><br />

            <NavLink to="/coupons" >
                <button>Browse</button>
            </NavLink>
			
        </div>
    );
}

export default BrowseCoupons;
