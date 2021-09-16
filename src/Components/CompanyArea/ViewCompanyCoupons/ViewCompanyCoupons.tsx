import { Apps, ConfirmationNumberSharp } from "@material-ui/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import GetCouponsModel, { GetCouponsType } from "../../../Models/GetCouponsModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./ViewCompanyCoupons.css";

function ViewCompanyCoupons(): JSX.Element {

    // Used for showing input fields
    const [state, setState] = useState({ getType: "All" });

    const { register, handleSubmit } = useForm<GetCouponsModel>();
    const history = useHistory();
    const location = useLocation();

    async function send(getRequest: GetCouponsModel) {
        try {
            
            if (store.getState().couponsState.coupons.length === 0) {
                const response = await jwtAxios.get<CouponModel[]>(globals.urls.getCompanyCoupons);
                store.dispatch(couponsDownloadedAction(response.data));
            }

            switch (getRequest.getType) {
                case GetCouponsType.All:
                    history.push("/company/details/coupons", { prevPath: location.pathname });
                    break;
                case GetCouponsType.Category:
                    history.push("/company/details/coupons?category=" + getRequest.category, { prevPath: location.pathname });
                    break;
                case GetCouponsType.Price:
                    history.push("/company/details/coupons?maxPrice=" + getRequest.maxPrice, { prevPath: location.pathname });
                    break;
            }

        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="ViewCompanyCoupons">

            <br />

            <span><ConfirmationNumberSharp /><Apps /> View Coupons</span>

            <br /><br /><br />

            <form onSubmit={handleSubmit(send)}>

                <label>Get </label>
                <select name="getType" ref={register} onChange={e => setState({ getType: e.currentTarget.value })} required >
                    <option value="All">All Coupons</option>
                    <option value="Category">By Category</option>
                    <option value="Price">By Max Price</option>
                </select> <br /><br />

                {
                    state.getType === GetCouponsType.All && <>

                        <br /><br />

                    </>
                }
                {
                    state.getType === GetCouponsType.Category && <>

                        <label>*Category: </label> <br />
                        <div>
                            <select name="category" ref={register} required >
                                <option value="Food">Food</option>
                                <option value="Electricity">Electricity</option>
                                <option value="Restaurant">Restaurant</option>
                                <option value="Vacation">Vacation</option>
                                <option value="Clothes">Clothes</option>
                                <option value="Rental">Rental</option>
                            </select>
                        </div>

                    </>
                }
                {
                    state.getType === GetCouponsType.Price && <>

                        <label>*Price: </label> <br />
                        <div>
                            <input type="number" name="maxPrice" step="0.01" min="0" ref={register} required />
                        </div>

                    </>
                }

                <br /><br />

                <button>Get</button>

            </form>
			
        </div>
    );
}

export default ViewCompanyCoupons;
