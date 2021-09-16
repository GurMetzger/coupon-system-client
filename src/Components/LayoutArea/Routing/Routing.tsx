import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import Page404 from "../../SharedArea/Page404/Page404";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import AdminMain from "../../AdminArea/AdminMain/AdminMain";
import CompanyList from "../../AdminArea/CompanyList/CompanyList";
import CustomerList from "../../AdminArea/CustomerList/CustomerList";
import CustomerDetails from "../../DetailsArea/CustomerDetails/CustomerDetails";
import CompanyDetails from "../../DetailsArea/CompanyDetails/CompanyDetails";
import CouponDetails from "../../DetailsArea/CouponDetails/CouponDetails";
import Register from "../../AuthArea/Register/Register";
import CouponListPage from "../../SharedArea/CouponListPage/CouponListPage";
import CustomerMain from "../../CustomerArea/CustomerMain/CustomerMain";
import CompanyMain from "../../CompanyArea/CompanyMain/CompanyMain";

function Routing(): JSX.Element {
  return (
    <div className="Routing">

        <Switch>

            <Route path="/home" component={Home} exact />

            <Route path="/coupons" component={CouponListPage} exact />
            <Route path="/coupons/:id" component={CouponDetails} exact />

            <Route path="/register" component={Register} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/logout" component={Logout} exact />

            <Route path={["/admin", "/administrator"]} component={AdminMain} exact />
            <Route path="/admin/companies" component={CompanyList} exact /> 
            <Route path="/admin/customers" component={CustomerList} exact />
            <Route path="/admin/companies/:id" component={CompanyDetails} exact />
            <Route path="/admin/customers/:id" component={CustomerDetails} exact />

            <Route path="/company" component={CompanyMain} exact />
            <Route path="/company/details" component={CompanyDetails} exact />
            <Route path="/company/details/coupons" component={CouponListPage} exact />
            <Route path="/company/details/coupons?category=:category" component={CouponListPage} exact />
            <Route path="/company/details/coupons?maxPrice=:maxPrice" component={CouponListPage} exact />

            <Route path="/customer" component={CustomerMain} exact />
            <Route path="/customer/details" component={CustomerDetails} exact />
            <Route path="/customer/details/coupons" component={CouponListPage} exact />
            <Route path="/customer/details/coupons?category=:category" component={CouponListPage} exact />
            <Route path="/customer/details/coupons?maxPrice=:maxPrice" component={CouponListPage} exact />

            <Redirect from="/" to="/Home" exact />
            <Route component={Page404} />

        </Switch>
        
    </div>
  );
}

export default Routing;
