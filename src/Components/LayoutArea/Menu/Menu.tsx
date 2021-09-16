import { Component } from "react";
import { Unsubscribe } from "redux";
import { ClientType } from "../../../Models/CredentialsModel";
import store from "../../../Redux/Store";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import AdminMenuButton from "../../MenuArea/AdminMenuButton/AdminMenuButton";
import CompanyMenuButton from "../../MenuArea/CompanyMenuButton/CompanyMenuButton";
import CouponMenuButton from "../../MenuArea/CouponMenuButton/CouponMenuButton";
import CustomerMenuButton from "../../MenuArea/CustomerMenuButton/CustomerMenuButton";
import HomeButton from "../../MenuArea/HomeButton/HomeButton";
import "./Menu.css";

interface MenuState {
	clientType : ClientType;
}

class Menu extends Component<{}, MenuState> {

    private unsubscribeMe: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        this.state = { clientType: store.getState().authState.user?.clientType };
    }

    public componentDidMount(): void {
        this.unsubscribeMe = store.subscribe(() => {
            this.setState({ clientType: store.getState().authState.user?.clientType })
        })
    }

    public render(): JSX.Element {
        return (
            <div className="Menu">

                <nav>

                    {/* Home */}
                    <HomeButton />

                    {/* Store Coupons */}
                    <CouponMenuButton />

                    {/* Client Menu */}
                    {this.state.clientType === ClientType.Administrator && <AdminMenuButton />}
                    {this.state.clientType === ClientType.Company && <CompanyMenuButton />}
                    {this.state.clientType === ClientType.Customer && <CustomerMenuButton />}

                    {/* Authentication Area */}
                    <AuthMenu />

                </nav>

            </div>
        );
    }

    public componentWillUnmount(): void {
        this.unsubscribeMe();
    }
}

export default Menu;
