import { useCallback, useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import { ClientType } from "../../../Models/CredentialsModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import AddCoupon from "../AddCoupon/AddCoupon";
import DeleteCoupon from "../DeleteCoupon/DeleteCoupon";
import ViewCompany from "../ViewCompany/ViewCompany";
import ViewCompanyCoupons from "../ViewCompanyCoupons/ViewCompanyCoupons";
import "./CompanyMain.css";

function CompanyMain(): JSX.Element {

    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponsState.coupons);

    const fetchCoupons = useCallback(async () => {
        try { 
            
            // Auth check
            if (!isAuthorized()) {
                throw new Error("You are not authorized to view this page!");
            }
            
            if (store.getState().couponsState.coupons.length === 0) {
                const response = await jwtAxios.get<CouponModel[]>(globals.urls.getCompanyCoupons);
                store.dispatch(couponsDownloadedAction(response.data));
                setCoupons(response.data);
            }
    
        } catch (err) {
            notify.error(err);
        }
    }, []);

    useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);

    return (
        <div className="CompanyMain">
            {
                !isAuthorized() ? <>

                    <h1>You are not authorized to view this page!</h1>

                </> : <>

                    <div></div>
                    <div></div>

                    <AddCoupon />

                    <div>
                        <DeleteCoupon coupons={coupons} />
                        <ViewCompanyCoupons />
                        <ViewCompany />
                    </div>

                    <div></div>
                    <div></div>

                </>
            }
        </div>
    );
    
    function isAuthorized(): boolean {
        return store.getState().authState.user?.clientType === ClientType.Company;
    }
}

export default CompanyMain;
