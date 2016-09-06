import styles from './paymentSuccess.less';
import React from 'react';

const PaymentSuccess = ({
    invoiceNumber,
    customerNumber,
    prn,
    totalAmount,
    }) => {

    const printPage = window.print;

    const date = () => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
            'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ];

        const today = new Date();
        const dd = today.getDate();
        const mm = monthNames[today.getMonth() + 1];
        const yyyy = today.getFullYear();

        return dd + ' ' + mm + ' ' + yyyy; // eslint-disable-line prefer-template
    };

    return (
        <div className={styles.paymentSuccessPage}>
            <div className={styles.paymentSuccessPageInner}>
                <h1 className={styles.paymentSuccessHeader}>Thanks. Your payment was successful.</h1>
                <div className={styles.paymentSuccess}>
                    <h2 className={styles.paymentSuccessSubHeader}>Your payment information</h2>
                    <div className={styles.paymentSuccessContainer}>
                        <p className={styles.paymentSuccessTitle}>Date</p>
                        <p className={styles.paymentSuccessValue} data-automation="paymentInvoiceDate">{date()}</p>
                    </div>
                    <div className={styles.paymentSuccessContainer}>
                        <p className={styles.paymentSuccessTitle}>Invoice number</p>
                        <p className={styles.paymentSuccessValue} data-automation="paymentInvoiceNumber">{invoiceNumber}</p>
                    </div>
                    <div className={styles.paymentSuccessContainer}>
                        <p className={styles.paymentSuccessTitle}>Customer number</p>
                        <p className={styles.paymentSuccessValue} data-automation="paymentCustomerNumber">{customerNumber}</p>
                    </div>
                    <div className={styles.paymentSuccessContainer}>
                        <p className={styles.paymentSuccessTitle}>Payment reference</p>
                        <p className={styles.paymentSuccessValue} data-automation="paymentReference">{prn}</p>
                    </div>
                    <div className={styles.paymentSuccessContainer}>
                        <p className={styles.paymentSuccessTitle}>Total paid</p>
                        <p className={styles.paymentSuccessValue} data-automation="paymentAmount">${totalAmount}</p>
                    </div>
                </div>
                <p className={styles.paymentSuccessPrint}>Please <a onClick={printPage}>print this page</a> for your records</p>
                <p className={styles.paymentSuccessPrintMobile}>A receipt has been sent to the billing address associated with this invoice.</p>
            </div>
        </div>
    );
};

PaymentSuccess.propTypes = {
    cardNumber: React.PropTypes.string,
    expiry: React.PropTypes.string,
    cvv: React.PropTypes.string,
    customerNumber: React.PropTypes.string,
    invoiceNumber: React.PropTypes.string,
    prn: React.PropTypes.string,
    totalAmount: React.PropTypes.string,
};

export default PaymentSuccess;
