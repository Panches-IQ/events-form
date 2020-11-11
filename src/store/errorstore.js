import { createStore } from 'redux';
import { initialerror } from './initialdata';

const dataReducer = (state, action) => {
    switch(action.type) {
        case ERROR_ACTION.TITLE:
            return { ...state, title: action.payload };
        case ERROR_ACTION.COORDINATOR:
            return { ...state, coordinator: action.payload };
        case ERROR_ACTION.DATE:
            return { ...state, date: action.payload };
        case ERROR_ACTION.DESCRIPTION:
            return { ...state, description: action.payload };
        default:
            return state;
    }
}

export default createStore(dataReducer, initialerror);
