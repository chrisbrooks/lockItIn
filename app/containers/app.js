import React, { PropTypes } from 'react';
import styles from './app.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Spinner from 'react-spin';
import * as constants from '../constants';
import * as actions from '../actions/actions';
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

    getInitialAmounts(value) {

    }

    getTotalAmount(value) {

        const { amount } = this.props;

        const surChargeObject = this.getSurcharge(value);
        const surcharge = surChargeObject.surcharge;

        const gst = amount * 10 / 100;
        const surChargeTotal = (surcharge / 100) * amount;
        const total = gst + surChargeTotal + Number(amount);

        return total
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
        if(this.props.toggle) {
            this.props.actions.setToggle(false);
        } else {
            this.props.actions.setToggle(true);
        }
    }

    render() {

        const spinConfig = {
            lines: 5,
            length: 0,
            width: 7,
            radius: 7,
            color: '#fff',
            left: '-30px',
            className: 'spinner',
            position: 'relative',
            top: '21px',
        }

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
                                    paymentError={this.props.paymentError}
                                />

                                <PaymentForm
                                    customerNumber={this.props.customerNumber}
                                    invoiceNumber={this.props.invoiceNumber}
                                    amount={this.props.amount}
                                    surcharge={this.props.surcharge}
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

                        {!this.props.paymentError && <div className={styles.paymentButtonContainer}>
                            {!this.props.loading && <button className={styles.paymentButton} onClick={this.onSubmitForm}>
                                Confirm Payment
                            </button>}
                            {this.props.loading && <button className={styles.paymentButtonProccessing} onClick={this.onSubmitForm}>
                                <Spinner config={spinConfig}></Spinner>
                                Proccessing
                            </button>}
                        </div>}
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
        loading: state.actions.loading,
        actionsSuccess: state.actions.actionsSuccess,
        actionsError: state.actions.actionsError,
        actionsErrorMessage: state.actions.actionsErrorMessage,
        customerNumber: state.actions.customerNumber,
        invoiceNumber: state.actions.invoiceNumber,
        amount: state.actions.amount,
        totalAmount: state.actions.totalAmount,
        surcharge: state.actions.surcharge,
        cardNumber: state.actions.cardNumber,
        expiry: state.actions.expiry,
        cvv: state.actions.cvv,
        actionsRef: state.actions.actionsRef,
        formTouched: state.actions.formTouched,
        cardNumberValid: state.actions.cardNumberValid,
        cardNumberTouched: state.actions.cardNumberTouched,
        expiryValid: state.actions.expiryValid,
        expiryTouched: state.actions.expiryTouched,
        cvvValid: state.actions.cvvValid,
        cvvTouched: state.actions.cvvTouched,
        cardType: state.actions.cardType,
        toggle: state.actions.toggle,
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
