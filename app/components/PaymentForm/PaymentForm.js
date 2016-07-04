import React from 'react';
import { PinkButton } from 'seek-style-guide/react';

const PaymentForm = ({ onFormSChange, onFormSubmit, invoiceNumber, amount, loading }) => {
    return (
        <form onSubmit={e => onFormSubmit(e)}>
            <div>
                <label htmlFor="invoice">Invoice number</label>
                <input type="text" id="invoice" value={invoiceNumber} onChange={onFormSChange} />
            </div>
            <div>
                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" value={amount} onChange={onFormSChange} />
            </div>
            <PinkButton type="submit"
                        disable={loading}>{loading ? 'Processing...' : 'Submit'}</PinkButton>
        </form>
    );
};

PaymentForm.propTypes = {
    onFormSubmit: React.PropTypes.func.isRequired,
    invoiceNumber: React.PropTypes.string,
    amount: React.PropTypes.number,
    loading: React.PropTypes.bool,
};

export default PaymentForm;
