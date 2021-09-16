export enum ClientType {
    Administrator = "Administrator",
    Company = "Company",
    Customer = "Customer"
}

class CredentialsModel {
    public email: string;
    public password: string;
    public clientType: ClientType;
}

export default CredentialsModel;
