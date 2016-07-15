import styles from './PaymentForm.less';
import React from 'react';
import HelpIcon from '../HelpIcon/HelpIcon';

const PaymentForm = ({
    paymentApiActive,
    onFormChange,
    onFormValidate,
    cardNumber,
    expiry,
    cvv,
    cardNumberValid,
    expiryValid,
    cvvValid,
    cardType,
    onToggle,
    toggle,
    }) => {

    return (
        <div className={styles.creditCardPayment}>
            {paymentApiActive &&
            <div>
                <h2>Credit card details</h2>
                <p className={styles.acceptText}>We accept</p>

                <div className={styles.issuerContainer}>

                    <i className={styles.issuerVisa}
                       aria-label="visa">
                    </i>

                    <i className={styles.issuerMastercard}
                       aria-label="mastercard">
                    </i>

                    <i className={styles.issuerAmex}
                       aria-label="american express">
                    </i>

                    <span className={styles.issuerSurcharge}>+ 3.06%</span>
                </div>

                <form autocomplete="on">
                    <div className={styles.cardNumberContainer}>

                        <label for="CardNo" className={styles.cardNumberLabel}>Card number</label>

                        <input
                            type="number"
                            name="CardNumber"
                            className={styles.cardNumberInput}
                            data-stripe='number'
                            onBlur={(e)=> {e.preventDefault(); onFormValidate(e.target.name, e.target.value, true)}}
                            onChange={(e)=> {e.preventDefault(); onFormChange(e.target.name, e.target.value)}}>
                        </input>

                        {!cardNumberValid &&
                        <div className={styles.cardPaymentError}>
                            {cardNumber === null || cardNumber === '' ? 'Required' : 'Invalid card number'}
                        </div>
                        }
                    </div>

                    <div className={styles.expiryContainer}>
                        <label for="ExpiryDate" className={styles.expiryLabel}>Expiry</label>

                        <input type="text"
                               name="ExpiryDate"
                               placeholder="MM/YY"
                               data-stripe='exp'
                               className={styles.expiryInput}
                               onBlur={(e)=> {e.preventDefault(); onFormValidate(e.target.name, e.target.value, true)}}
                               onChange={(e)=> {e.preventDefault(); onFormChange(e.target.name, e.target.value)}}>
                        </input>

                        {!expiryValid &&
                        <div className={styles.cardPaymentError}>
                            {expiry === null || expiry === '' ? 'Required' : 'Invalid'}
                        </div>
                        }
                    </div>

                    <div className={styles.securityCodeContainer}>
                        <label for="SecurityCode" className={styles.securityCodeLabel}>CCV</label>

                        <HelpIcon cardType={cardType} onToggle={onToggle} toggle={toggle}/>

                        <input
                            type="number"
                            name="SecurityCode"
                            maxlength="4"
                            autocomplete="off"
                            data-stripe='cvc'
                            className={styles.securityCodeInput}
                            onBlur={(e)=> {e.preventDefault(); onFormValidate(e.target.name, e.target.value, true)}}
                            onChange={(e)=> {e.preventDefault(); onFormChange(e.target.name, e.target.value)}}>
                        </input>

                        {!cvvValid &&
                        <div className={styles.cardPaymentError}>
                            {cvv === null || cvv === '' ? 'Required' : 'Invalid'}
                        </div>
                        }
                    </div>
                </form>
            </div>
            }

            {!paymentApiActive &&
            <div>
                <h2 class="credit-card-payment__heading">Credit card payment is currently unavailable</h2>
                <div>You can either pay by invoice or come back later to pay by credit card.</div>
            </div>
            }
        </div>
    );
};

PaymentForm.propTypes = {
    cardNumber: React.PropTypes.number,
    cvv: React.PropTypes.number,
    expiry: React.PropTypes.number,
};

export default PaymentForm;
