import { Component } from "react";
import { ClientType } from "../../../Models/CredentialsModel";
import CustomerModel from "../../../Models/CustomerModel";
import { customerDownloadedAction } from "../../../Redux/CustomersState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import CustomerCard from "../../CardArea/CustomerCard/CustomerCard";
import ReturnButton from "../../SharedArea/ReturnButton/ReturnButton";
import "./CustomerList.css";

interface CustomerListState {
	customers: CustomerModel[];
}

// Administrator can view a List of Customers
class CustomerList extends Component<{}, CustomerListState> {

    public constructor(props: {}) {
        super(props);
        this.state = { customers: store.getState().customersState.customers };
    }

    public async componentDidMount() {
        try {

            // Auth check
            if (!this.isAuthorized()) {
                throw new Error("You are not authorized to view this page!");
            }

            if (store.getState().customersState.customers.length === 0) {

                const response = await jwtAxios.get<CustomerModel[]>(globals.urls.getAllCustomers);
                const customers = response.data;

                store.dispatch(customerDownloadedAction(customers));
                this.setState({ customers: customers });
            }
            
        } catch (err) {
            notify.error(err);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CustomerList">

                <h2>All Customers</h2>

                {
                    !this.isAuthorized() ? <>

                        <h1>You are not authorized to view this page!</h1>
                        
                    </> : this.state.customers.length === 0 ? <>

                        <h1>No Customers available to show!</h1>

                        <ReturnButton url="/admin" />

                    </> : <>

                        {this.state.customers.map(customer => <CustomerCard key={customer.id} customer={customer} />)}

                        <ReturnButton url="/admin" />
                        
                    </>
                }
                
            </div>
        );
    }

    isAuthorized(): boolean {
        return store.getState().authState.user?.clientType === ClientType.Administrator;
    }
}

export default CustomerList;
