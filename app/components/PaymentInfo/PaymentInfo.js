import styles from './PaymentInfo.less';
import React from 'react';

const PaymentInfo = ({
    invoiceNumber,
    customerNumber,
    amount,
    surcharge,
    surchargeName,
}) => {

    const gst = amount * 10 / 100;
    const surCharge = (surcharge / 100) * amount;
    const total = gst + surCharge + Number(amount);

    console.log(surcharge);
    console.log(invoiceNumber)

    return (
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
                    <div className={styles.paymentInfoValue}><span>$</span>{gst}</div>
                </div>
                { surcharge > 0 && <div className={styles.paymentInfoContainer} >
                    <div className={styles.paymentInfoTitle}>{surchargeName}</div>
                    <div className={styles.paymentInfoValue}><span>$</span>{surCharge}</div>
                </div> }
                <div className={styles.paymentInfoContainer}>
                    <div className={styles.paymentInfoTitle}>Total</div>
                    <div className={styles.paymentInfoValue}><span>$</span>{total}</div>
                </div>
            </div>
        </div>
    );
};

PaymentInfo.propTypes = {
    invoiceNumber: React.PropTypes.number,
    customerNumber: React.PropTypes.number,
    amount: React.PropTypes.number,
    surcharge: React.PropTypes.number,
    surchargeName: React.PropTypes.string,
};

export default PaymentInfo;
