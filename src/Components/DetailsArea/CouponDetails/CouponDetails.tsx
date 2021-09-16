import axios from "axios";
import { Component } from "react";
import { RouteComponentProps } from "react-router";
import CouponModel from "../../../Models/CouponModel";
import { ClientType } from "../../../Models/CredentialsModel";
import { DeleteType } from "../../../Models/DeleteModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import PurchaseCouponButton from "../../CustomerArea/PurchaseCouponButton/PurchaseCouponButton";
import DeleteButton from "../../SharedArea/DeleteButton/DeleteButton";
import ReturnButton from "../../SharedArea/ReturnButton/ReturnButton";
import "./CouponDetails.css";


interface RouteParams {
    id: string;
}

interface CouponDetailsProps extends RouteComponentProps<RouteParams> {
	
}

interface CouponDetailsState {
	coupon: CouponModel;
}

class CouponDetails extends Component<CouponDetailsProps, CouponDetailsState> {

    private navProp: any = this.props.location.state;

    public constructor(props: CouponDetailsProps) {
        super(props);
        this.state = { coupon: this.navProp ? this.navProp.coupon : null };
    }

    public async componentDidMount() {
        try {

            if (!this.state.coupon) {
                
                // URL Param check
                if (this.paramContainsLetters()) {
                    throw new Error("Invalid URL parameter");
                }
                
                const couponID = +this.props.match.params.id;

                const couponState = store.getState().couponsState.coupons.find(coupon => coupon.id === couponID);
    
                if (couponState) {
                    this.setState({ coupon: couponState });
                } else {
                    // Can't find the Coupon in the state -> Checks in the Backend
                    const response = await axios.get<CouponModel>(globals.urls.getOneCoupon + couponID);
                    this.setState({ coupon: response.data });
                }
            }

        } catch (err) {
            notify.error(err);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CouponDetails">

                <h2>Coupon Details</h2>

                {
                    this.state.coupon && <>

                        <br />
                        <h1>Coupon</h1>
                        <br />

                        <h3>ID: {this.state.coupon.id}</h3>
                        <h3>Company ID: {this.state.coupon.company}</h3>
                        <h3>Title: {this.state.coupon.title}</h3>
                        <h3>Category: {this.state.coupon.category ? this.state.coupon.category : "unspecified"}</h3>
                        <h3>Description: {this.state.coupon.description}</h3>       
                        <h3>Start Date: {this.state.coupon.startDate ? this.state.coupon.startDate : "unspecified"}</h3>
                        <h3>End Date: {this.state.coupon.endDate}</h3>
                        <h3>Price: {this.state.coupon.price ? this.state.coupon.price : "Free"}</h3>
                        <h3>Amount: {this.state.coupon.amount}</h3>

                        {/* Coupon Image */}
                        {this.state.coupon.image && <img src={globals.urls.getOneCouponImage + this.state.coupon.image} alt="Coupon" />}

                        {/* Return Button */}
                        <ReturnButton url={this.navProp ? this.navProp.prevPath : "/"} />

                        {/* Update + Delete Coupon */}
                        {
                            this.companyOwnsThisCoupon() && <>

                                <UpdateCoupon coupon={this.state.coupon} />

                                <DeleteButton deleteModel={{ deleteType: DeleteType.Coupon, id: this.state.coupon.id }}  />

                            </>
                        }

                        {/* Purchase Coupon Button */}
                        {
                            this.isGuestOrCustomer() && <>

                                <PurchaseCouponButton coupon={this.state.coupon} />

                            </>
                        }

                    </>
                }
				
            </div>
        );
    }

    companyOwnsThisCoupon(): boolean {
        return store.getState().authState.user?.clientType === ClientType.Company && 
               store.getState().authState.user?.id === this.state.coupon?.company;
    }

    paramContainsLetters(): boolean {
        const companyID = this.props.match.params.id;
        if (companyID) {
            return globals.onlyNumPattern.test(companyID.toString()) === false;
        } else {
            return false;
        }
    }

    isGuestOrCustomer(): boolean {
        return !store.getState().authState.user || store.getState().authState.user?.clientType === ClientType.Customer;
    }
}

export default CouponDetails;
