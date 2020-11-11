import { ERROR_ACTION, EVENT_ACTION } from "./namespace";

/** EVENT STATE */

export const setDate = (data) => ({
    type: EVENT_ACTION.DATE,
    payload: data
});

export const setCoordinator = (data) => ({
    type: EVENT_ACTION.COORDINATOR,
    payload: data
});

export const setTitle = (data) => ({
    type: EVENT_ACTION.TITLE,
    payload: data
});

export const setDescription = (data) => ({
    type: EVENT_ACTION.DESCRIPTION,
    payload: data
});

export const setPaid = (data) => ({
    type: EVENT_ACTION.PAID,
    payload: data
});

export const setPayment = (data) => ({
    type: EVENT_ACTION.PAYMENT,
    payload: data
});

export const setEmail = (data) => ({
    type: EVENT_ACTION.EMAIL,
    payload: data
});

/** ERROR STATE */

export const setErrorDate = (data) => ({
    type: ERROR_ACTION.DATE,
    payload: data
});

export const setErrorCoordinator = (data) => ({
    type: ERROR_ACTION.COORDINATOR,
    payload: data
});

export const setErrorTitle = (data) => ({
    type: ERROR_ACTION.TITLE,
    payload: data
});

export const setErrorDescription = (data) => ({
    type: ERROR_ACTION.DESCRIPTION,
    payload: data
});

export const setErrorPaid = (data) => ({
    type: ERROR_ACTION.PAID,
    payload: data
});

export const setErrorPayment = (data) => ({
    type: ERROR_ACTION.PAYMENT,
    payload: data
});

export const setErrorEmail = (data) => ({
    type: ERROR_ACTION.EMAIL,
    payload: data
});
