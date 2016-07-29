import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { App } from './app';

describe('<App />', () => {

    let props;

    beforeEach(() => {
        props = {
            location: 'Australia',
            paymentSuccess: false,
            paymentError: true,
            paymentErrorMessage: 'this is a payment error message',
            onFormChange: sinon.spy(),
            cardNumber: '4747 4747 4747 4747',
            expiry: '10/18',
            cvv: '123',
            cardNumberValid: true,
            cardNumberTouched: true,
            expiryValid: true,
            expiryTouched: true,
            cvvValid: true,
            cvvTouched: true,
            cardType: 'Amex',
            onToggle: null,
            toggle: true,
            customerNumber: '4134987123',
            invoiceNumber: '2232131231',
            amount: '300',
            surcharge: 3,
            email: 'chris@gmail.com',
            prn: 'ffffff456rf',
            loading: true,
            totalAmount: 3000,
            paymentRef: 'rsuyedy',
            actions: {
                setSurcharge: sinon.spy(),
            },
            cardActions: {
                setCardNumber: sinon.spy(),
            },
            onFormBlur: sinon.spy(),
        };
    });

    it('should check that the header has the correct props', () => {
        const wrapper = shallow(<App {...props} />);
        const headerProps = wrapper.find('Header').props();
        expect(headerProps.location).to.equal('Australia');
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
        expect(paymentFormProps.cardNumber).to.equal('4747 4747 4747 4747');
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
        expect(paymentInfoProps.amount).to.equal('300');
        expect(paymentInfoProps.surcharge).to.equal(3);
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
        expect(paymentSuccess.paymentRef).to.equal('rsuyedy');
        expect(paymentSuccess.totalAmount).to.equal(3000);
    });
});
