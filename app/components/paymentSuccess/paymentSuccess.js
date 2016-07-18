import styles from './paymentSuccess.less';
import React from 'react';

const PaymentSuccess = ({
    invoiceNumber,
    customerNumber,
    paymentRef,
    totalAmount,
    }) => {

    return (
        <div className={styles.paymentSuccessContainer}>
            <h1>Thanks. Your payment was successful.</h1>
            <div className={styles.paymentInfo}>

                <h2>Your payment information</h2>
                <div className={styles.paymentInfoContainer}>
                    <div className={styles.paymentInfoTitle}>Invoice number</div>
                    <div className={styles.paymentInfoValue}>{invoiceNumber}</div>
                </div>
                <div className={styles.paymentInfoContainer}>
                    <div className={styles.paymentInfoTitle}>Customer number</div>
                    <div className={styles.paymentInfoValue}>{customerNumber}</div>
                </div>
                <div className={styles.paymentInfoContainer}>
                    <div className={styles.paymentInfoTitle}>Payment Reference</div>
                    <div className={styles.paymentInfoValue}>{paymentRef}</div>
                </div>
                <div className={styles.paymentInfoContainer}>
                    <div className={styles.paymentInfoTitle}>Total Paid</div>
                    <div className={styles.paymentInfoValue}>${totalAmount}</div>
                </div>
            </div>
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
