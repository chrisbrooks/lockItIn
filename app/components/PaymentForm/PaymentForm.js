import styles from './PaymentForm.less';
import React from 'react';
import HelpIcon from '../HelpIcon/HelpIcon';

const PaymentForm = ({
    onCardNumberChange,
    onExpiryChange,
    onCvvChange,
    onHandleToggle,
    cardType,
    }) => {

    return (
        <div className={styles.creditCardPayment}>
            <h2>Credit card details</h2>

            <p className={styles.acceptText}>We accept</p>

            <div className={styles.issuerContainer}>
                <i className={styles.issuerVisa} aria-label="visa"></i>
                <i className={styles.issuerMastercard} aria-label="mastercard"></i>
                <i className={styles.issuerAmex} aria-label="american express"></i>
                <span className={styles.issuerSurcharge}>+ 3.06%</span>
            </div>

            <form autocomplete="on">
                <div className={styles.cardNumberContainer}>
                    <label for="CardNo" className={styles.cardNumberLabel}>Card number</label>
                    <input type="number" name="CardNo" className={styles.cardNumberInput} data-stripe='number' onChange={(e)=> {e.preventDefault(); onCardNumberChange(e.target.value)}}></input>
                    <div className={styles.cardPaymentError}>Required</div>
                </div>

                <div className={styles.expiryContainer}>
                    <label for="ExpiryDate" className={styles.expiryLabel}>Expiry</label>
                    <input type="text" name="ExpiryDate" placeholder="MM/YY" data-stripe='exp' className={styles.expiryInput} onChange={(e)=> {e.preventDefault(); onExpiryChange(e.target.value)}}></input>
                    <div className={styles.cardPaymentError}>Invalid</div>
                </div>

                <div className={styles.securityCodeContainer}>
                    <label for="SecurityCode" className={styles.securityCodeLabel}>CCV</label><HelpIcon cardType={cardType} onHandleToggle={onHandleToggle} />
                    <input type="number" name="SecurityCode" maxlength="4" autocomplete="off" data-stripe='cvc' className={styles.securityCodeInput} onChange={(e)=> {e.preventDefault(); onCvvChange(e.target.value)}}></input>
                    <div className={styles.cardPaymentError}>Invalid</div>
                </div>
            </form>

        </div>
    );
};

PaymentForm.propTypes = {
    cardNumber: React.PropTypes.number,
    cvv: React.PropTypes.number,
    expiry: React.PropTypes.number,
};

export default PaymentForm;
