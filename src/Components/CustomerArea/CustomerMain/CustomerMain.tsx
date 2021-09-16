import { useEffect } from "react";
import CouponModel from "../../../Models/CouponModel";
import { ClientType } from "../../../Models/CredentialsModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import BrowseCoupons from "../BrowseCoupons/BrowseCoupons";
import ViewCustomer from "../ViewCustomer/ViewCustomer";
import ViewCustomerCoupons from "../ViewCustomerCoupons/ViewCustomerCoupons";
import "./CustomerMain.css";

function CustomerMain(): JSX.Element {

    useEffect(() => {
        fetchCoupons();
    });

    return (
        <div className="CustomerMain">
			{
                !isAuthorized() ? <>
    
                    <h1>You are not authorized to view this page!</h1>
    
                </> : <>
    
                    <div></div>
                    <div></div>
                    <div></div>

                    <div>
                        <BrowseCoupons />
                        <ViewCustomerCoupons />
                        <ViewCustomer />
                    </div>

                    <div></div>
                    <div></div>
                    <div></div>
    
                </>
            }
        </div>
    );
    
    async function fetchCoupons() {
        try { 
            
            // Auth check
            if (!isAuthorized()) {
                throw new Error("You are not authorized to view this page!");
            }
            
            if (store.getState().couponsState.coupons.length === 0) {
                const response = await jwtAxios.get<CouponModel[]>(globals.urls.getCustomerCoupons);
                store.dispatch(couponsDownloadedAction(response.data));
            }
    
        } catch (err) {
            notify.error(err);
        }
    }
    
    function isAuthorized(): boolean {
        return store.getState().authState.user?.clientType === ClientType.Customer;
    }
}

export default CustomerMain;
