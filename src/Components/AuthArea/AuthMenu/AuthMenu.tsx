import { Assignment, ExitToApp, Person } from "@material-ui/icons";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

interface AuthMenuState {
	user: UserModel;
}

class AuthMenu extends Component<{}, AuthMenuState> {

    private unsubscribeMe: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        this.state = { user: store.getState().authState.user };
    }

    public componentDidMount(): void {
        this.unsubscribeMe = store.subscribe(() => {
            this.setState({ user: store.getState().authState.user })
        });
    }

    public render(): JSX.Element {
        return (
            <div className="AuthMenu">
				{
                    this.state.user && <>

                        <span>Hello {this.state.user.name}</span>

                        <br/><br/>

                        <NavLink to="/logout">
                            <span><ExitToApp /> Logout</span>
                        </NavLink>

                    </>
                }
				{
                    !this.state.user && <>

                        <span>Hello Guest</span>

                        <br/>

                        <NavLink to="/login">
                            <span><Person /> Login</span>
                        </NavLink>

                        <br/>

                        <NavLink to="/register">
                            <span><Assignment /> Register</span>
                        </NavLink>
                        
                    </>
                }
            </div>
        );
    }

    public componentWillUnmount(): void {
        this.unsubscribeMe();
    }
}

export default AuthMenu;
