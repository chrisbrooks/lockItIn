import styles from './paymentInfo.less';
import React from 'react';

const PaymentInfo = ({
    invoiceNumber,
    customerNumber,
    amount,
    surcharge,
    cardType,
}) => {

    let gst = amount * 10 / 100;
    let surCharge = (surcharge / 100) * Number(amount);
    let total = (gst + surCharge + Number(amount));

    gst = gst.toFixed(2);
    surCharge = surCharge.toFixed(2);
    total = total.toFixed(2);

    return (
        <div className={styles.paymentInfo}>
            <h2>Your payment information</h2>
            <div className={styles.paymentInfoContainer}>
                <p className={styles.paymentInfoTitle}>Invoice number</p>
                <p className={styles.paymentInfoValue} data-automation="paymentInvoiceNumber">{invoiceNumber}</p>
            </div>
            <div className={styles.paymentInfoContainer}>
                <p className={styles.paymentInfoTitle}>Customer number</p>
                <p className={styles.paymentInfoValue} data-automation="paymentCustomerNumber">{customerNumber}</p>
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
                {surcharge > 0 && <div className={styles.paymentInfoContainer}>
                    <p className={styles.paymentInfoTitle} data-automation="paymentSurchargeTitle">{cardType}</p>
                    <p className={styles.paymentInfoValue} data-automation="paymentSurcharge"><span>$</span>{surCharge}</p>
                </div>}
                <div className={styles.paymentInfoContainer}>
                    <p className={styles.paymentInfoTitle}>Total</p>
                    <p className={styles.paymentInfoValue} data-automation="paymentTotal"><span>$</span>{total}</p>
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
