import styles from './paymentSuccess.less';
import React from 'react';

const PaymentSuccess = ({
    invoiceNumber,
    customerNumber,
    paymentRef,
    totalAmount,
    }) => {

    const print = () => {
        window.print();
    }

    return (
        <div className={styles.paymentSuccessPage}>
            <h1 className={styles.paymentSuccessHeader}>Thanks. Your payment was successful.</h1>
            <div className={styles.paymentSuccess}>
                <h2 className={styles.paymentSuccessSubHeader}>Your payment information</h2>
                <div className={styles.paymentSuccessContainer}>
                    <p className={styles.paymentSuccessTitle}>Invoice number</p>
                    <p className={styles.paymentSuccessValue}>{invoiceNumber}</p>
                </div>
                <div className={styles.paymentSuccessContainer}>
                    <p className={styles.paymentSuccessTitle}>Customer number</p>
                    <p className={styles.paymentSuccessValue}>{customerNumber}</p>
                </div>
                <div className={styles.paymentSuccessContainer}>
                    <p className={styles.paymentSuccessTitle}>Payment Reference</p>
                    <p className={styles.paymentSuccessValue}>{paymentRef}</p>
                </div>
                <div className={styles.paymentSuccessContainer}>
                    <p className={styles.paymentSuccessTitle}>Total Paid</p>
                    <p className={styles.paymentSuccessValue}>${totalAmount}</p>
                </div>
            </div>
            <p className={styles.paymentSuccessPrint}>Please <a onClick={print}>print this page</a> for your records</p>
            <p className={styles.paymentSuccessPrintMobile}>A receipt has been sent to the billing address associated with this invoice.</p>
        </div>
    );
};

PaymentSuccess.propTypes = {
    cardNumber: React.PropTypes.string,
    expiry: React.PropTypes.string,
    cvv: React.PropTypes.string,
    paymentRef: React.PropTypes.string,
    totalAmount: React.PropTypes.string,
};

export default PaymentSuccess;
