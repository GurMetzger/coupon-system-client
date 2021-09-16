import { Input } from "@material-ui/icons";
import { NavLink, useLocation } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import "./CustomerCard.css";

interface CustomerCardProps {
	customer: CustomerModel;
}

function CustomerCard(props: CustomerCardProps): JSX.Element {

    const location = useLocation();

    return (
        <div className="CustomerCard Card">

            {/* Passing the Customer as a prop */}
			<NavLink to={{pathname: "/admin/customers/" + props.customer.id, state: { customer: props.customer, prevPath: location.pathname }}} exact >
                <div>

                    <span>Customer <Input /></span>

                    <br /><br />

                    ID: {props.customer.id} 
                    <br />
                    First Name: {props.customer.firstName} 
                    <br />
                    Last Name: {props.customer.firstName} 
                    <br />
                    Email: {props.customer.email} 
                    <br />
                    Password: {props.customer.password}

                    <br />

                </div>
            </NavLink>
			
        </div>
    );
}

export default CustomerCard;
