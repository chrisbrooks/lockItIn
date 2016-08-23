import styles from './paymentInfo.less';
import React from 'react';

const PaymentInfo = ({
    invoiceNumber,
    customerNumber,
    amount,
    gst,
    surcharge,
    cardType,
    }) => {

    let amountExclGst = (amount - gst).toFixed(2);
    let surchargeTotal = ((surcharge / 100) * amount).toFixed(2);
    let total = (Number(surchargeTotal) + Number(amount)).toFixed(2);

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
                <p className={styles.paymentInfoValue}><span>$</span> {amountExclGst}</p>
            </div>
            <div className={styles.paymentInfoTotalContainer}>
                <div className={styles.paymentInfoContainer}>
                    <p className={styles.paymentInfoTitle}>Subtotal</p>
                    <p className={styles.paymentInfoValue}><span>$</span> {amountExclGst}</p>
                </div>
                <div className={styles.paymentInfoContainer}>
                    <p className={styles.paymentInfoTitle}>GST</p>
                    <p className={styles.paymentInfoValue}><span>$</span>{gst}</p>
                </div>
                {surcharge > 0 && <div className={styles.paymentInfoContainer}>
                    <p className={styles.paymentInfoTitle} data-automation="paymentSurchargeTitle">{cardType}</p>
                    <p className={styles.paymentInfoValue} data-automation="paymentSurcharge"><span>$</span>{surchargeTotal}</p>
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
    gst: React.PropTypes.string,
    surcharge: React.PropTypes.number,
    cardType: React.PropTypes.string,
};

export default PaymentInfo;
