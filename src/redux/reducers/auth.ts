import { USER_LOGGED, FORGOT_PASSWORD_MOBILENUMBER, COUNTRY_DETAILS ,CURRENT_USER} from '../types';

const initialstate = {
    is_logged: false,
    forgotPasswordMobileNumber: {
        mobileNumber: "",
        token: ""
    },
    country: [],
    currentUser: {}
};

type Action = {
    type: string,
    payload?: any
}

export default (state: any = initialstate, action: Action) => {
    switch (action.type) {
        case USER_LOGGED:
            return Object.assign({}, state, {
                is_logged: action.payload,
            });
        case FORGOT_PASSWORD_MOBILENUMBER:
            return Object.assign({}, state, {
                forgotPasswordMobileNumber: action.payload,
            });
        case COUNTRY_DETAILS:
            return Object.assign({}, state, {
                country: action.payload,
            });
        case CURRENT_USER:
            return Object.assign({}, state, {
                currentUser: action.payload,
            });
        default:
            return state;
    }
};