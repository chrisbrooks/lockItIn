import React, { PropTypes } from 'react';
import styles from './app.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as constants from '../constants';
import * as actions from '../actions/paymentFormActions';
import Header from '../components/header/header';
import PaymentInfo from '../components/paymentInfo/paymentInfo';
import PaymentForm from '../components/paymentForm/paymentForm';
import PaymentSuccess from '../components/paymentSuccess/paymentSuccess';
const { stripePublishableKey } = require('webpack-config-loader!../../config.js');

class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        const query = props.location.query;
        this.props.actions.urlQuery(query);


        this.onFormChange = this.onFormChange.bind(this);
        this.onFormValidate = this.onFormValidate.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onToggle = this.onToggle.bind(this);
    }

    componentDidMount(){

        const {
            paymentUrl
            } = require('webpack-config-loader!../../config.js');

        axios.get(paymentUrl + '/health').then(function(response){
            if(response === 'OK') {
                this.props.actions.paymentApiActive(true);
            }
        });

        Stripe.setPublishableKey(stripePublishableKey); // set your test public key
    }

    getSurcharge(cardNumber) {

        const cardIssuer = {
            mastercard: {
                name: 'MasterCard',
                is_type: /^5[1-5]/, //starting with 51 - 55
                surcharge_percentage: 0
            },
            visa: {
                name: 'Visa',
                is_type: /^4/, //starting with 4
                surcharge_percentage: 0
            },
            amex: {
                name: 'Amex',
                is_type: /^3[47]/, //starting with 34 or 37
                surcharge_percentage: 3.06
            },
            diners: {
                name: 'Diners',
                isType: /^3(?:0[0-5]|[68][0-9])/, //starting with 300 through 305, 36 or 38,
                surcharge_percentage: 0
            }
        };

        for(let prop in cardIssuer) {
            if (cardIssuer[prop].is_type && cardIssuer[prop].is_type.test(cardNumber)) {
                return { cardType: cardIssuer[prop].name, surcharge: cardIssuer[prop].surcharge_percentage }
            }
        }

        return {surcharge: 0, cardType: ''};
    }

    getTotalAmount(value) {

        const { amount } = this.props;

        const surChargeObject = this.getSurcharge(value);
        const surcharge = surChargeObject.surcharge;

        const gst = amount * 10 / 100;
        const surChargeTotal = (surcharge / 100) * amount;
        const total = gst + surChargeTotal + Number(amount);

        return total;
    }

    onFormChange(name, value) {

        if (name === constants.inputs.CARD_NUMBER) {
            const surcharge = this.getSurcharge(value);
            this.props.actions.setSurcharge(surcharge);
            this.props.actions.setCardNumber(value);
        }

        if (name === constants.inputs.EXPIRY_DATE) {
            this.props.actions.setExpiry(value);
        }

        if (name === constants.inputs.SECURITY_CODE) {
            this.props.actions.setCvv(value);
        }

        const totalAmount = this.getTotalAmount(value);
        this.props.actions.setTotalAmount(totalAmount);
    }

    onFormValidate(name, value, active) {

        this.props.actions.setFormTouched(active);

        if (name === constants.inputs.CARD_NUMBER) {
            const cardValidate = Stripe.card.validateCardNumber(value);
            this.props.actions.setCardNumberValid({ 'cardNumberValid': cardValidate, 'cardNumberTouched' : active });
        }

        if (name === constants.inputs.EXPIRY_DATE) {
            const expiryValidate = Stripe.card.validateExpiry(value);
            this.props.actions.setExpiryValid({ 'expiryValid' : expiryValidate, 'expiryTouched' : active });
        }

        if (name === constants.inputs.SECURITY_CODE) {
            const cvvValidate = Stripe.card.validateCVC(value);
            this.props.actions.setCvvValid({ 'cvvValid': cvvValidate, 'cvvTouched': active });
        }
    }

    onSubmitForm() {
        const { cardType, cardNumber, cvv, expiry, totalAmount, cardNumberValid, expiryValid, cvvValid, cardNumberTouched, expiryTouched, cvvTouched } = this.props;
        const checkFormValidation = [cardNumberValid, expiryValid, cvvValid, cardNumberTouched, expiryTouched, cvvTouched];

        const formIsValid = checkFormValidation.every( function(e) {
            return e === true
        });

        if(!formIsValid) {
            this.props.actions.setCardNumberValid({ 'cardNumberValid': false, 'cardNumberTouched' : true });
            this.props.actions.setExpiryValid({ 'expiryValid' : false, 'expiryTouched' : true });
            this.props.actions.setCvvValid({ 'cvvValid': false, 'cvvTouched': true });
        }

        if(formIsValid) {
            this.props.actions.createToken(cardType, cardNumber, cvv, expiry, totalAmount)
        }
    }

    onToggle() {
        this.props.toggle ? this.props.actions.setToggle(false) : this.props.actions.setToggle(true);
    }

    render() {

        return (
            <div>
                <Header />
                <div className={styles.pageContainer}>
                    {!this.props.paymentSuccess && <div>
                        <div className={styles.paymentFormContainer}>
                            <h1>Make a payment</h1>
                            <div className={styles.paymentFormInnerContainer}>
                                <PaymentInfo
                                    customerNumber={this.props.customerNumber}
                                    invoiceNumber={this.props.invoiceNumber}
                                    amount={this.props.amount}
                                    surcharge={this.props.surcharge}
                                    cardType={this.props.cardType}
                                />

                                <PaymentForm
                                    paymentApiActive={this.props.paymentApiActive}
                                    paymentError={this.props.paymentError}
                                    paymentErrorMessage={this.props.paymentErrorMessage}
                                    onFormChange={this.onFormChange}
                                    onFormValidate={this.onFormValidate}
                                    cardNumber={this.props.cardNumber}
                                    expiry={this.props.expiry}
                                    cvv={this.props.cvv}
                                    cardNumberValid={this.props.cardNumberValid}
                                    cardNumberTouched={this.props.cardNumberTouched}
                                    expiryValid={this.props.expiryValid}
                                    expiryTouched={this.props.expiryTouched}
                                    cvvValid={this.props.cvvValid}
                                    cvvTouched={this.props.cvvTouched}
                                    cardType={this.props.cardType}
                                    toggle={this.props.toggle}
                                    onToggle={this.onToggle}
                                />
                            </div>
                        </div>

                        <div className={styles.paymentButtonContainer}>
                            <button className={styles.paymentButton} onClick={this.onSubmitForm}>Confirm payment</button>
                        </div>
                    </div>}

                    {this.props.paymentSuccess &&
                    <PaymentSuccess
                        customerNumber={this.props.customerNumber}
                        invoiceNumber={this.props.invoiceNumber}
                        paymentRef={this.props.paymentRef}
                        totalAmount={this.props.totalAmount}>
                    </PaymentSuccess>}

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        paymentApiActive: state.payment.paymentApiActive,
        paymentSuccess: state.payment.paymentSuccess,
        paymentError: state.payment.paymentError,
        paymentErrorMessage: state.payment.paymentErrorMessage,
        customerNumber: state.payment.customerNumber,
        invoiceNumber: state.payment.invoiceNumber,
        amount: state.payment.amount,
        totalAmount: state.payment.totalAmount,
        surcharge: state.payment.surcharge,
        cardNumber: state.payment.cardNumber,
        expiry: state.payment.expiry,
        cvv: state.payment.cvv,
        paymentRef: state.payment.paymentRef,
        formTouched: state.payment.formTouched,
        cardNumberValid: state.payment.cardNumberValid,
        cardNumberTouched: state.payment.cardNumberTouched,
        expiryValid: state.payment.expiryValid,
        expiryTouched: state.payment.expiryTouched,
        cvvValid: state.payment.cvvValid,
        cvvTouched: state.payment.cvvTouched,
        cardType: state.payment.cardType,
        toggle: state.payment.toggle,
        loading: state.ajaxCallsInProgress,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
