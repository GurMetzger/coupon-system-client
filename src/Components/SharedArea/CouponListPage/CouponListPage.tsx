import axios from "axios";
import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import CouponModel, { Category } from "../../../Models/CouponModel";
import { ClientType } from "../../../Models/CredentialsModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import CouponCard from "../../CardArea/CouponCard/CouponCard";
import ReturnButton from "../ReturnButton/ReturnButton";
import "./CouponListPage.css";

interface CouponListPageProps extends RouteComponentProps {
    
}

interface CouponListPageState {
	coupons: CouponModel[];
}

// The List of Coupons displayed on a Coupons page
class CouponListPage extends Component<CouponListPageProps, CouponListPageState> {

    private location = this.props.location;
    private navProp: any = this.location.state;

    public constructor(props: CouponListPageProps) {
        super(props);
        this.state = { coupons: this.navProp ? this.navProp.coupons : null };
    }

    public async componentDidMount() {
        try {
            
            if (!this.state.coupons) {

                // If URL is of Store's Coupons page -> fetch all
                if (this.isStorePage()) {
                    const response = await axios.get<CouponModel[]>(globals.urls.getAllCoupons);
                    this.setState({ coupons: response.data });
                    return;
                }

                // ================================

                // If it's not the Store's Coupons page -> It's a personal page of a Client
                if (!this.isCompanyOrCustomer() || this.customerInCompany() || this.companyInCustomer()) {
                    throw new Error("You are not authorized to view this page!");
                }

                let couponsPath = "http://localhost:8080/api";

                if (store.getState().authState.user?.clientType === ClientType.Company) {
                    couponsPath += "/company/getAllCoupons";
                }
                if (store.getState().authState.user?.clientType === ClientType.Customer) {
                    couponsPath += "/customer/getAllCoupons";
                }
    
                if (this.location.search.substring(0, 10).toLowerCase() === "?category=") {
                    const category = this.location.search.substring(10, this.location.search.length).toLowerCase();
                    couponsPath += "ByCategory?category=";

                    switch (category) {
                        case "food":
                            couponsPath += Category.Food; break;
                        case "electricity":
                            couponsPath += Category.Electricity; break;
                        case "restaurant":
                            couponsPath += Category.Restaurant; break;
                        case "vacation":
                            couponsPath += Category.Vacation; break;
                        case "clothes":
                            couponsPath += Category.Clothes; break;
                        case "rental":
                            couponsPath += Category.Rental; break;
                        default:
                            throw new Error("No such Category '" + category + "' exists");
                    }
                }
                if (this.location.search.substring(0, 10).toLowerCase() === "?maxprice=") {
                    const maxPrice = this.location.search.substring(10, this.location.search.length);
                    couponsPath += "ByMaxPrice?maxPrice=" + maxPrice;

                    if (!maxPrice || globals.onlyNumPattern.test(maxPrice.toString()) === false) {
                        throw new Error("Invalid URL Param");
                    }
                }
                
                const response = await jwtAxios.get<CouponModel[]>(couponsPath);
                this.setState({ coupons: response.data });
            }
            
        } catch (err) {
           notify.error(err); 
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CouponListPage">

                {
                    this.state.coupons?.length === 0 ? <>

                        <h1>No Available Coupons...</h1>

                    </> : <>

                        <div></div>
                        
                        <div>

                            {this.isStorePage() ? <h2>Store's Coupons</h2> : <h2>View Coupons</h2>}

                            {this.state.coupons?.map(coupon => <CouponCard key={coupon.id} coupon={coupon} />)}

                        </div>
                        
                        <div></div>

                    </>
                }

                {
                    !this.isStorePage() && <>

                        <ReturnButton url={this.navProp ? this.navProp.prevPath : 
                            store.getState().authState.user ? "/" + store.getState().authState.user.clientType.toLowerCase() : "/"} />

                    </>
                }
				
            </div>
        );
    }

    isCompanyOrCustomer(): boolean {
        return store.getState().authState.user?.clientType === ClientType.Company || 
        store.getState().authState.user?.clientType === ClientType.Customer;
    }

    customerInCompany(): boolean {
        return store.getState().authState.user?.clientType === ClientType.Customer && 
        this.location.pathname.substring(0, 8) === "/company";
    }

    companyInCustomer(): boolean {
        return store.getState().authState.user?.clientType === ClientType.Company && 
        this.location.pathname.substring(0, 9) === "/customer";
    }

    isStorePage(): boolean {
        return this.location.pathname === "/coupons";
    }
}

export default CouponListPage;
