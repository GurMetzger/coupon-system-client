import CompanyModel from "../Models/CompanyModel";

// Companies State
export class CompaniesState {
    public companies: CompanyModel[] = [];
}

// ================================

// Companies Action Type
export enum CompaniesActionType {
    CompanyDownloaded = "CompanyDownloaded",
    CompanyAdded = "CompanyAdded", 
    CompanyUpdated = "CompanyUpdated", 
    CompanyDeleted = "CompanyDeleted"
}

// ================================

// Company Action
export interface CompanyAction {
    type: CompaniesActionType;
    payload: any; 
}

// ================================

// Companies Action Creators
export function companyDownloadedAction(companies: CompanyModel[]): CompanyAction {
    return { type: CompaniesActionType.CompanyDownloaded, payload: companies }; // Get returns List of companies
}

export function companyAddedAction(company: CompanyModel): CompanyAction {
    return { type: CompaniesActionType.CompanyAdded, payload: company }; // Add returns the added company
}

export function companyUpdatedAction(company: CompanyModel): CompanyAction {
    return { type: CompaniesActionType.CompanyUpdated, payload: company }; // Update returns the updated company
} 

export function companyDeletedAction(companyID: number): CompanyAction {
    return { type: CompaniesActionType.CompanyDeleted, payload: companyID }; // Delete returns the company's ID
}

// ================================

// Companies Reducer
export function companyReducer(currentState: CompaniesState = new CompaniesState(), action: CompanyAction): CompaniesState {

    const newState = {...currentState };

    switch (action.type) {
        case CompaniesActionType.CompanyDownloaded:
            newState.companies = action.payload;
            break;
        case CompaniesActionType.CompanyAdded:
            if (newState.companies.length !== 0) {
                newState.companies.push(action.payload);
            }
            break;
        case CompaniesActionType.CompanyUpdated:
            const indexUpdate = newState.companies.findIndex(company => company.id === action.payload.id);
            if (indexUpdate !== -1) {
                newState.companies[indexUpdate] = action.payload;
            }
            break;
        case CompaniesActionType.CompanyDeleted:
            const indexDelete = newState.companies.findIndex(company => company.id === action.payload);
            if (indexDelete !== -1) {
                newState.companies.splice(indexDelete, 1);
            }
            break;
    }

    return newState;
}
