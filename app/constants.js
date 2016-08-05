    export const inputs = {
        CARD_NUMBER: 'CardNumber',
        EXPIRY_DATE: 'ExpiryDate',
        SECURITY_CODE: 'securityCode',
    };

    export const cardType = {
        VISA: 'Visa',
        MASTERCARD: 'Mastercard',
        AMEX: 'Amex',
        DINERS: 'Diners',
    };

    export const errors = {
        DECLINED: 'Your card was declined.',
        DECLINED_FRAUDULENT: 'Your card was declined. fraudulent.',
        DECLINED_EXPIRED: 'Your card has expired.',
        DECLINED_INCORRECT_CVC: 'Your card\'s security code is incorrect.',
        INVALID_AMOUNT: 'Invalid positive integer.',
        INVALID_TOKEN: 'Invalid token.',
        UNSUPPORTED: 'Your card is not supported. Please use a Visa, MasterCard, or American Express card',
    };

    export const errorMessages = {
        DECLINED: 'Your payment was declined.  Please try paying with a different card.',
        DECLINED_FRAUDULENT: 'There was an error processing your payment.  Please try paying with a different card.',
        DECLINED_EXPIRED: 'Your card has expired.  Please check the expiry date or try paying with a different card.',
        DECLINED_INCORRECT_CVC: 'Your security code is incorrect.  Please check the security code or try paying with a different card.',
        UNSUPPORTED: 'Diners Club is not accepted. Please pay with Visa, MasterCard or American Express.',
        PROCESSING_ERROR: 'There was an error processing your payment.  Your card has not been charged.  Please wait a moment and try again.',
    };

    export const location = {
        NZ: 'NewZealand',
        AU: 'Australia',
    };

    export const number = {
        NZ: '0508 733 569',
        AU: '1300 658 700',
    };
