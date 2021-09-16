import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import { ClientType } from "../../../Models/CredentialsModel";
import { DeleteType } from "../../../Models/DeleteModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import CouponListDetails from "../../SharedArea/CouponListDetails/CouponListDetails";
import DeleteButton from "../../SharedArea/DeleteButton/DeleteButton";
import ReturnButton from "../../SharedArea/ReturnButton/ReturnButton";
import "./CompanyDetails.css";

interface RouteParams {
    id?: string;
}

interface CompanyDetailsProps extends RouteComponentProps<RouteParams> {
    
}

interface CompanyDetailsState {
	company: CompanyModel;
}

class CompanyDetails extends Component<CompanyDetailsProps, CompanyDetailsState> {

    private navProp: any = this.props.location.state;

    public constructor(props: CompanyDetailsProps) {
        super(props);
        this.state = { company: this.navProp ? this.navProp.company : null };
    }

    public async componentDidMount() {
        try {
            
            // Auth check
            if (!this.isAuthorized()) {
                throw new Error("You are not authorized to view this page!");
            }

            
            if (!this.state.company) {
                
                // URL Param check
                if (this.paramContainsLetters()) {
                    throw new Error("Invalid URL parameter");
                }
    
                // Param ID defined -> Admin has asked for details on Company
                let companyID = +this.props.match.params.id;
                // Param ID undefined -> Company has asked for details on itself
                if (!companyID) companyID = store.getState().authState.user?.id;
                
                const companyState = store.getState().companiesState.companies.find(company => company.id === companyID);
        
                if (companyState) {
                    this.setState({ company: companyState });
                } else {
                    // Can't find the Company in the state -> Checks in the Backend
                    const response = await jwtAxios.get<CompanyModel>(globals.urls.getOneCompany + companyID);
                    this.setState({ company: response.data });
                }
            }
            
        } catch (err) {
            notify.error(err);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CompanyDetails">
                
                <h2>Company Details</h2>

                {
                    !this.isAuthorized() ? <>

                        <h1>You are not authorized to view this page!</h1>

                    </> : this.state.company && <>

                        <br />
                        <h1>Company</h1>
                        <br />

                        <h3>ID: {this.state.company.id}</h3>
                        <h3>Name: {this.state.company.name}</h3>         
                        <h3>Email: {this.state.company.email}</h3>       
                        <h3>Password: {this.state.company.password}</h3>

                        <br /><br />

                        <h3>Coupons Created: {this.state.company.coupons?.length}</h3>

                        {/* Company's list of Coupons */}
                        <CouponListDetails coupons={this.state.company.coupons} />
                        
                        {/* Return Button */}
                        <ReturnButton url={this.navProp ? this.navProp.prevPath : ("/" + store.getState().authState.user?.clientType.toLowerCase())} />

                        {/* Update + Delete Company */}
                        {   
                            this.isAdmin() && <>

                                <UpdateCompany company={this.state.company} />

                                <DeleteButton deleteModel={{ deleteType: DeleteType.Company, id: this.state.company.id }}  />

                            </>
                        }

                    </>
                }

            </div>
        );
    }

    isAuthorized(): boolean {
        return this.isAdmin() || store.getState().authState.user?.clientType === ClientType.Company;
    }

    isAdmin(): boolean {
        return store.getState().authState.user?.clientType === ClientType.Administrator;
    }

    paramContainsLetters(): boolean {
        const companyID = this.props.match.params.id;
        if (companyID) {
            return globals.onlyNumPattern.test(companyID.toString()) === false;
        } else {
            return false;
        }
    }
}

export default CompanyDetails;
