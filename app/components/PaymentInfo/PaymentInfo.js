import styles from './paymentInfo.less';
import React from 'react';

const PaymentInfo = ({
    invoiceNumber,
    customerNumber,
    amount,
    surcharge,
    cardType,
}) => {

    const gst = amount * 10 / 100;
    const surCharge = (surcharge / 100) * amount;
    const total = gst + surCharge + Number(amount);

    return (
        <div className={styles.paymentInfo}>
            <h2>Your payment information</h2>
            <div className={styles.paymentInfoContainer}>
                <p className={styles.paymentInfoTitle}>Invoice number</p>
                <p className={styles.paymentInfoValue}>{invoiceNumber}</p>
            </div>
            <div className={styles.paymentInfoContainer}>
                <p className={styles.paymentInfoTitle}>Customer number</p>
                <p className={styles.paymentInfoValue}>{customerNumber}</p>
            </div>
            <div className={styles.paymentInfoContainer}>
                <p className={styles.paymentInfoTitle}>Invoice amount</p>
                <p className={styles.paymentInfoValue}><span>$</span> {amount}</p>
            </div>
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
    );
};

PaymentInfo.propTypes = {
    invoiceNumber: React.PropTypes.string,
    customerNumber: React.PropTypes.string,
    amount: React.PropTypes.string,
    surcharge: React.PropTypes.number,
    cardType: React.PropTypes.string,
};

export default PaymentInfo;
