import styles from './Footer.less';

import React from 'react';


const Footer = () => {
    return (
        <div className={styles.creditCardPayment}>

            {/*<h2>Credit card payment is currently unavailable</h2>
            <p>you can either pay by invoice or come back later to pay by credit card</p>*/}

            <h2>Credit card details</h2>

            <p>We accept</p>

            <div className={styles.issuerContainer}>
                <i className={styles.issuerVisa} aria-label="visa"></i>
                <i className={styles.issuerMastercard} aria-label="mastercard"></i>
                <i className={styles.issuerAmex} aria-label="american express"></i>
                <span className={styles.issuerSurcharge}>+ 3.06%</span>
            </div>

            <form autocomplete="on">
                <div className={styles.cardNumberContainer}>
                    <label for="CardNo" className={styles.cardNumberLabel}>Card number</label>
                    <input type="text" name="CardNo" className={styles.cardNumberInput}></input>
                    <div className={styles.cardPaymentError}>Required</div>
                </div>

                <div className={styles.expiryContainer}>
                    <label for="ExpiryDate" className={styles.expiryLabel}>Expiry</label>
                    <input type="text" name="ExpiryDate" placeholder="MM/YY" className={styles.expiryInput}></input>
                    <div className={styles.cardPaymentError}>Invalid</div>
                </div>

                <div className={styles.securityCodeContainer}>
                    <label for="SecurityCode" className={styles.securityCodeLabel}>CCV</label>
                    <input type="text" name="SecurityCode" maxlength="4" autocomplete="off" className={styles.securityCodeInput}></input>
                    <div className={styles.cardPaymentError}>Invalid</div>
                </div>
            </form>

        </div>
    );
};

export default Footer;
