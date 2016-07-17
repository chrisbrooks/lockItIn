import styles from './paymentForm.less';
import React from 'react';
import HelpIcon from '../helpIcon/helpIcon';
import * as constants from '../../constants';

const PaymentForm = ({
    paymentApiActive,
    onFormChange,
    onFormValidate,
    cardNumber,
    expiry,
    cvv,
    cardNumberValid,
    expiryValid,
    cvvValid,
    cardType,
    onToggle,
    toggle,
    }) => {

    const formValidation = (e) => {
        e.preventDefault();
        onFormValidate(e.target.name, e.target.value, true);
    };

    const formChange = (e) => {
        e.preventDefault();
        onFormChange(e.target.name, e.target.value);
    };

    return (
        <div className={styles.creditCardPayment}>
            {paymentApiActive && <div>
                <h2>Credit card details</h2>
                <p className={styles.acceptText}>We accept</p>

                <div className={styles.issuerContainer}>

                    <i className={styles.issuerVisa} aria-label="Visa"></i>

                    <i className={styles.issuerMastercard} aria-label="MasterCard"></i>

                    <i className={styles.issuerAmex} aria-label="Amex"></i>

                    <span className={styles.issuerSurcharge}>+ 3.06%</span>
                </div>

                <form autoComplete="on">
                    <div className={styles.cardNumberContainer}>

                        <label
                            htmlFor={constants.inputs.cardNumber}
                            className={styles.cardNumberLabel}>Card number
                        </label>

                        <input
                            type="number"
                            name={constants.inputs.cardNumber}
                            className={styles.cardNumberInput}
                            data-stripe="number"
                            onBlur={formValidation}
                            onChange={formChange}>
                        </input>

                        {!cardNumberValid && <div className={styles.cardPaymentError}>
                            {cardNumber === null || cardNumber === '' ? 'Required' : 'Invalid card number'}
                        </div>}
                    </div>

                    <div className={styles.expiryContainer}>

                        <label
                        htmlFor={constants.inputs.expiryDate}
                        className={styles.expiryLabel}>Expiry
                        </label>

                        <input
                            type="text"
                            name={constants.inputs.expiryDate}
                            placeholder="MM/YY"
                            data-stripe="exp"
                            className={styles.expiryInput}
                            onBlur={formValidation}
                            onChange={formChange}>
                        </input>

                        {!expiryValid && <div className={styles.cardPaymentError}>
                            {expiry === null || expiry === '' ? 'Required' : 'Invalid'}
                        </div>}
                    </div>

                    <div className={styles.securityCodeContainer}>

                        <label
                        htmlFor={constants.inputs.securityCode}
                        className={styles.securityCodeLabel}>CCV
                        </label>

                        <HelpIcon cardType={cardType} onToggle={onToggle} toggle={toggle} />

                        <input
                            type="number"
                            name={constants.inputs.securityCode}
                            maxLength="4"
                            autoComplete="off"
                            data-stripe="cvc"
                            className={styles.securityCodeInput}
                            onBlur={formValidation}
                            onChange={formChange}>
                        </input>

                        {!cvvValid && <div className={styles.cardPaymentError}>
                            {cvv === null || cvv === '' ? 'Required' : 'Invalid'}
                        </div>}
                    </div>
                </form>
            </div>
            }

            {!paymentApiActive && <div>
                <h2>Credit card payment is currently unavailable</h2>
                <div>You can either pay by invoice or come back later to pay by credit card.</div>
            </div>}
        </div>
    );
};

PaymentForm.propTypes = {
    paymentApiActive: React.PropTypes.element,
    onFormChange: React.PropTypes.element,
    onFormValidate: React.PropTypes.element,
    cardNumber: React.PropTypes.string,
    expiry: React.PropTypes.string,
    cvv: React.PropTypes.string,
    cardNumberValid: React.PropTypes.element,
    expiryValid: React.PropTypes.element,
    cvvValid: React.PropTypes.element,
    cardType: React.PropTypes.string,
    onToggle: React.PropTypes.element,
    toggle: React.PropTypes.boolean,
};

export default PaymentForm;
