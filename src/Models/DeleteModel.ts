export enum DeleteType {
    Company = "Company",
    Customer = "Customer",
    Coupon = "Coupon"
}

class DeleteModel {
    public deleteType: DeleteType;
    public id: number;
}

export default DeleteModel;

// Used by all Clients for deleting a Company/Customer/Coupon
