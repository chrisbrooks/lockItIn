import React, { PropTypes } from 'react';
import styles from './App.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/paymentActions';
import Header from './Header/Header';
import PaymentInfo from './PaymentInfo/PaymentInfo';
import PaymentForm from './PaymentForm/PaymentForm';
const { stripePublishableKey } = require('webpack-config-loader!../../config.js');

class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        const query = props.location.query;
        this.props.actions.storeQuery(query);

        this.onCardNumberChange = this.onCardNumberChange.bind(this);
        this.onExpiryChange = this.onExpiryChange.bind(this);
        this.onCvvChange = this.onCvvChange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    componentDidMount(){
        Stripe.setPublishableKey(stripePublishableKey); // set your test public key
    }

    getSurcharge(cardNumber) {

        const cardIssuer = {
            MASTERCARD: {
                NAME: 'MasterCard',
                IS_TYPE: /^5[1-5]/, //starting with 51 - 55
                SURCHARGE_PERCENTAGE: 0
            },
            VISA: {
                NAME: 'Visa',
                IS_TYPE: /^4/, //starting with 4
                SURCHARGE_PERCENTAGE: 0
            },
            AMEX: {
                NAME: 'Amex',
                IS_TYPE: /^3[47]/, //starting with 34 or 37
                SURCHARGE_PERCENTAGE: 3.06
            },
            DINERS: {  //Used to show unsupported message
                NAME: 'Diners',
                IS_TYPE: /^3(?:0[0-5]|[68][0-9])/, //starting with 300 through 305, 36 or 38,
                SURCHARGE_PERCENTAGE: 0
            }
        };

        for(let prop in cardIssuer) {
            if (cardIssuer[prop].IS_TYPE && cardIssuer[prop].IS_TYPE.test(cardNumber)) {
                return {cardType: cardIssuer[prop].NAME, surcharge: cardIssuer[prop].SURCHARGE_PERCENTAGE}
            }
        }

        return {surcharge: 0, cardType: ''};
    }

    onCardNumberChange(value) {

        const surcharge = this.getSurcharge(value);

        this.props.actions.setSurcharge(surcharge);
        this.props.actions.setCardNumber(value);
    }

    onCvvChange(value) {
        this.props.actions.setCvv(value);
    }

    onExpiryChange(value) {

        const valLength = value.length;

        if(valLength === 2){
            let newInput = value;
            newInput += '/';

        }

        this.props.actions.setExpiry(value);
    }

    onSubmitForm() {
        const {cardType, cardNumber, cvv, expiry, amount} = this.props;
        this.props.actions.createToken(cardType, cardNumber, cvv, expiry, amount);
    }

    onHandleToggle() {
        console.log(this);
    }

    render() {

        return (
            <div>
                <Header />
                <div className={styles.pageContainer}>
                    <div className={styles.paymentFormContainer}>
                        <h1>Make a payment</h1>
                        <div className={styles.paymentFormInnerContainer}>
                            <PaymentInfo invoiceNumber={this.props.invoiceNumber} surcharge={this.props.surcharge} cardType={this.props.cardType} amount={this.props.amount} customerNumber={this.props.customerNumber} loading={this.props.loading} />
                            <PaymentForm onCardNumberChange={this.onCardNumberChange} onExpiryChange={this.onExpiryChange} onCvvChange={this.onCvvChange} onHandleToggle={this.onHandleToggle} cardType={this.props.cardType} />
                        </div>
                    </div>
                    <div className={styles.paymentButtonContainer}>
                        <button className={styles.paymentButton} onClick={this.onSubmitForm}>Confirm payment</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cvv: state.payment.cvv,
        expiry: state.payment.expiry,
        cardNumber: state.payment.cardNumber,
        cardType: state.payment.cardType,
        surcharge: state.payment.surcharge,
        customerNumber: state.payment.customerNumber,
        invoiceNumber: state.payment.invoiceNumber,
        amount: state.payment.amount,
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
