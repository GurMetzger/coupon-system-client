import { ClientType } from './CredentialsModel';

class UserModel {
    public id: number;
    public name: string;
    public email: string;
    public clientType: ClientType;
    public token: string;
}

export default UserModel;

// The Object received after a successful Login/Register
