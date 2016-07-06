import styles from './App.less';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/paymentActions';
import Header from './Header/Header';
import PaymentForm from './PaymentForm/PaymentForm';
import Footer from './Footer/Footer';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            amount: null,
            invoiceNumber: null,
            customerNumber: null,
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();

        this.submitInput(this.state.amount, this.state.invoiceNumber);
    }

    onFormChange(event) {
        //this.submitInput(this.state.amount, this.state.invoiceNumber);
    }

    submitInput(amount, invoiceNumber) {
        const payment = {
            amount,
            invoiceNumber,
            customerNumber,
        };

        this.props.actions.makePayment(payment);
    }

    render() {
        return (
            <div>
                <Header />
                <div className={styles.pageContainer}>
                    <div className={styles.paymentFormContainer}>
                        <h1>Make a payment</h1>
                        <div className={styles.paymentFormInnerContainer}>
                            <PaymentForm onFormChange={this.onFormChange} onFormSubmit={this.onFormSubmit} invoiceNumber={this.props.invoiceNumber} amount={this.props.amount} customerNumber={this.props.customerNumber} loading={this.props.loading} />
                            <Footer />
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
