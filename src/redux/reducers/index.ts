import { combineReducers } from 'redux';
import auth from './auth';


const appReducer: any = combineReducers({
    auth,
});

export default appReducer;

// export type State = ReturnType
export type State = ReturnType<typeof appReducer>

