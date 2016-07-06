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

    onFormChange() {
    }

    submitInput(amount, invoiceNumber, customerNumber) {
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
                    <PaymentForm
                        onFormChange={this.onFormChange}
                        onFormSubmit={this.onFormSubmit}
                        invoiceNumber={this.props.invoiceNumber}
                        amount={this.props.amount}
                        customerNumber={this.props.customerNumber}
                        loading={this.props.loading} />
                    <div className={styles.paymentButtonContainer}>
                        <input
                            type="submit"
                            value="Confirm payment"
                            className={styles.paymentButton} />
                    </div>
                </div>
                <Footer />
            </div>);
    }
}

App.propTypes = {
    actions: PropTypes.object,
    onFormSubmit: PropTypes.func.isRequired,
    customerNumber: PropTypes.string,
    invoiceNumber: PropTypes.string,
    amount: PropTypes.number,
    loading: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
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
