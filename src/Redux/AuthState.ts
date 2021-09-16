import UserModel from "../Models/UserModel";

// Auth State
export class AuthState {
    public user: UserModel = null;
    public constructor() {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            this.user = storedUser;
        }
    }
}

// ================================

// Auth Action Types
export enum AuthActionType {
    Register = "Register", 
    Login = "Login", 
    Logout = "Logout"
}

// ================================

// Auth Action
export interface AuthAction {
    type: AuthActionType;
    payload?: any; // The ? is for the Logout!
}

// ================================

// Auth Action Creators
export function registerAction(user: UserModel): AuthAction {
    return { type: AuthActionType.Register, payload: user };
}
export function loginAction(user: UserModel): AuthAction {
    return { type: AuthActionType.Login, payload: user };
}
export function logoutAction(): AuthAction {
    return { type: AuthActionType.Logout };
}

// ================================

// Auth Reducer
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {

    const newState = {...currentState };

    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
            newState.user = action.payload;
            localStorage.setItem("user", JSON.stringify(newState.user));
            break;
        case AuthActionType.Logout:
            newState.user = null;
            localStorage.removeItem("user");
            break;
    }

    return newState;
}
