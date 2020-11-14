import { setErrorDate, setErrorDescription, setErrorEmail, setErrorFee, setErrorTime, setErrorTitle } from "../store/dataactions";
import { errorstore } from "../store/errorstore";
import moment from 'moment';

export const handleErrors = (config) => {
    const { type, value, limit, required } = config;
    const { title, description, fee, email, date, time } = errorstore.getState();
    let message, isvalid;

    switch (type) {
        case 'title':
            message = value ? null : 'Title is required';
            if (title !== message) {
                errorstore.dispatch(setErrorTitle(message));
            }
            break;
        case 'description':
            message = value ? (value.length > limit ? `Max is ${limit} symbols` : null) : 'Description is required';
            if (description !== message) {
                errorstore.dispatch(setErrorDescription(message));
            }
            break;
        case 'fee':
            message = value && value > 0 ? null : (required ? 'Fee is required' : null);
            if (fee !== message) {
                errorstore.dispatch(setErrorFee(message));
            }
            break;
        case 'email':
            const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isvalid = reg.test(String(value).toLowerCase());
            message = isvalid ? null : 'Please enter proper email';
            if (email !== message) {
                errorstore.dispatch(setErrorEmail(message));
            }
            break;
        case 'date':
            isvalid = moment(value, 'YYYY-MM-DD').isValid();
            message = isvalid ? null : 'Please enter date';
            if (date !== message) {
                errorstore.dispatch(setErrorDate(message));
            }
            break;
        case 'time':
            isvalid = moment(value, 'HH:mm').isValid();
            message = isvalid ? null : 'Please enter time when event starts';
            if (time !== message) {
                errorstore.dispatch(setErrorTime(message));
            }
            break;
    }
}
