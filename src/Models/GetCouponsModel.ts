import { Category } from "./CouponModel";

export enum GetCouponsType {
    All = "All",
    Category = "Category",
    Price = "Price"
}

class GetCouponsModel {
    public getType: GetCouponsType;
    public category?: Category;
    public maxPrice?: number;
}

export default GetCouponsModel;

// Used by Company/Customer for viewing Coupons
