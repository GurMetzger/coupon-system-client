export enum GetClientType {
    All = "All",
    One = "One"
}

class GetClientModel {
    public getType: GetClientType;
    public id?: number;
}

export default GetClientModel;

// Used by Admin for viewing All/One Company(ies)/Customer(s)
