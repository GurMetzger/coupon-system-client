import { Component } from "react";
import { RouteComponentProps } from "react-router";
import { ClientType } from "../../../Models/CredentialsModel";
import CustomerModel from "../../../Models/CustomerModel";
import { DeleteType } from "../../../Models/DeleteModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import UpdateCustomer from "../../AdminArea/UpdateCustomer/UpdateCustomer";
import CouponListDetails from "../../SharedArea/CouponListDetails/CouponListDetails";
import DeleteButton from "../../SharedArea/DeleteButton/DeleteButton";
import ReturnButton from "../../SharedArea/ReturnButton/ReturnButton";
import "./CustomerDetails.css";

interface RouteParams {
    id?: string;
}

interface CustomerDetailsProps extends RouteComponentProps<RouteParams> {
	
}

interface CustomerDetailsState {
	customer: CustomerModel
}

class CustomerDetails extends Component<CustomerDetailsProps, CustomerDetailsState> {

    private navProp: any = this.props.location.state;

    public constructor(props: CustomerDetailsProps) {
        super(props);
        this.state = { customer: this.navProp ? this.navProp.customer : null };
    }

    public async componentDidMount() {
        try {
            
            // Auth check
            if (!this.isAuthorized()) {
                throw new Error("You are not authorized to view this page!");
            }
            
            if (!this.state.customer) {

                // URL Param check
                if (this.paramContainsLetters()) {
                    throw new Error("Invalid URL parameter");
                }

                // Param ID defined -> Admin has asked for details on Customer
                let customerID = +this.props.match.params.id;
                // Param ID undefined -> Customer has asked for details on itself
                if (!customerID) customerID = store.getState().authState.user?.id;

                const customerState = store.getState().customersState.customers.find(customer => customer.id === customerID);
    
                if (customerState) {
                    this.setState({ customer: customerState });
                } else {
                    // Can't find the Customer in the state -> Checks in the Backend
                    const response = await jwtAxios.get<CustomerModel>(globals.urls.getOneCustomer + customerID);
                    this.setState({ customer: response.data });
                }
            }
            
        } catch (err) {
            notify.error(err);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CustomerDetails">

                <h2>Customer Details</h2>

                {
                    !this.isAuthorized() ? <>

                        <h1>You are not authorized to view this page!</h1>
                        
                    </> : this.state.customer && <>

                        <br />
                        <h1>Customer</h1>
                        <br />

                        <h3>ID: {this.state.customer.id}</h3>
                        <h3>First Name: {this.state.customer.firstName}</h3>         
                        <h3>Last Name: {this.state.customer.lastName}</h3>         
                        <h3>Email: {this.state.customer.email}</h3>       
                        <h3>Password: {this.state.customer.password}</h3>

                        <br /><br />

                        <h3>Coupons Purchased: {this.state.customer.coupons?.length}</h3>

                        {/* Customer's list of Coupons */}
                        <CouponListDetails coupons={this.state.customer.coupons} />

                        {/* Return Button */}
                        <ReturnButton url={this.navProp ? this.navProp.prevPath : ("/" + store.getState().authState.user?.clientType.toLowerCase())} />

                        {/* Update + Delete Customer */}
                        {
                            this.isAdmin() && <>

                                <UpdateCustomer customer={this.state.customer} />
                            
                                <DeleteButton deleteModel={{ deleteType: DeleteType.Customer, id: this.state.customer.id }} />

                            </>
                        }

                    </>
                }
				
            </div>
        );
    }
    
    isAuthorized(): boolean {
        return this.isAdmin() || store.getState().authState.user?.clientType === ClientType.Customer;
    }

    isAdmin(): boolean {
        return store.getState().authState.user?.clientType === ClientType.Administrator;
    }

    paramContainsLetters(): boolean {
        const customerID = this.props.match.params.id;
        if (customerID) {
            return globals.onlyNumPattern.test(customerID.toString()) === false;
        } else {
            return false;
        }
    }
}

export default CustomerDetails;
