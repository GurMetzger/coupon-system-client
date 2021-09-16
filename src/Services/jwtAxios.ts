import axios from 'axios';
import store from '../Redux/Store';

const jwtAxios = axios.create();

jwtAxios.interceptors.request.use(request => {
    
    request.headers = {
        "token": store.getState().authState.user?.token,
        "id": store.getState().authState.user?.id,
        
        "Content-Type": "application/json; charset=utf-8"
    };

    return request;
});

export default jwtAxios;