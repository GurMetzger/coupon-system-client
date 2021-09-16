import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { couponsAddedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./PurchaseCouponButton.css";

interface PurchaseCouponButtonProps {
	coupon: CouponModel;
}

function PurchaseCouponButton(props: PurchaseCouponButtonProps): JSX.Element {

    const history = useHistory();

    async function handleClick() {
        try {

            if (!store.getState().authState.user) {
                history.push("/login");
                throw new Error("You must be logged in for purchasing a Coupon!");
            }

            checkCoupon(props.coupon);

            // Only really need the ID to purchase the Coupon.
            const coupon = new CouponModel();
            coupon.id = props.coupon.id;

            const response = await jwtAxios.post<CouponModel>(globals.urls.purchaseCoupon, coupon);
            const purchasedCoupon = response.data;

            store.dispatch(couponsAddedAction(purchasedCoupon));
            notify.success("Coupon was successfully purchased!");

            history.push("/coupons");
            
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="PurchaseCouponButton">

            <Button color="primary" variant="contained" size="large" onClick={handleClick} >
                Purchase Coupon
            </Button>
			
        </div>
    );

    function checkCoupon(coupon: CouponModel) {

        // Must have Coupons left to purchase
        if (coupon.amount < 1) {
            throw new Error("Coupon ran out of stock!");
        }

        const curr = new Date().getTime();
        const couponEndDate = new Date(coupon.endDate).getTime();

        // Cannot purchase an expired Coupon
        if (couponEndDate < curr) {
            throw new Error("Coupon has expired!");
        }
    }
}

export default PurchaseCouponButton;
