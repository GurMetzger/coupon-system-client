import { Component } from "react";
import CouponModel from "../../../Models/CouponModel";
import CouponCard from "../../CardArea/CouponCard/CouponCard";
import "./CouponListDetails.css";

interface CouponListDetailsProps {
	coupons: CouponModel[];
}

interface CouponListDetailsState {
    coupons: CouponModel[];
}

// The List of Coupons displayed on a Client Details page
class CouponListDetails extends Component<CouponListDetailsProps, CouponListDetailsState> {

    constructor(props: CouponListDetailsProps) {
        super(props);
        this.state = { coupons: props.coupons };
    }

    public render(): JSX.Element {
        return (
            <div className="CouponListDetails">

                    {
                        this.state.coupons?.length === 0 ? <>
        
                            <h1>No Available Coupons...</h1>
        
                        </> : <>
                            
                            <div></div>

                            {this.state.coupons?.map(coupon => <CouponCard key={coupon.id} coupon={coupon} />)}
        
                            <div></div>
                            
                        </>
                    }
                    
            </div>
        );
    }
}

export default CouponListDetails;
