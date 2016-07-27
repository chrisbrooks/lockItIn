export default {
    ajaxCallsInProgress: 0,
    actions: {
        surcharge: 0,
        cardType: '',
        complete: false,
        totalAmount: null,
        toggle: false,
    },
    country: {
        location: 'Australia',
    },
    urlQuery: {
        customerNumber: null,
        invoiceNumber: null,
        amount: null,
        prn: '',
        email: '',
    },
    payment: {
        loading: false,
        paymentSuccess: false,
        paymentError: false,
        paymentErrorMessage: '',
    },
    validation: {
        cardNumberValid: false,
        cardNumberTouched: false,
        expiryValid: false,
        expiryTouched: false,
        cvvValid: false,
        cvvTouched: false,
    },
    card: {
        cardNumber: null,
        expiry: null,
        cvv: null,
    },
};
