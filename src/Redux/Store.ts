import { CombinedState, combineReducers, createStore } from "redux";
import { AuthAction, AuthActionType, authReducer, AuthState } from "./AuthState";
import { CompaniesState, CompanyAction, companyReducer } from "./CompaniesState";
import { CouponAction, couponsReducer, CouponsState } from "./CouponsState";
import { CustomerAction, customerReducer, CustomersState } from "./CustomersState";

const appReducers = combineReducers({ 
    authState: authReducer, // Authentication
    companiesState: companyReducer, // Companies - Admin
    customersState: customerReducer, // Customers - Admin
    couponsState: couponsReducer // Coupons - Company/Customer
});

const rootReducer = (state: CombinedState<{ authState: AuthState; companiesState: CompaniesState; customersState: CustomersState; couponsState: CouponsState; }>, 
    action: AuthAction | CompanyAction | CustomerAction | CouponAction) => {
        
    // If a User Logouts -> Wipes the whole State
    if (action.type === AuthActionType.Logout) {
        return appReducers(undefined, action);
    }
    return appReducers(state, action);
}

const store = createStore(rootReducer);

export default store;
