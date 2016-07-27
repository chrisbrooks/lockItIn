import React, { PropTypes } from 'react';
import styles from './app.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-spin';
import base64 from 'base-64';
import queryString from 'query-string';
import * as constants from '../constants';
import * as actions from '../actions/actions';
import * as paymentActions from '../actions/paymentActions';
import * as validationActions from '../actions/validationActions';
import * as cardActions from '../actions/cardActions';
import * as urlQueryActions from '../actions/urlQueryActions';
import * as countryActions from '../actions/countryActions';
import Header from '../components/header/header';
import PaymentInfo from '../components/paymentInfo/paymentInfo';
import PaymentForm from '../components/paymentForm/paymentForm';
import PaymentSuccess from '../components/paymentSuccess/paymentSuccess';
const { stripeAuPublishableKey, stripeNzPublishableKey } = require('webpack-config-loader!../../config.js');

class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        const url = "http://localhost:3000?Y3VzdG9tZXJudW1iZXI9MjM0MjM0JmFtb3VudD01MDAma" +
        "W52b2ljZW51bWJlcj0zMzI0MzI0MzQmcHJuPWZmZjIzMjMyMyZlbWFpbD1jaHJpc0BnbWFpbC5jb20mY29tLmF1";

        { /* var url = window.location.href; */ }
        const parameters = url.substring(url.indexOf('?') + 1);

        const base64Decode = base64.decode(parameters);
        const decodedParameters = queryString.parse(base64Decode);

        { /* const decodedParameters = props.location.query; */ }

        this.props.urlQueryActions.setUrlQuery(decodedParameters);

        if (/com.au/.test(window.location.href)) {
            this.props.countryActions.setLocation(constants.location.AU);
            Stripe.setPublishableKey(stripeAuPublishableKey); // eslint-disable-line no-undef

        } else {
            this.props.countryActions.setLocation(constants.location.NZ);
            Stripe.setPublishableKey(stripeNzPublishableKey); // eslint-disable-line no-undef
        }

        this.onFormChange = this.onFormChange.bind(this);
        this.onFormBlur = this.onFormBlur.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onToggle = this.onToggle.bind(this);
    }

    onFormChange(name, value) {

        switch (name) {
            case constants.inputs.CARD_NUMBER: {
                const surcharge = this.getSurcharge(value);
                this.props.actions.setSurcharge(surcharge);
                this.props.cardActions.setCardNumber(value);
                break;
            }

            case constants.inputs.EXPIRY_DATE: {
                this.props.cardActions.setExpiry(value);
                break;
            }

            case constants.inputs.SECURITY_CODE: {
                this.props.cardActions.setCvv(value);
                break;
            }

            default: {
                break;
            }
        }

        const total = this.getTotalAmount(value);
        this.props.actions.setTotalAmount(total);
    }

    onFormBlur(name, value, active) {

        switch (name) {

            case constants.inputs.CARD_NUMBER: {
                const cardValidate = Stripe.card.validateCardNumber(value); // eslint-disable-line no-undef
                this.props.validationActions.setCardNumberValid({ cardNumberValid: cardValidate, cardNumberTouched: active });
                break;
            }

            case constants.inputs.EXPIRY_DATE: {
                const expiryValidate = Stripe.card.validateExpiry(value); // eslint-disable-line no-undef
                this.props.validationActions.setExpiryValid({ expiryValid: expiryValidate, expiryTouched: active });
                break;
            }

            case constants.inputs.SECURITY_CODE: {
                const cvvValidate = Stripe.card.validateCVC(value); // eslint-disable-line no-undef
                this.props.validationActions.setCvvValid({ cvvValid: cvvValidate, cvvTouched: active });
                break;
            }

            default: {
                break;
            }
        }
    }

    onSubmitForm() {

        const formIsValid = this.validateForm();
        const { location, email, prn, cardNumber, cvv, expiry, totalAmount } = this.props;

        if (formIsValid) {
            this.props.paymentActions.createStripeToken(location, email, prn, cardNumber, cvv, expiry, totalAmount);
        }
    }

    onToggle() {

        if (this.props.toggle) {
            this.props.actions.setToggle(false);
        } else {
            this.props.actions.setToggle(true);
        }
    }

    getSurcharge(cardNumber) {

        const cardIssuers = {
            mastercard: {
                name: constants.cardType.MASTERCARD,
                is_type: /^5[1-5]/,
                surcharge_percentage: 0,
            },
            visa: {
                name: constants.cardType.VISA,
                is_type: /^4/,
                surcharge_percentage: 0,
            },
            amex: {
                name: constants.cardType.AMEX,
                is_type: /^3[47]/,
                surcharge_percentage: 3.06,
            },
            diners: {
                name: constants.cardType.DINERS,
                isType: /^3(?:0[0-5]|[68][0-9])/,
                surcharge_percentage: 0,
            },
        };

        for (const issuer of Object.entries(cardIssuers)) {
            if (issuer.is_type && issuer.is_type.test(cardNumber)) {
                return { cardType: issuer.name, surcharge: issuer.surcharge_percentage };
            }
        }

        return { surcharge: 0, cardType: '' };
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

    validateForm() {
        const {
            cardNumberValid,
            expiryValid,
            cvvValid,
            cardNumberTouched,
            expiryTouched,
            cvvTouched,
        } = this.props;

        const checkFormValidation = [
            cardNumberValid,
            expiryValid,
            cvvValid,
            cardNumberTouched,
            expiryTouched,
            cvvTouched,
        ];

        const formIsValid = checkFormValidation.every(e => e === true);

        if (!cardNumberValid) {
            this.props.validationActions.setCardNumberValid({ cardNumberValid: false, cardNumberTouched: true });
        }

        if (!expiryValid) {
            this.props.validationActions.setExpiryValid({ expiryValid: false, expiryTouched: true });
        }

        if (!cvvValid) {
            this.props.validationActions.setCvvValid({ cvvValid: false, cvvTouched: true });
        }

        return formIsValid;
    }

    render() {

        return (

            <div>

                <Header location={this.props.location} />

                <div className={styles.pageContainer}>

                    {!this.props.paymentSuccess &&

                        <div>

                            <div className={styles.paymentFormContainer}>

                                <h1>Make a payment</h1>

                                <div className={styles.paymentFormInnerContainer}>

                                    <PaymentForm
                                        paymentError={this.props.paymentError}
                                        paymentErrorMessage={this.props.paymentErrorMessage}
                                        onFormChange={this.onFormChange}
                                        onFormBlur={this.onFormBlur}
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

                                    <PaymentInfo
                                        customerNumber={this.props.customerNumber}
                                        invoiceNumber={this.props.invoiceNumber}
                                        amount={this.props.amount}
                                        surcharge={this.props.surcharge}
                                        cardType={this.props.cardType}
                                    />

                                </div>

                            </div>

                            {!this.props.paymentError &&

                                <div className={styles.paymentButtonContainer}>

                                {!this.props.loading &&

                                    <button className={styles.paymentButton} onClick={this.onSubmitForm}>
                                        Confirm Payment
                                    </button>
                                }

                                {this.props.loading &&

                                    <button className={styles.paymentButtonProccessing} onClick={this.onSubmitForm}>
                                        <Spinner
                                            config={{
                                                lines: 5,
                                                length: 0,
                                                width: 7,
                                                radius: 7,
                                                color: '#fff',
                                                left: '-30px',
                                                className: 'spinner',
                                                position: 'relative',
                                                top: '21px',
                                            }}
                                        />
                                        Processing
                                    </button>
                                }

                                </div>
                            }

                        </div>
                    }

                    {this.props.paymentSuccess &&

                        <PaymentSuccess
                        customerNumber={this.props.customerNumber}
                        invoiceNumber={this.props.invoiceNumber}
                        paymentRef={this.props.paymentRef}
                        totalAmount={this.props.totalAmount}
                        />
                    }

                </div>

            </div>
        );
    }
}

App.propTypes = {
    email: PropTypes.string,
    prn: PropTypes.string,
    surcharge: PropTypes.number,
    paymentError: PropTypes.bool,
    paymentErrorMessage: PropTypes.string,
    paymentSuccess: PropTypes.bool,
    cardNumberTouched: PropTypes.bool,
    expiryTouched: PropTypes.bool,
    cvvTouched: PropTypes.bool,
    onFormChange: PropTypes.func,
    onFormBlur: PropTypes.func,
    cardNumber: PropTypes.string,
    expiry: PropTypes.string,
    cvv: PropTypes.string,
    cardNumberValid: PropTypes.bool,
    expiryValid: PropTypes.bool,
    cvvValid: PropTypes.bool,
    cardType: PropTypes.string,
    onToggle: PropTypes.func,
    toggle: PropTypes.bool,
    invoiceNumber: PropTypes.string,
    customerNumber: PropTypes.string,
    amount: PropTypes.string,
    totalAmount: PropTypes.number,
    loading: PropTypes.bool,
    paymentRef: PropTypes.string,
    setToggle: PropTypes.func,
    location: PropTypes.string,

    // Action creators
    paymentActions: PropTypes.shape({
        createStripeToken: PropTypes.func,
    }),
    countryActions: PropTypes.shape({
        setLocation: PropTypes.func,
    }),
    actions: PropTypes.shape({
        setToggle: PropTypes.func,
        setSurcharge: PropTypes.func,
        setTotalAmount: PropTypes.func,
    }),
    cardActions: PropTypes.shape({
        setCardNumber: PropTypes.func,
        setExpiry: PropTypes.func,
        setCvv: PropTypes.func,
    }),
    urlQueryActions: PropTypes.shape({
        setUrlQuery: PropTypes.func,
    }),
    validationActions: PropTypes.shape({
        setCvvValid: PropTypes.func,
        setCardNumberValid: PropTypes.func,
        setExpiryValid: PropTypes.func,
    }),
};

function mapStateToProps(state) {
    return {
        location: state.country.location,
        customerNumber: state.urlQuery.customerNumber,
        invoiceNumber: state.urlQuery.invoiceNumber,
        amount: state.urlQuery.amount,
        prn: state.urlQuery.prn,
        email: state.urlQuery.email,
        loading: state.payment.loading,
        paymentSuccess: state.payment.paymentSuccess,
        paymentError: state.payment.paymentError,
        paymentErrorMessage: state.payment.paymentErrorMessage,
        cardNumber: state.card.cardNumber,
        expiry: state.card.expiry,
        cvv: state.card.cvv,
        cardNumberValid: state.validation.cardNumberValid,
        cardNumberTouched: state.validation.cardNumberTouched,
        expiryValid: state.validation.expiryValid,
        expiryTouched: state.validation.expiryTouched,
        cvvValid: state.validation.cvvValid,
        cvvTouched: state.validation.cvvTouched,
        cardType: state.actions.cardType,
        toggle: state.actions.toggle,
        totalAmount: state.actions.totalAmount,
        surcharge: state.actions.surcharge,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        paymentActions: bindActionCreators(paymentActions, dispatch),
        validationActions: bindActionCreators(validationActions, dispatch),
        cardActions: bindActionCreators(cardActions, dispatch),
        urlQueryActions: bindActionCreators(urlQueryActions, dispatch),
        countryActions: bindActionCreators(countryActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
