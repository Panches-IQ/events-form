import { createStore } from 'redux';
import { initialdata } from './initialdata';
import { EVENT_ACTION } from './namespace';

const dataReducer = (state, action) => {
    switch(action.type) {
        case EVENT_ACTION.TITLE:
            return { ...state, title: action.payload };
        case EVENT_ACTION.COORDINATOR:
            return { ...state, coordinator: action.payload };
        case EVENT_ACTION.DATE:
            return { ...state, date: action.payload };
        case EVENT_ACTION.DESCRIPTION:
            return { ...state, description: action.payload };
        default:
            return state;
    }
}

export default createStore(dataReducer, initialdata);
