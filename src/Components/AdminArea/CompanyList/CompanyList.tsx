import { Component } from "react";
import CompanyModel from "../../../Models/CompanyModel";
import { ClientType } from "../../../Models/CredentialsModel";
import { companyDownloadedAction } from "../../../Redux/CompaniesState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import CompanyCard from "../../CardArea/CompanyCard/CompanyCard";
import ReturnButton from "../../SharedArea/ReturnButton/ReturnButton";
import "./CompanyList.css";

interface CompanyListState {
    companies: CompanyModel[];
}

// Administrator can view a List of Companies
class CompanyList extends Component<{}, CompanyListState> {

    public constructor(props: {}) {
        super(props);
        this.state = { companies: store.getState().companiesState.companies };
    }

    public async componentDidMount() {
        try {

            // Auth check
            if (!this.isAuthorized()) {
                throw new Error("You are not authorized to view this page!");
            }

            if (store.getState().companiesState.companies.length === 0) {

                const response = await jwtAxios.get<CompanyModel[]>(globals.urls.getAllCompanies);
                const companies = response.data;

                store.dispatch(companyDownloadedAction(companies));
                this.setState({ companies: companies });
            }
            
        } catch (err) {
            notify.error(err);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CompanyList">

                <h2>All Companies</h2>

                {
                    !this.isAuthorized() ? <>

                        <h1>You are not authorized to view this page!</h1>
                        
                    </> : this.state.companies.length === 0 ? <>

                        <h1>No Companies available to show!</h1>

                        <ReturnButton url="/admin" />

                    </> : <>

                        {this.state.companies.map(company => <CompanyCard key={company.id} company={company} />)}

                        <ReturnButton url="/admin" />
                        
                    </>
                }
                
            </div>
        );
    }

    isAuthorized(): boolean {
        return store.getState().authState.user?.clientType === ClientType.Administrator;
    }
}

export default CompanyList;
