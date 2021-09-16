import { ConfirmationNumberSharp, Delete } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import CouponModel from "../../../Models/CouponModel";
import { couponsDeletedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./DeleteCoupon.css";

interface DeleteCouponProps {
    coupons: CouponModel[];
}

function DeleteCoupon(props: DeleteCouponProps): JSX.Element {

    const { register, handleSubmit } = useForm<CouponModel>();

    async function send(coupon: CouponModel) {
        try {

            if (props.coupons?.length === 0) {
                throw new Error("You have no Coupons available to delete");
            }
            
            const response = await jwtAxios.delete(globals.urls.deleteCompanyCoupon + coupon.id);
            const deletedCouponID = response.data;
            
            store.dispatch(couponsDeletedAction(deletedCouponID));
            notify.success("Coupon with ID '" + coupon.id + "' was successfully deleted!");

        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="DeleteCoupon">
			
            <br />

            <span><ConfirmationNumberSharp /><Delete /> Delete Coupon</span>

            <br /><br />

            <form onSubmit={handleSubmit(send)}>

                <br /><br />

                {
                    props.coupons?.length !== 0 ? <>
                    
                        <label>*Title: </label> <br />
                        <select name="id" ref={register} required >
                            <option>{/* No Category Option */}</option>
                            {props.coupons?.map(coupon => <option key={coupon.id} value={coupon.id}>{coupon.title}</option>)}
                        </select> <br /><br />
                    
                    </> : <>

                        <h3>No Coupons Available...</h3>
                        
                    </>
                }
                
                <br /><br />

                <button>Delete</button>

            </form>

        </div>
    );
}

export default DeleteCoupon;
