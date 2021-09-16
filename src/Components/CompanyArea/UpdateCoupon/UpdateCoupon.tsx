import { Assignment, ConfirmationNumberSharp } from "@material-ui/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import CouponModel from "../../../Models/CouponModel";
import { couponsUpdatedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./UpdateCoupon.css";

interface UpdateCouponProps {
	coupon: CouponModel;
}

function UpdateCoupon(props: UpdateCouponProps): JSX.Element {

    const [state, setState] = useState({ keepImage: false });

    const { register, handleSubmit } = useForm<CouponModel>();
    const history = useHistory();

    async function send(coupon: CouponModel) {
        try {

            checkCoupon(coupon);

            // === Data that cannot be updated/changed
            coupon.id = props.coupon?.id;
            coupon.company = props.coupon?.company;
            // ================

            const updateFormData = new FormData();
            updateFormData.append("id", coupon.id.toString());
            updateFormData.append("company", coupon.company.toString());
            updateFormData.append("title", coupon.title);
            updateFormData.append("endDate", new Date(coupon.endDate).toISOString().substring(0, 10));
            updateFormData.append("price", coupon.price.toString());
            updateFormData.append("amount", coupon.amount.toString());
            /* Optional */ coupon.category && updateFormData.append("category", coupon.category); 
            /* Optional */ coupon.description && updateFormData.append("description", coupon.description);
            /* Optional */ coupon.startDate && updateFormData.append("startDate", new Date(coupon.startDate).toISOString().substring(0, 10));
            /* Optional - Upload new Image */ coupon.image?.item(0) && updateFormData.append("image", coupon.image.item(0));
            /* Optional - Keep current Image */ state.keepImage && updateFormData.append("keepImage", "true");

            const response = await jwtAxios.put<CouponModel>(globals.urls.updateCompanyCoupon, updateFormData);
            const updatedCoupon = response.data;

            store.dispatch(couponsUpdatedAction(updatedCoupon));
            notify.success("Coupon was successfully added!");
            history.push("/company");
            
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="UpdateCoupon">

            <h2><ConfirmationNumberSharp /><Assignment /> Update Coupon</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>ID: </label> {/* Non-Updatable Field */}
                <span>{props.coupon?.id}</span> <br />

                <label>Company ID: </label> {/* Non-Updatable Field */}
                <span>{props.coupon?.company}</span> <br /><br />

                <label>*Title: </label> <br />
                <input type="text" name="title" ref={register} defaultValue={props.coupon?.title} required /> <br /><br />

                <label>Category: </label> <br />
                <select name="category" ref={register} defaultValue={props.coupon?.category} >
                    <option>{/* No Category Option */}</option>
                    <option value="Food">Food</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Rental">Rental</option>
                </select> <br /><br />

                <label>Description: </label> <br />
                <input type="text" name="description" ref={register} defaultValue={props.coupon?.description} /> <br /><br />

                <label>Start Date: </label> <br />
                <input type="date" name="startDate" ref={register} defaultValue={props.coupon?.startDate && new Date(props.coupon?.startDate).toISOString().substr(0, 10)} /> <br /><br />

                <label>*End Date: </label> <br />
                <input type="date" name="endDate" ref={register} defaultValue={new Date(props.coupon?.endDate).toISOString().substr(0, 10)} required /> <br /><br />

                <label>*Price: </label> <br />
                <input type="number" name="price" step="0.01" min="0" ref={register} defaultValue={props.coupon?.price} required /> <br /><br />

                <label>*Amount: </label> <br />
                <input type="number" name="amount" min="0" ref={register} defaultValue={props.coupon?.amount} required /> <br /><br />

                <label>Image: </label> <br />
                {
                    props.coupon.image && <>
                        <span>
                            <input type="checkbox" onChange={e => setState({ keepImage: e.currentTarget.checked })} /> Keep Current Image
                        </span>
                    </>
                }
                {
                    !state.keepImage ? <>
                        <input type="file" name="image" accept="image/*" ref={register} />
                    </> : <>
                        <br />
                    </>
                }

                <br /><br />

                <button>Update</button>

            </form>
			
        </div>
    );

    function checkCoupon(coupon: CouponModel) {

        // File names must not contain illegal character (_)
        if (coupon.image?.item(0)?.name?.includes("_")) {
            throw new Error("Your Image contains Illegal character '_'");
        }

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

export default UpdateCoupon;
