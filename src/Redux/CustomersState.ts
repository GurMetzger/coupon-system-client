import CustomerModel from "../Models/CustomerModel";

// Customers State
export class CustomersState {
    public customers: CustomerModel[] = [];
}

// ================================

// Customers Action Type
export enum CustomersActionType {
    CustomerDownloaded = "CustomerDownloaded",
    CustomerAdded = "CustomerAdded", 
    CustomerUpdated = "CustomerUpdated", 
    CustomerDeleted = "CustomerDeleted"
}

// ================================

// Customer Action
export interface CustomerAction {
    type: CustomersActionType;
    payload: any;
}

// ================================

// Customers Action Creators
export function customerDownloadedAction(customers: CustomerModel[]): CustomerAction {
    return { type: CustomersActionType.CustomerDownloaded, payload: customers }; // Get returns List of customers
}

export function customerAddedAction(customer: CustomerModel): CustomerAction {
    return { type: CustomersActionType.CustomerAdded, payload: customer }; // Add returns the added customer
}

export function customerUpdatedAction(customer: CustomerModel): CustomerAction {
    return { type: CustomersActionType.CustomerUpdated, payload: customer }; // Update returns the updated customer
} 

export function customerDeletedAction(customerID: number): CustomerAction {
    return { type: CustomersActionType.CustomerDeleted, payload: customerID }; // Delete returns the customer's ID
}

// ================================

// Customers Reducer
export function customerReducer(currentState: CustomersState = new CustomersState(), action: CustomerAction): CustomersState {

    const newState = {...currentState };

    switch (action.type) {
        case CustomersActionType.CustomerDownloaded:
            newState.customers = action.payload;
            break;
        case CustomersActionType.CustomerAdded:
            if (newState.customers.length !== 0) {
                newState.customers.push(action.payload);
            }
            break;
        case CustomersActionType.CustomerUpdated:
            const indexUpdate = newState.customers.findIndex(customer => customer.id === action.payload.id);
            if (indexUpdate !== -1) {
                newState.customers[indexUpdate] = action.payload;
            }
            break;
        case CustomersActionType.CustomerDeleted:
            const indexDelete = newState.customers.findIndex(customer => customer.id === action.payload);
            if (indexDelete !== -1) {
                newState.customers.splice(indexDelete, 1);
            }
            break;
    }

    return newState;
}
