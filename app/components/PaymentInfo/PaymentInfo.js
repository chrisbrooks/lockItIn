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
                <div className={styles.paymentInfoTitle}>Invoice number</div>
                <div className={styles.paymentInfoValue}>{invoiceNumber}</div>
            </div>
            <div className={styles.paymentInfoContainer}>
                <div className={styles.paymentInfoTitle}>Customer number</div>
                <div className={styles.paymentInfoValue}>{customerNumber}</div>
            </div>
            <div className={styles.paymentInfoContainer}>
                <div className={styles.paymentInfoTitle}>Invoice amount</div>
                <div className={styles.paymentInfoValue}><span>$</span> {amount}</div>
            </div>
            <div className={styles.paymentInfoTotalContainer}>
                <div className={styles.paymentInfoContainer}>
                    <div className={styles.paymentInfoTitle}>Subtotal</div>
                    <div className={styles.paymentInfoValue}><span>$</span> {amount}</div>
                </div>
                <div className={styles.paymentInfoContainer}>
                    <div className={styles.paymentInfoTitle}>GST</div>
                    <div className={styles.paymentInfoValue}><span>$</span>{gst}</div>
                </div>
                {surcharge > 0 && <div className={styles.paymentInfoContainer} >
                    <div className={styles.paymentInfoTitle}>{cardType}</div>
                    <div className={styles.paymentInfoValue}><span>$</span>{surCharge}</div>
                </div>}
                <div className={styles.paymentInfoContainer}>
                    <div className={styles.paymentInfoTitle}>Total</div>
                    <div className={styles.paymentInfoValue}><span>$</span>{total}</div>
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
