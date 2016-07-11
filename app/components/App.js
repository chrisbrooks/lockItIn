import React, { PropTypes } from 'react';
import styles from './App.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/paymentActions';
import Header from './Header/Header';
import PaymentInfo from './PaymentInfo/PaymentInfo';
import PaymentForm from './PaymentForm/PaymentForm';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        const query = props.location.query;
        this.props.actions.storeQuery(query);

        this.onCardNumberChange = this.onCardNumberChange.bind(this);
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
                return {surchargeName: cardIssuer[prop].NAME, surcharge: cardIssuer[prop].SURCHARGE_PERCENTAGE}
            }
        }

        return {surcharge: 0, surchargeName: 'Surcharge'};
    }

    onCardNumberChange(value) {

        const surcharge = this.getSurcharge(value);

        this.props.actions.setSurcharge(surcharge);

    }

    /* onSubmitForm(cardNumber, cvv, expiry) {

        const {cardNumber, cvv, expiry} = this.props;

        this.props.actions.createToken(cardNumber, cvv, expiry);

     */

    render() {

        return (
            <div>
                <Header />
                <div className={styles.pageContainer}>
                    <div className={styles.paymentFormContainer}>
                        <h1>Make a payment</h1>
                        <div className={styles.paymentFormInnerContainer}>
                            <PaymentInfo invoiceNumber={this.props.invoiceNumber} surcharge={this.props.surcharge} surchargeName={this.props.surchargeName} amount={this.props.amount} customerNumber={this.props.customerNumber} loading={this.props.loading} />
                            <PaymentForm onCardNumberChange={this.onCardNumberChange} onFormSubmit={this.onFormSubmit} invoiceNumber={this.props.invoiceNumber} amount={this.props.amount} customerNumber={this.props.customerNumber} loading={this.props.loading}/>
                        </div>
                    </div>
                    <div className={styles.paymentButtonContainer}>
                        <input type="submit" value="Confirm payment" className={styles.paymentButton}></input>
                    </div>
                </div>
            </div>);
    }
}

function mapStateToProps(state) {
    return {
        surchargeName: state.payment.surchargeName,
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
