export enum Category {
    Food = "Food", 
    Electricity = "Electricity", 
    Restaurant = "Restaurant", 
    Vacation = "Vacation", 
    Clothes = "Clothes", 
    Rental = "Rental"
}

class CouponModel {
    public id: number;
    public company: number; // A Coupon receives its company by ID
    public title: string;
    public category?: Category;
    public description?: string;
    public startDate?: Date;
    public endDate: Date;
    public price: number;
    public amount: number;

    // Image is sent to Backend as FileList. Field is assigned the Image's name as a string
    public image?: FileList;
}

export default CouponModel;