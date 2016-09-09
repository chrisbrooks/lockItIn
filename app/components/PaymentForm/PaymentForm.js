import styles from './PaymentForm.less';
import React, { PropTypes } from 'react';
import NumberFormat from 'react-number-format';
import HelpIcon from '../HelpIcon/HelpIcon';
import * as constants from '../../constants';

const PaymentForm = ({
    paymentError,
    paymentErrorMessage,
    onFormChange,
    onFormBlur,
    cardNumber,
    expiry,
    cvv,
    cardNumberValid,
    cardNumberTouched,
    expiryValid,
    expiryTouched,
    cvvValid,
    cvvTouched,
    cardType,
    toggleHelpBox,
    toggle,
    }) => {

    const cardNumberLength = cardType === constants.cardType.AMEX ? '#### ###### #####' : '#### #### #### ####';
    const cvvLength = cardType === constants.cardType.AMEX ? '4' : '3';

    const visaSelected = cardType !== constants.cardType.VISA && cardType !== '' ? styles.notIssuerVisa : styles.issuerVisa;
    const masterCardSelected = cardType !== constants.cardType.MASTERCARD && cardType !== '' ? styles.notIssuerMasterCard : styles.issuerMasterCard;
    const amexSelected = cardType !== constants.cardType.AMEX && cardType !== '' ? styles.notIssuerAmex : styles.issuerAmex;

    const formValidation = (e) => {
        e.preventDefault();
        onFormBlur(e.target.name, e.target.value, true);
    };

    const formChange = (e) => {
        e.preventDefault();
        onFormChange(e.target.name, e.target.value, true);

        const caret = e.target.selectionStart + 1;
        if (e.target.name === constants.inputs.EXPIRY_DATE) {
            document.getElementById(constants.inputs.EXPIRY_DATE).setSelectionRange(caret, caret);
        }
    };

    const formatExpiryChange = (val) => {
        const value = val.substring(0, 2) + (val.length > 2 ? '/' + val.substring(2, 4) : ''); // eslint-disable-line prefer-template
        return value;
    };

    const errors = (
        <div className={styles.paymentError} data-automation="paymentError">
            <h2 data-automation="paymentErrorMessage">{paymentErrorMessage}</h2>
            <p>Refresh the page to try again or come back later.</p>
        </div>
    );

    const form = (
        <div data-automation="paymentForm">
            <h2 className={styles.paymentHeader}>Credit card details</h2>
            <p className={styles.acceptText}>We accept</p>

            <div className={styles.issuerContainer} data-automation="issuerContainer">

                <i className={visaSelected} aria-label={constants.cardType.VISA}></i>
                <i className={masterCardSelected} aria-label={constants.cardType.MASTERCARD}></i>
                <i className={amexSelected} aria-label={constants.cardType.AMEX}></i>

                <span className={styles.issuerSurcharge}>Fees apply</span>
            </div>

            <form autoComplete="on">
                <div className={styles.cardNumberContainer}>

                    <label
                        htmlFor={constants.inputs.CARD_NUMBER}
                        className={styles.cardNumberLabel}>Card number
                    </label>

                    <NumberFormat
                        data-automation="cardNumberInput"
                        displayType={'input'}
                        format={cardNumberLength}
                        name={constants.inputs.CARD_NUMBER}
                        className={styles.cardNumberInput}
                        onBlur={formValidation}
                        onKeyUp={formChange}
                    />

                    {!cardNumberValid && cardNumberTouched && cardType !== 'Diners' &&
                        <div className={styles.cardPaymentError} data-automation="cardPaymentError">
                            {cardNumber === null || cardNumber === '' ? 'Required' : 'Invalid card number'}
                        </div>
                    }

                    {cardType === 'Diners' &&
                        <div className={styles.cardPaymentError} data-automation="cardPaymentError">
                        Sorry, Dinners Club is not accepted
                        </div>
                    }

                </div>

                <div className={styles.expiryContainer}>

                    <label
                        htmlFor={constants.inputs.EXPIRY_DATE}
                        className={styles.expiryLabel}>Expiry
                    </label>

                    <NumberFormat
                        data-automation="expiryDateInput"
                        id={constants.inputs.EXPIRY_DATE}
                        format={formatExpiryChange}
                        name={constants.inputs.EXPIRY_DATE}
                        placeholder="MM/YY"
                        className={styles.expiryInput}
                        onBlur={formValidation}
                        onKeyUp={formChange}
                    />

                    {!expiryValid && expiryTouched &&
                        <div className={styles.cardPaymentError} data-automation="expiryPaymentError">
                            {expiry === null || expiry === '' ? 'Required' : 'Invalid'}
                        </div>
                    }

                </div>

                <div className={styles.securityCodeContainer}>

                    <label
                        htmlFor={constants.inputs.SECURITY_CODE}
                        className={styles.securityCodeLabel}>CCV
                    </label>

                    <HelpIcon cardType={cardType} toggleHelpBox={toggleHelpBox} toggle={toggle} />

                    <input
                        data-automation="securityCodeInput"
                        maxLength={cvvLength}
                        name={constants.inputs.SECURITY_CODE}
                        autoComplete="off"
                        className={styles.securityCodeInput}
                        onBlur={formValidation}
                        onKeyUp={formChange}
                    />

                    {!cvvValid && cvvTouched &&
                        <div className={styles.cardPaymentError} data-automation="cvvPaymentError">
                            {cvv === null || cvv === '' ? 'Required' : 'Invalid'}
                        </div>
                    }

                </div>
            </form>
        </div>
    );

    return (
        <div className={styles.creditCardPayment}>
            {paymentError ? errors : form}
        </div>
    );
};

PaymentForm.propTypes = {
    surcharge: PropTypes.string,
    paymentError: PropTypes.bool,
    paymentErrorMessage: PropTypes.string,
    cardNumberTouched: PropTypes.bool,
    expiryTouched: PropTypes.bool,
    cvvTouched: PropTypes.bool,
    onFormChange: PropTypes.func.isRequired,
    onFormBlur: PropTypes.func.isRequired,
    cardNumber: PropTypes.string,
    expiry: PropTypes.string,
    cvv: PropTypes.string,
    cardNumberValid: PropTypes.bool,
    expiryValid: PropTypes.bool,
    cvvValid: PropTypes.bool,
    cardType: PropTypes.string,
    toggleHelpBox: PropTypes.func.isRequired,
    toggle: PropTypes.bool,
};

export default PaymentForm;
