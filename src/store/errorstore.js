import { createStore } from 'redux';
import { initialerror } from './initialdata';
import { ERROR_ACTION } from './namespace';

const dataReducer = (state, action) => {
    switch(action.type) {
        case ERROR_ACTION.TITLE:
            return { ...state, title: action.payload };
        case ERROR_ACTION.EMAIL:
            return { ...state, email: action.payload };
        case ERROR_ACTION.FEE:
            return { ...state, fee: action.payload };
        case ERROR_ACTION.COORDINATOR:
            return { ...state, coordinator: action.payload };
        case ERROR_ACTION.DATE:
            return { ...state, date: action.payload };
        case ERROR_ACTION.TIME:
            return { ...state, time: action.payload };
        case ERROR_ACTION.DESCRIPTION:
            return { ...state, description: action.payload };
        default:
            return state;
    }
}

export const errorstore = createStore(dataReducer, initialerror);
