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
    }

    render() {

        return (
            <div>
                <Header />
                <div className={styles.pageContainer}>
                    <div className={styles.paymentFormContainer}>
                        <h1>Make a payment</h1>
                        <div className={styles.paymentFormInnerContainer}>
                            <PaymentInfo invoiceNumber={this.props.invoiceNumber} amount={this.props.amount} customerNumber={this.props.customerNumber} loading={this.props.loading} />
                            <PaymentForm onFormChange={this.onFormChange} onFormSubmit={this.onFormSubmit} invoiceNumber={this.props.invoiceNumber} amount={this.props.amount} customerNumber={this.props.customerNumber} loading={this.props.loading}/>
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
