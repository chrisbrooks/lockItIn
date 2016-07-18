export const inputs = {
	CARD_NUMBER: 'CardNumber',
	EXPIRY_DATE: 'ExpiryDate',
	SECURITY_CODE: 'securityCode'
}

export const cardType = {
	VISA: 'Visa',
	MASTERCARD: 'Mastercard',
	AMEX: 'Amex',
	DINERS: 'Diners'
}

export const errors = {
    INVALID_AMOUNT: 'Invalid positive integer.',
        INVALID_CUSTOMER: 'No such customer.',
        INVALID_TOKEN: 'Invalid token.',
        DECLINED: 'Your card was declined.',
        DECLINED_EXPIRED: 'Your card has expired.',
        DECLINED_FRAUDULENT: 'Your card was declined. fraudulent.',
        DECLINED_INCORRECT_CVC: 'Your card\'s security code is incorrect.',
        DECLINED_INCORRECT_NUMBER: 'Your card number was incorrect.',
        PROCESSING_ERROR: 'An error occured while processing your card.  Try again in a little bit.',
        TOKENISATION_FAILURE: 'tokenisationFailure',
        UNSUPPORTED: 'Your card is not supported. Please use a Visa, MasterCard, or American Express card'
};

export const errorMessages = {
    NUMBER_INCORRECT: 'Your card number is incorrect.  Please check number or try paying with a different card.',
        CVC_INCORRECT: 'Your security code is incorrect.  Please check the security code or try paying with a different card.',
        CARD_EXPIRED: 'Your card has expired.  Please check the expiry date or try paying with a different card.',
        DECLINED: 'Your payment was declined.  Please try paying with a different card.',
        PROCESSING_ERROR: 'There was an error processing your payment.  Your card has not been charged.  Please wait a moment and try again.',
        DECLINED_FRAUDULENT: 'There was an error processing your payment.  Please try paying with a different card.',
        UNSUPPORTED: 'Diners Club is not accepted. Please pay with Visa, MasterCard or American Express.'
};
