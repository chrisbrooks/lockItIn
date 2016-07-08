import styles from './PaymentInfo.less';
import React from 'react';

const PaymentInfo = ({
    invoiceNumber,
    customerNumber,
    amount,
}) => (

    <div className={styles.paymentInfo}>
        <h2>Your Payment information</h2>
        <div className={styles.paymentInfoContainer}>
            <div className={styles.paymentInfoTitle}>Invoice number</div>
            <div className={styles.paymentInfoValue}>{invoiceNumber}</div>
        </div>
        <div className={styles.paymentInfoContainer}>
            <div className={styles.paymentInfoTitle}>Customer Number</div>
            <div className={styles.paymentInfoValue}>{customerNumber}</div>
        </div>
        <div className={styles.paymentInfoContainer}>
            <div className={styles.paymentInfoTitle}>Invoice Amount</div>
            <div className={styles.paymentInfoValue}><span>$</span> {amount}</div>
        </div>
        <div className={styles.paymentInfoTotalContainer}>
            <div className={styles.paymentInfoContainer}>
                <div className={styles.paymentInfoTitle}>Subtotal</div>
                <div className={styles.paymentInfoValue}><span>$</span> {amount}</div>
            </div>
            <div className={styles.paymentInfoContainer}>
                <div className={styles.paymentInfoTitle}>GST</div>
                <div className={styles.paymentInfoValue}><span>$</span> 300.00</div>
            </div>
            <div className={styles.paymentInfoContainer}>
                <div className={styles.paymentInfoTitle}>Total</div>
                <div className={styles.paymentInfoValue}><span>$</span> 800.00</div>
            </div>
        </div>
    </div>
);

PaymentInfo.propTypes = {
    invoiceNumber: React.PropTypes.string,
    customerNumber: React.PropTypes.number,
    amount: React.PropTypes.number,
};

export default PaymentInfo;
