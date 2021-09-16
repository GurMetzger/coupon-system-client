class Globals {
    // Email syntax pattern
    emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    
    // URL Parameter contains only numbers pattern
    onlyNumPattern = new RegExp(/^\d+$/);
}

// Global Settings which are suitable only for development
class DevelopmentGlobals extends Globals {
    public urls = {

        // Authentication
        login: "http://localhost:8080/api/auth/login/",
        register: "http://localhost:8080/api/auth/register/",
        
        // Admin - Coupons
        getAllCoupons: "http://localhost:8080/api/admin/getAllCoupons/",
        getOneCoupon: "http://localhost:8080/api/admin/getOneCoupon/",
        getOneCouponImage: "http://localhost:8080/api/admin/getOneCouponImage/",

        // Admin - Companies
        addCompany: "http://localhost:8080/api/admin/addCompany/",
        updateCompany: "http://localhost:8080/api/admin/updateCompany/",
        deleteCompany: "http://localhost:8080/api/admin/deleteCompany?id=",
        getAllCompanies: "http://localhost:8080/api/admin/getAllCompanies/",
        getOneCompany: "http://localhost:8080/api/admin/getOneCompany/",

        // Admin - Customers
        addCustomer: "http://localhost:8080/api/admin/addCustomer/",
        updateCustomer: "http://localhost:8080/api/admin/updateCustomer/",
        deleteCustomer: "http://localhost:8080/api/admin/deleteCustomer?id=",
        getAllCustomers: "http://localhost:8080/api/admin/getAllCustomers/",
        getOneCustomer: "http://localhost:8080/api/admin/getOneCustomer/",

        // Company
        addCompanyCoupon: "http://localhost:8080/api/company/addCoupon/",
        updateCompanyCoupon: "http://localhost:8080/api/company/updateCoupon/",
        deleteCompanyCoupon: "http://localhost:8080/api/company/deleteCoupon?id=",
        getCompanyCoupons: "http://localhost:8080/api/company/getAllCoupons/",
        getCompanyCouponsByCategory: "http://localhost:8080/api/company/getAllCouponsByCategory?category=",
        getCompanyCouponsByMaxPrice: "http://localhost:8080/api/company/getAllCouponsByMaxPrice?maxPrice=",
        getCompanyDetails: "http://localhost:8080/api/company/getCompanyDetails/",

        // Customer
        purchaseCoupon: "http://localhost:8080/api/customer/purchaseCoupon/",
        getCustomerCoupons: "http://localhost:8080/api/customer/getAllCoupons/",
        getCustomerCouponsByCategory: "http://localhost:8080/api/customer/getAllCouponsByCategory?category=",
        getCustomerCouponsByMaxPrice: "http://localhost:8080/api/customer/getAllCouponsByMaxPrice?maxPrice=",
        getCustomerDetails: "http://localhost:8080/api/customer/getCustomerDetails",

    };
}

// Global Settings which are suitable only for production
class ProductionGlobals extends Globals {
    public urls = {

        // Since I'm currently not taking this project into production, the URLs in ProductionGlobals are incorrect

        // Authentication
        login: "http://localhost:8080/api/auth/login/",
        register: "http://localhost:8080/api/auth/register/",
        
        // Admin - Coupons
        getAllCoupons: "http://localhost:8080/api/admin/getAllCoupons/",
        getOneCoupon: "http://localhost:8080/api/admin/getOneCoupon/",
        getOneCouponImage: "http://localhost:8080/api/admin/getOneCouponImage/",

        // Admin - Companies
        addCompany: "http://localhost:8080/api/admin/addCompany/",
        updateCompany: "http://localhost:8080/api/admin/updateCompany/",
        deleteCompany: "http://localhost:8080/api/admin/deleteCompany?id=",
        getAllCompanies: "http://localhost:8080/api/admin/getAllCompanies/",
        getOneCompany: "http://localhost:8080/api/admin/getOneCompany/",

        // Admin - Customers
        addCustomer: "http://localhost:8080/api/admin/addCustomer/",
        updateCustomer: "http://localhost:8080/api/admin/updateCustomer/",
        deleteCustomer: "http://localhost:8080/api/admin/deleteCustomer?id=",
        getAllCustomers: "http://localhost:8080/api/admin/getAllCustomers/",
        getOneCustomer: "http://localhost:8080/api/admin/getOneCustomer/",

        // Company
        addCompanyCoupon: "http://localhost:8080/api/company/addCoupon/",
        updateCompanyCoupon: "http://localhost:8080/api/company/updateCoupon/",
        deleteCompanyCoupon: "http://localhost:8080/api/company/deleteCoupon?id=",
        getCompanyCoupons: "http://localhost:8080/api/company/getAllCoupons/",
        getCompanyCouponsByCategory: "http://localhost:8080/api/company/getAllCouponsByCategory?category=",
        getCompanyCouponsByMaxPrice: "http://localhost:8080/api/company/getAllCouponsByMaxPrice?maxPrice=",
        getCompanyDetails: "http://localhost:8080/api/company/getCompanyDetails/",
        
        // Customer
        purchaseCoupon: "http://localhost:8080/api/customer/purchaseCoupon/",
        getCustomerCoupons: "http://localhost:8080/api/customer/getAllCoupons/",
        getCustomerCouponsByCategory: "http://localhost:8080/api/customer/getAllCouponsByCategory?category=",
        getCustomerCouponsByMaxPrice: "http://localhost:8080/api/customer/getAllCouponsByMaxPrice?maxPrice=",
        getCustomerDetails: "http://localhost:8080/api/customer/getCustomerDetails"

    };
}

const globals = process.env.NODE_ENV === "development" ? new DevelopmentGlobals() : new ProductionGlobals();

export default globals;
