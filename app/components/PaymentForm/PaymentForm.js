import styles from './paymentForm.less';
import React from 'react';
import MaskedInput from 'react-maskedinput';
import HelpIcon from '../helpIcon/helpIcon';
import * as constants from '../../constants';

const PaymentForm = ({
    paymentError,
    paymentErrorMessage,
    onFormChange,
    onFormValidate,
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

    { /* changes the mask format if the cardType is amex */ }
    const cardNumberLength = cardType === constants.cardType.AMEX ? '1111 111111 11111' : '1111 1111 1111 1111';
    const cvvLength = cardType === constants.cardType.AMEX ? '1111' : '111';

    { /* fade card if card cardNumber doesn't match cardType */ }
    const visaSelected = cardType !== constants.cardType.VISA && cardType !== '' ? styles.issuerOther : styles.issuerVisa;
    const masterCardSelected = cardType !== constants.cardType.MASTERCARD && cardType !== '' ? styles.issuerOther : styles.issuerMasterCard;
    const amexSelected = cardType !== constants.cardType.AMEX && cardType !== '' ? styles.issuerOther : styles.issuerAmex;

    return (
        <div className={styles.creditCardPayment}>
            {!paymentError && <div>
                <h2 className={styles.paymentHeader}>Credit card details</h2>
                <p className={styles.acceptText}>We accept</p>

                <div className={styles.issuerContainer}>

                    <i className={visaSelected} aria-label={constants.cardType.VISA}></i>
                    <i className={masterCardSelected} aria-label={constants.cardType.MASTERCARD}></i>
                    <i className={amexSelected} aria-label={constants.cardType.AMEX}></i>

                    <span className={styles.issuerSurcharge}>+ 3.06%</span>
                </div>

                <form autoComplete="on">
                    <div className={styles.cardNumberContainer}>

                        <label
                            htmlFor={constants.inputs.CARD_NUMBER}
                            className={styles.cardNumberLabel}>Card number
                        </label>
                        <MaskedInput
                            displayType="input"
                            mask={cardNumberLength}
                            placeholderChar="*"
                            placeholder=" "
                            name={constants.inputs.CARD_NUMBER}
                            className={styles.cardNumberInput}
                            data-stripe="number"
                            onBlur={formValidation}
                            onChange={formChange} />

                        {!cardNumberValid && cardNumberTouched && <div className={styles.cardPaymentError}>
                            {cardNumber === null || cardNumber === '' ? 'Required' : 'Invalid card number'}
                        </div>}
                    </div>

                    <div className={styles.expiryContainer}>

                        <label
                        htmlFor={constants.inputs.EXPIRY_DATE}
                        className={styles.expiryLabel}>Expiry
                        </label>

                        <MaskedInput
                            mask="11/11"
                            name={constants.inputs.EXPIRY_DATE}
                            placeholderChar="*"
                            placeholder="MM/YY"
                            data-stripe="exp"
                            className={styles.expiryInput}
                            onBlur={formValidation}
                            onChange={formChange} />

                        {!expiryValid && expiryTouched && <div className={styles.cardPaymentError}>
                            {expiry === null || expiry === '' ? 'Required' : 'Invalid'}
                        </div>}
                    </div>

                    <div className={styles.securityCodeContainer}>

                        <label
                        htmlFor={constants.inputs.SECURITY_CODE}
                        className={styles.securityCodeLabel}>CCV
                        </label>

                        <HelpIcon cardType={cardType} onToggle={onToggle} toggle={toggle} />

                        <MaskedInput
                            mask={cvvLength}
                            name={constants.inputs.SECURITY_CODE}
                            placeholderChar="*"
                            placeholder=" "
                            autoComplete="off"
                            data-stripe="cvc"
                            className={styles.securityCodeInput}
                            onBlur={formValidation}
                            onChange={formChange} />

                        {!cvvValid && cvvTouched && <div className={styles.cardPaymentError}>
                            {cvv === null || cvv === '' ? 'Required' : 'Invalid'}
                        </div>}
                    </div>


                </form>
            </div>}

            {paymentError && <div className={styles.paymentError}>
                <h2>{paymentErrorMessage}</h2>
                <p>Refresh the page to try again or come back later.</p>
            </div>}

        </div>
    );
};

PaymentForm.propTypes = {
    surcharge: React.PropTypes.number,
    paymentError: React.PropTypes.element,
    paymentErrorMessage: React.PropTypes.element,
    cardNumberTouched: React.PropTypes.element,
    expiryTouched: React.PropTypes.boolean,
    cvvTouched: React.PropTypes.boolean,
    onFormChange: React.PropTypes.element,
    onFormValidate: React.PropTypes.element,
    cardNumber: React.PropTypes.string,
    expiry: React.PropTypes.string,
    cvv: React.PropTypes.string,
    cardNumberValid: React.PropTypes.element,
    expiryValid: React.PropTypes.element,
    cvvValid: React.PropTypes.element,
    cardType: React.PropTypes.string,
    onToggle: React.PropTypes.boolean,
    toggle: React.PropTypes.boolean,
};

export default PaymentForm;
