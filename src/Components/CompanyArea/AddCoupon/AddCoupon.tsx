import { AddCircle, ConfirmationNumberSharp } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import CouponModel from "../../../Models/CouponModel";
import { couponsAddedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./AddCoupon.css";

function AddCoupon(): JSX.Element {

    const { register, handleSubmit } = useForm<CouponModel>();

    async function send(coupon: CouponModel) {
        try {

            checkCoupon(coupon);
            
            const addFormData = new FormData();
            addFormData.append("title", coupon.title);
            addFormData.append("endDate", new Date(coupon.endDate).toISOString().substring(0, 10));
            addFormData.append("price", coupon.price.toString());
            addFormData.append("amount", coupon.amount.toString());
            /* Optional */ coupon.category      && addFormData.append("category", coupon.category); 
            /* Optional */ coupon.description   && addFormData.append("description", coupon.description);
            /* Optional */ coupon.startDate     && addFormData.append("startDate", new Date(coupon.startDate).toISOString().substring(0, 10));
            /* Optional */ coupon.image.item(0) && addFormData.append("image", coupon.image.item(0));

            const response = await jwtAxios.post<CouponModel>(globals.urls.addCompanyCoupon, addFormData);
            const addedCoupon = response.data;

            store.dispatch(couponsAddedAction(addedCoupon));
            notify.success("Coupon was successfully added!");

        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="AddCoupon">
			
            <br />

            <span><ConfirmationNumberSharp /><AddCircle /> Add Coupon</span>

            <br /><br />

            <form onSubmit={handleSubmit(send)}>

                <label>*Title: </label> <br />
                <input type="text" name="title" ref={register} required /> <br /><br />

                <label>Category: </label> <br />
                <select name="category" ref={register} >
                    <option>{/* No Category Option */}</option>
                    <option value="Food">Food</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Rental">Rental</option>
                </select> <br /><br />
                
                <label>Description: </label> <br />
                <input type="text" name="description" ref={register} /> <br /><br />

                <label>Start Date: </label> <br />
                <input type="date" name="startDate" ref={register} /> <br /><br />

                <label>*End Date: </label> <br />
                <input type="date" name="endDate" ref={register} required /> <br /><br />

                <label>*Price: </label> <br />
                <input type="number" name="price" step="0.01" min="0" ref={register} required /> <br /><br />

                <label>*Amount: </label> <br />
                <input type="number" name="amount" step="1" min="0" ref={register} required /> <br /><br />

                <label>Image: </label> <br />
                <input type="file" name="image" accept="image/*" ref={register} /> <br /><br />

                <br /><br />

                <button>Add</button>

            </form>

        </div>
    );

    function checkCoupon(coupon: CouponModel) {

        // File names must not contain illegal characters (..)
        if (coupon.image?.item(0)?.name?.includes("..")) {
            throw new Error("Your Image contains Illegal characters '..'");
        }

        // End Date cannot be a date that is already expired
        const current = new Date(new Date().toISOString().slice(0, 10));
        if (new Date(coupon.endDate) < current) {
            throw new Error("End Date cannot be a Date that is already expired");
        }
    }

}

export default AddCoupon;
