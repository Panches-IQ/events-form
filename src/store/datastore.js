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
        case EVENT_ACTION.FEE:
            return { ...state, fee: action.payload };
        case EVENT_ACTION.REWARD:
            return { ...state, reward: action.payload };
        case EVENT_ACTION.DURATION:
            return { ...state, duration: action.payload };
        case EVENT_ACTION.PAID:
            return { ...state, ispaid: action.payload };
        case EVENT_ACTION.EMAIL:
            return { ...state, email: action.payload };
        case EVENT_ACTION.CATEGORY:
            return { ...state, category: action.payload };
        default:
            return state;
    }
}

export const eventstore = createStore(dataReducer, initialdata);
