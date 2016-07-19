import styles from './paymentForm.less';
import React from 'react';
import classNames from 'classnames';
import HelpIcon from '../helpIcon/helpIcon';
import * as constants from '../../constants';

const PaymentForm = ({
    amount,
    surcharge,
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

    const gst = amount * 10 / 100;
    const surCharge = (surcharge / 100) * amount;
    const total = gst + surCharge + Number(amount);

    return (
        <div className={styles.creditCardPayment}>
            {!paymentError && <div>
                <h2 className={styles.paymentHeader}>Credit card details</h2>
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
                            htmlFor={constants.inputs.CARD_NUMBER}
                            className={styles.cardNumberLabel}>Card number
                        </label>

                        <input
                            type="number"
                            name={constants.inputs.CARD_NUMBER}
                            className={styles.cardNumberInput}
                            data-stripe="number"
                            onBlur={formValidation}
                            onChange={formChange}>
                        </input>

                        {!cardNumberValid && cardNumberTouched && <div className={styles.cardPaymentError}>
                            {cardNumber === null || cardNumber === '' ? 'Required' : 'Invalid card number'}
                        </div>}
                    </div>

                    <div className={styles.expiryContainer}>

                        <label
                        htmlFor={constants.inputs.EXPIRY_DATE}
                        className={styles.expiryLabel}>Expiry
                        </label>

                        <input
                            type="text"
                            name={constants.inputs.EXPIRY_DATE}
                            placeholder="MM/YY"
                            data-stripe="exp"
                            className={styles.expiryInput}
                            onBlur={formValidation}
                            onChange={formChange}>
                        </input>

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

                        <input
                            type="number"
                            name={constants.inputs.SECURITY_CODE}
                            maxLength="4"
                            autoComplete="off"
                            data-stripe="cvc"
                            className={styles.securityCodeInput}
                            onBlur={formValidation}
                            onChange={formChange}>
                        </input>

                        {!cvvValid && cvvTouched && <div className={styles.cardPaymentError}>
                            {cvv === null || cvv === '' ? 'Required' : 'Invalid'}
                        </div>}
                    </div>


                </form>
            </div>}

            {paymentError && <div>
                <h2>{paymentErrorMessage}</h2>
                <p>Refresh the page to try again or come back later.</p>
            </div>}

            <div className={styles.paymentInfo}>
                <div className={styles.paymentInfoTotalContainer}>
                    <div className={styles.paymentInfoContainer}>
                        <p className={styles.paymentInfoTitle}>Subtotal</p>
                        <p className={styles.paymentInfoValue}><span>$</span> {amount}</p>
                    </div>
                    <div className={styles.paymentInfoContainer}>
                        <p className={styles.paymentInfoTitle}>GST</p>
                        <p className={styles.paymentInfoValue}><span>$</span>{gst}</p>
                    </div>
                    {surcharge > 0 && <div className={styles.paymentInfoContainer} >
                        <p className={styles.paymentInfoTitle}>{cardType}</p>
                        <p className={styles.paymentInfoValue}><span>$</span>{surCharge}</p>
                    </div>}
                    <div className={styles.paymentInfoContainer}>
                        <p className={styles.paymentInfoTitle}>Total</p>
                        <p className={styles.paymentInfoValue}><span>$</span>{total}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

PaymentForm.propTypes = {
    amount: React.PropTypes.string,
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
