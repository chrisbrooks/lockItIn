export default {
    event: {
        toggle: false,
    },
    calculation: {
        surcharge: 0,
        cardType: '',
        complete: false,
        totalAmount: null,
    },
    country: {
        country: 'Australia',
    },
    urlQuery: {
        customerNumber: null,
        invoiceNumber: null,
        amount: null,
        prn: null,
        email: null,
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
