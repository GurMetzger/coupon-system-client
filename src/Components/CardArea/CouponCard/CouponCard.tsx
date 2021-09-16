import { Input } from "@material-ui/icons";
import { NavLink, useLocation } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import "./CouponCard.css";

interface CouponCardProps {
	coupon: CouponModel;
}

function CouponCard(props: CouponCardProps): JSX.Element {

    const location = useLocation();

    return (
        <div className="CouponCard Card">
            
            {/* Passing the Coupon as a prop */}
            <NavLink to={{pathname: "/coupons/" + props.coupon.id, state: { coupon: props.coupon, prevPath: location.pathname + location.search }}} exact >
                <div>

                    <span>Coupon <Input /></span>

                    <br /><br />

                    ID: {props.coupon.id} 
                    <br />
                    Title: {props.coupon.title} 
                    <br />
                    Category: {props.coupon.category ? props.coupon.category : "unspecified"}
                    <br />
                    Price: {props.coupon.price ? props.coupon.price : "Free!"}
                    <br />
                    End Date: {props.coupon.endDate}

                </div>
            </NavLink>

        </div>
    );

    // function companyOwnsThisCoupon(): boolean {
    //     return store.getState().authState.user?.clientType === ClientType.Company && 
    //            store.getState().authState.user.id === props.coupon.company;
    // }
}

export default CouponCard;
