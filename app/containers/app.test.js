import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { App } from './app';
import * as constants from '../constants';

describe('<App />', () => {

    let props;

    beforeEach(() => {

        props = {
            country: 'Australia',
            paymentSuccess: false,
            paymentError: true,
            paymentErrorMessage: 'this is a payment error message',
            onFormChange: sinon.spy(),
            cardNumber: '3400 000000 00009',
            expiry: '10/18',
            cvv: '123',
            cardNumberValid: true,
            cardNumberTouched: true,
            expiryValid: true,
            expiryTouched: true,
            cvvValid: true,
            cvvTouched: true,
            cardType: constants.cardType.AMEX,
            toggleHelpBox: null,
            toggle: true,
            customerNumber: '4134987123',
            invoiceNumber: '2232131231',
            amount: '500.00',
            gst: '50.00',
            surcharge: 12.32,
            email: 'chris@gmail.com',
            prn: 'ffffff456rf',
            loading: true,
            totalAmount: '500.00',
            calculationActions: {
                setSurcharge: sinon.spy(),
                setTotalAmount: sinon.spy(),
            },
            cardActions: {
                setCardNumber: sinon.spy(),
            },
            onFormBlur: sinon.spy(),
            paymentActions: {
                createStripeToken: sinon.spy(),
            },
            validationActions: {
                setCardNumberValid: sinon.spy(),
                setExpiryValid: sinon.spy(),
                setCvvValid: sinon.spy(),
            },
            countryActions: {
                setLocation: sinon.spy(),
            },
            urlQueryActions: {
                setUrlQuery: sinon.spy(),
            },
        };
    });

    describe('testing the rendered app markup', () => {

        it('should check that the header has the correct props', () => {
            const wrapper = shallow(<App {...props} />);
            const headerProps = wrapper.find('Header').props();
            expect(headerProps.country).to.equal('Australia');
        });

        it('should check that the app container is loaded', () => {
            const wrapper = shallow(<App {...props} />);
            expect(wrapper.find('[data-automation="pageContainer"]').length).to.equal(1);
        });

        it('should check that the app container is loaded', () => {
            const wrapper = shallow(<App {...props} />);
            expect(wrapper.find('[data-automation="pageContainer"]').length).to.equal(1);
        });

        it('should check that the form is loaded', () => {
            const wrapper = shallow(<App {...props} />);
            expect(wrapper.find('[data-automation="paymentFormOuterContainer"]').length).to.equal(1);
            expect(wrapper.find('[data-automation="paymentSuccess"]').length).to.equal(0);
        });

        it('should check that the correct content is loaded on payment success', () => {
            props.paymentSuccess = true;
            const wrapper = shallow(<App {...props} />);
            expect(wrapper.find('[data-automation="paymentFormOuterContainer"]').length).to.equal(0);
            expect(wrapper.find('[data-automation="paymentSuccess"]').length).to.equal(1);
        });

        it('should check the props on PaymentForm', () => {
            const wrapper = shallow(<App {...props} />);
            const paymentFormProps = wrapper.find('PaymentForm').props();
            expect(paymentFormProps.paymentError).to.equal(true);
            expect(paymentFormProps.paymentErrorMessage).to.equal('this is a payment error message');
            expect(paymentFormProps.cardNumber).to.equal('3400 000000 00009');
            expect(paymentFormProps.expiry).to.equal('10/18');
            expect(paymentFormProps.cvv).to.equal('123');
            expect(paymentFormProps.cardNumberValid).to.equal(true);
            expect(paymentFormProps.cardNumberTouched).to.equal(true);
            expect(paymentFormProps.expiryValid).to.equal(true);
            expect(paymentFormProps.expiryTouched).to.equal(true);
            expect(paymentFormProps.cvvValid).to.equal(true);
            expect(paymentFormProps.cvvTouched).to.equal(true);
            expect(paymentFormProps.cardType).to.equal('Amex');
            expect(paymentFormProps.toggle).to.equal(true);
        });

        it('should check the props on PaymentForm', () => {
            const wrapper = shallow(<App {...props} />);
            const paymentInfoProps = wrapper.find('PaymentInfo').props();
            expect(paymentInfoProps.customerNumber).to.equal('4134987123');
            expect(paymentInfoProps.invoiceNumber).to.equal('2232131231');
            expect(paymentInfoProps.amount).to.equal('500.00');
            expect(paymentInfoProps.surcharge).to.equal(12.32);
            expect(paymentInfoProps.cardType).to.equal('Amex');
        });

        it('should show the Button Content', () => {
            props.paymentError = false;
            const wrapper = shallow(<App {...props} />);
            expect(wrapper.find('[data-automation="paymentButtonContainer"]').length).to.equal(1);
        });

        it('should not show the Button Content when there is a payment error', () => {
            props.paymentError = true;
            const wrapper = shallow(<App {...props} />);
            expect(wrapper.find('[data-automation="paymentButtonContainer"]').length).to.equal(0);
        });

        it('should show the correct button when processing payment', () => {
            props = {
                paymentError: false,
                loading: false,
            };
            const wrapper = shallow(<App {...props} />);
            expect(wrapper.find('[data-automation="paymentButtonProcessing"]').length).to.equal(0);
            expect(wrapper.find('[data-automation="paymentButton"]').length).to.equal(1);
        });

        it('should show the correct button before processing payment', () => {
            props = {
                paymentError: false,
                loading: true,
            };
            const wrapper = shallow(<App {...props} />);
            expect(wrapper.find('[data-automation="paymentButtonProcessing"]').length).to.equal(1);
            expect(wrapper.find('[data-automation="paymentButton"]').length).to.equal(0);
            expect(wrapper.find('[data-automation="spinner"]').length).to.equal(1);
        });

        it('should check the props on PaymentSuccess', () => {
            props.paymentSuccess = true;
            const wrapper = shallow(<App {...props} />);
            const paymentSuccess = wrapper.find('PaymentSuccess').props();
            expect(paymentSuccess.customerNumber).to.equal('4134987123');
            expect(paymentSuccess.invoiceNumber).to.equal('2232131231');
            expect(paymentSuccess.prn).to.equal('ffffff456rf');
            expect(paymentSuccess.totalAmount).to.equal('500.00');
        });
    });

    describe('testing onFormBlur', () => {

        let app;
        let name;
        let value;
        let active;

        beforeEach(() => {

            app = new App(props);

            name = constants.inputs.CARD_NUMBER;
            value = '3714 4963539 8431';
            active = true;
        });

        describe('testing cardNumber Input', () => {

            it('should set the cardNumber valid', () => {

                app.onFormBlur(name, value, active);

                expect(props.validationActions.setCardNumberValid.called).to.equal(true);
                expect(props.validationActions.setCardNumberValid.calledWith({
                    cardNumberValid: true,
                    cardNumberTouched: true,
                })).to.equal(true);
            });

            it('should not set the cardNumber valid', () => {

                value = '3714 4963';

                app.onFormBlur(name, value, active);

                expect(props.validationActions.setCardNumberValid.called).to.equal(true);
                expect(props.validationActions.setCardNumberValid.calledWith({
                    cardNumberValid: true,
                    cardNumberTouched: true,
                })).to.equal(false);
            });

        });

        describe('testing ExpiryDate Input', () => {

            it('should set the expiryDate valid', () => {

                name = constants.inputs.EXPIRY_DATE;
                value = '10/18';

                app.onFormBlur(name, value, active);

                expect(props.validationActions.setExpiryValid.called).to.equal(true);
                expect(props.validationActions.setExpiryValid.calledWith({
                    expiryValid: true,
                    expiryTouched: true,
                })).to.equal(true);
            });

            it('should not set the expiryDate valid', () => {

                name = constants.inputs.EXPIRY_DATE;
                value = '10/12';

                app.onFormBlur(name, value, active);

                expect(props.validationActions.setExpiryValid.called).to.equal(true);
                expect(props.validationActions.setExpiryValid.calledWith({
                    expiryValid: true,
                    expiryTouched: true,
                })).to.equal(false);
            });

        });

        describe('testing SecurityCode Input', () => {

            it('should set the security code valid', () => {

                name = constants.inputs.SECURITY_CODE;
                value = '111';

                app.onFormBlur(name, value, active);

                expect(props.validationActions.setCvvValid.called).to.equal(true);
                expect(props.validationActions.setCvvValid.calledWith({
                    cvvValid: true,
                    cvvTouched: true,
                })).to.equal(true);
            });

            it('should not set the security code valid', () => {

                name = constants.inputs.SECURITY_CODE;
                value = '11';

                app.onFormBlur(name, value, active);

                expect(props.validationActions.setCvvValid.called).to.equal(true);
                expect(props.validationActions.setCvvValid.calledWith({
                    cvvValid: true,
                    cvvTouched: true,
                })).to.equal(false);
            });


        });

    });

    describe('testing onFormChange, getSurcharge and getTotalAmount', () => {

        describe('testing CardNumber input', () => {

            it('should set card number,surcharge and total amount when using Amex details', () => {

                const app = new App(props);
                const name = constants.inputs.CARD_NUMBER;
                const value = props.cardNumber;

                app.onFormChange(name, value);

                expect(props.cardActions.setCardNumber.called).to.equal(true);
                expect(props.cardActions.setCardNumber.calledWith(value)).to.equal(true);

                expect(props.calculationActions.setSurcharge.called).to.equal(true);
                expect(props.calculationActions.setSurcharge.calledWith({
                    surcharge: 12.32,
                    cardType: constants.cardType.AMEX,
                })).to.equal(true);

                expect(props.calculationActions.setTotalAmount.called).to.equal(true);
                expect(props.calculationActions.setTotalAmount.calledWith('512.32')).to.equal(true);
            });

            it('should set card number,surcharge and total amount when using Visa details', () => {
                props = {
                    country: 'Australia',
                    cardNumber: '4747 4747 4747 4747',
                    amount: '500',
                    calculationActions: {
                        setSurcharge: sinon.spy(),
                        setTotalAmount: sinon.spy(),
                    },
                    cardActions: {
                        setCardNumber: sinon.spy(),
                    },
                };

                const app = new App(props);
                const name = constants.inputs.CARD_NUMBER;
                const value = props.cardNumber;

                app.onFormChange(name, value);

                expect(props.cardActions.setCardNumber.called).to.equal(true);
                expect(props.cardActions.setCardNumber.calledWith(value)).to.equal(true);

                expect(props.calculationActions.setSurcharge.called).to.equal(true);
                expect(props.calculationActions.setSurcharge.calledWith({
                    surcharge: 0,
                    cardType: constants.cardType.VISA,
                })).to.equal(true);

                expect(props.calculationActions.setTotalAmount.called).to.equal(true);
                expect(props.calculationActions.setTotalAmount.calledWith('500.00')).to.equal(true);

            });

            it('should set card number,surcharge and total amount when using MasterCard details', () => {
                props = {
                    country: 'Australia',
                    cardNumber: '5555 5555 5555 4444',
                    amount: '500.00',
                    calculationActions: {
                        setSurcharge: sinon.spy(),
                        setTotalAmount: sinon.spy(),
                    },
                    cardActions: {
                        setCardNumber: sinon.spy(),
                    },
                };
                const app = new App(props);
                const name = constants.inputs.CARD_NUMBER;
                const value = props.cardNumber;

                app.onFormChange(name, value);

                expect(props.cardActions.setCardNumber.called).to.equal(true);
                expect(props.cardActions.setCardNumber.calledWith(value)).to.equal(true);

                expect(props.calculationActions.setSurcharge.called).to.equal(true);
                expect(props.calculationActions.setSurcharge.calledWith({
                    surcharge: 0,
                    cardType: constants.cardType.MASTERCARD,
                })).to.equal(true);

                expect(props.calculationActions.setTotalAmount.called).to.equal(true);
                expect(props.calculationActions.setTotalAmount.calledWith('500.00')).to.equal(true);

            });
        });

        describe('testing expiryDate input', () => {

            it('should set the correct expiry prop', () => {
                props = {
                    expiry: '10/18',
                    cardActions: {
                        setExpiry: sinon.spy(),
                    },
                    calculationActions: {
                        setTotalAmount: sinon.spy(),
                    },
                };
                const app = new App(props);
                const name = constants.inputs.EXPIRY_DATE;
                const value = props.expiry;
                app.onFormChange(name, value);
                expect(props.cardActions.setExpiry.called).to.equal(true);
                expect(props.cardActions.setExpiry.calledWith(value)).to.equal(true);

            });
        });

        describe('testing securityCode input', () => {

            it('should set the correct expiry prop', () => {
                props = {
                    cvv: '111',
                    cardActions: {
                        setCvv: sinon.spy(),
                    },
                    calculationActions: {
                        setTotalAmount: sinon.spy(),
                    },
                };
                const app = new App(props);
                const name = constants.inputs.SECURITY_CODE;
                const value = props.expiry;
                app.onFormChange(name, value);
                expect(props.cardActions.setCvv.called).to.equal(true);
                expect(props.cardActions.setCvv.calledWith(value)).to.equal(true);

            });
        });

        describe('testing onFormSubmit and validateForm', () => {

            it('should set createStripeToken when form is valid', () => {
                const app = new App(props);
                app.onSubmitForm();
                expect(props.paymentActions.createStripeToken.called).to.equal(true);
                expect(props.paymentActions.createStripeToken.calledWith(
                    'Australia',
                    'chris@gmail.com',
                    'ffffff456rf',
                    '3400 000000 00009',
                    '123',
                    '10/18'
                )).to.equal(true);
            });

            it('should not set createStripeToken but should set card details validation props', () => {
                const app = new App(props);
                props.cardNumberValid = false;
                props.expiryValid = false;
                props.cvvValid = false;

                app.onSubmitForm();

                expect(props.paymentActions.createStripeToken.called).to.equal(false);

                expect(props.validationActions.setCardNumberValid.calledWith({
                    cardNumberValid: false,
                    cardNumberTouched: true,
                })).to.equal(true);

                expect(props.validationActions.setExpiryValid.calledWith({
                    expiryValid: false,
                    expiryTouched: true,
                })).to.equal(true);

                expect(props.validationActions.setCvvValid.calledWith({
                    cvvValid: false,
                    cvvTouched: true,
                })).to.equal(true);
            });
        });
    });
});

