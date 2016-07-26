export default {
    ajaxCallsInProgress: 0,
    actions: {
        surcharge: 0,
        cardType: '',
        complete: false,
        totalAmount: null,
        toggle: false,
    },
    locationActions: {
        location: 'Australia',
    },
    urlQueryActions: {
        customerNumber: null,
        invoiceNumber: null,
        amount: null,
        prn: '',
        email: '',
    },
    paymentActions: {
        loading: false,
        paymentSuccess: false,
        paymentError: false,
        paymentErrorMessage: '',
    },
    validationActions: {
        cardNumberValid: false,
        cardNumberTouched: false,
        expiryValid: false,
        expiryTouched: false,
        cvvValid: false,
        cvvTouched: false,
    },
    cardActions: {
        cardNumber: null,
        expiry: null,
        cvv: null,
    },
};
