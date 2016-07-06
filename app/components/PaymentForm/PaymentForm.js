import styles from './PaymentForm.less';
import React from 'react';

const PaymentForm = ({
    onFormChange,
    onFormSubmit,
    customerNumber,
    invoiceNumber,
    amount,
    loading,
}) => (
    <div className={styles.paymentForm}>
        <h2>Your Payment information</h2>
        <form onSubmit={e => onFormSubmit(e)}>
            <div className={styles.formFieldContainer}>
                <label htmlFor="invoice">Invoice number</label>
                <input
                    type="number"
                    id="invoice"
                    value="34234234234324"
                    onChange={onFormChange}
                    readOnly />
            </div>
            <div className={styles.formFieldContainer}>
                <label htmlFor="amount">Customer Number</label>
                <input
                    type="number"
                    id="amount"
                    value="34234234234324"
                    onChange={onFormChange}
                    readOnly />
            </div>
            <div className={styles.formFieldContainer}>
                <label htmlFor="amount">Invoice Amount</label>
                <input
                    type="number"
                    id="amount"
                    value="263.00"
                    onChange={onFormChange}
                    readOnly />
            </div>
            <div className={styles.formTotalContainer}>
                <div className={styles.formFieldContainer}>
                    <label htmlFor="amount">Subtotal</label>
                    <input
                        type="number"
                        id="amount"
                        value="263.00"
                        onChange={onFormChange}
                        readOnly />
                </div>
                <div className={styles.formFieldContainer}>
                    <label htmlFor="amount">GST</label>
                    <input
                        type="number"
                        id="amount"
                        value="26.30"
                        onChange={onFormChange}
                        readOnly />
                </div>
                <div className={styles.formFieldContainer}>
                    <label htmlFor="amount">Total</label>
                    <input
                        type="number"
                        id="amount"
                        value="289.30"
                        onChange={onFormChange}
                        readOnly />
                </div>
            </div>
        </form>
    </div>
);

PaymentForm.propTypes = {
    onFormChange: React.PropTypes.func.isRequired,
    onFormSubmit: React.PropTypes.func.isRequired,
    customerNumber: React.PropTypes.string,
    invoiceNumber: React.PropTypes.string,
    amount: React.PropTypes.number,
    loading: React.PropTypes.bool,
};

export default PaymentForm;
