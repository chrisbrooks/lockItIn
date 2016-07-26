import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import PaymentForm from './paymentForm';

describe('<PaymentForm />', () => {

    let props;

    beforeEach(() => {
        props = {
            cardNumber: '1111 1111 1111 1111',
            expiry: '10/12',
            cvv: '111',
            onFormBlur: sinon.spy(),
            onFormChange: sinon.spy(),
            cardNumberValid: false,
            cardNumberTouched: true,
            expiryValid: false,
            expiryTouched: true,
            cvvValid: false,
            cvvTouched: true,
        };
    });

    it('should check the onFormBlur function is triggered from the CardNumber Input', () => {
        props.onFormBlur = sinon.spy();
        const wrapper = shallow(<PaymentForm {...props} />);
        wrapper.find('[data-automation="cardNumberInput"]').simulate('blur',
            { preventDefault() {}, target: { name: 'CardNumber', value: props.cardNumber },
        });
        expect(props.onFormBlur.called).to.be.true;
    });

    it('should check the onFormBlur function is triggered from the ExpiryDate Input', () => {
        props.onFormBlur = sinon.spy();
        const wrapper = shallow(<PaymentForm {...props} />);
        wrapper.find('[data-automation="expiryDateInput"]').simulate('blur',
            { preventDefault() {}, target: { name: 'ExpiryDate', value: props.expiry },
            });
        expect(props.onFormBlur.called).to.be.true;
    });

    it('should check the onFormBlur function is triggered from the SecurityCode Input', () => {
        props.onFormBlur = sinon.spy();
        const wrapper = shallow(<PaymentForm {...props} />);
        wrapper.find('[data-automation="securityCodeInput"]').simulate('blur',
            { preventDefault() {}, target: { name: 'SecurityCode', value: props.cvv },
            });
        expect(props.onFormBlur.called).to.be.true;
    });

    it('should check the onFormChange function is triggered', () => {
        props.onFormChange = sinon.spy();
        const wrapper = shallow(<PaymentForm {...props} />);
        wrapper.find('[data-automation="cardNumberInput"]').simulate('keyUp',
            { preventDefault() {}, target: { name: 'CardNumber', value: props.cardNumber },
            });
        expect(props.onFormChange.called).to.be.true;
    });

    it('should check the onFormChange function is triggered', () => {
        props.onFormChange = sinon.spy();
        const wrapper = shallow(<PaymentForm {...props} />);
        wrapper.find('[data-automation="cardNumberInput"]').simulate('keyUp',
            { preventDefault() {}, target: { name: 'CardNumber', value: props.cardNumber },
            });
        expect(props.onFormChange.called).to.be.true;
    });

    it('should check that all the error fields are showing when touched but not valid', () => {
        const wrapper = shallow(<PaymentForm {...props} />);
        expect(wrapper.find('[data-automation="cardPaymentError"]').length).to.equal(1);
        expect(wrapper.find('[data-automation="expiryPaymentError"]').length).to.equal(1);
        expect(wrapper.find('[data-automation="cvvPaymentError"]').length).to.equal(1);
    });

    it('should check that all the error fields are not showing when false and not touched', () => {
        props = {
            cardNumberValid: false,
            cardNumberTouched: false,
            expiryValid: false,
            expiryTouched: false,
            cvvValid: false,
            cvvTouched: false,
        };
        const wrapper = shallow(<PaymentForm {...props} />);
        expect(wrapper.find('[data-automation="cardPaymentError"]').length).to.equal(0);
        expect(wrapper.find('[data-automation="expiryPaymentError"]').length).to.equal(0);
        expect(wrapper.find('[data-automation="cvvPaymentError"]').length).to.equal(0);
    });

    it('should check that all the error fields are not when everything is true and valid', () => {
        props = {
            cardNumberValid: true,
            cardNumberTouched: true,
            expiryValid: true,
            expiryTouched: true,
            cvvValid: true,
            cvvTouched: true,
        };
        const wrapper = shallow(<PaymentForm {...props} />);
        expect(wrapper.find('[data-automation="cardPaymentError"]').length).to.equal(0);
        expect(wrapper.find('[data-automation="expiryPaymentError"]').length).to.equal(0);
        expect(wrapper.find('[data-automation="cvvPaymentError"]').length).to.equal(0);
    });

    it('should check that only the cardNumber error is showing', () => {
        props = {
            cardNumberValid: false,
            cardNumberTouched: true,
        };
        const wrapper = shallow(<PaymentForm {...props} />);
        expect(wrapper.find('[data-automation="cardPaymentError"]').length).to.equal(1);
    });

    it('should check that only the expiryDate error is showing', () => {
        props = {
            expiryValid: false,
            expiryTouched: true,
        };
        const wrapper = shallow(<PaymentForm {...props} />);
        expect(wrapper.find('[data-automation="expiryPaymentError"]').length).to.equal(1);
    });

    it('should check that only the securityCode error is showing', () => {
        props = {
            cvvValid: false,
            cvvTouched: true,
        };
        const wrapper = shallow(<PaymentForm {...props} />);
        expect(wrapper.find('[data-automation="cvvPaymentError"]').length).to.equal(1);
    });

    it('should check that the payment error and correct message shows', () => {
        props = {
            paymentError: true,
            paymentErrorMessage: 'this is a payment error',
        };
        const wrapper = shallow(<PaymentForm {...props} />);
        expect(wrapper.find('[data-automation="paymentError"]').length).to.equal(1);
        expect(wrapper.find('[data-automation="paymentErrorMessage"]').length).to.equal(1);
        expect(wrapper.find('[data-automation="paymentErrorMessage"]').text()).to.equal('this is a payment error');
    });

    it('should check that the payment form is hidden when error and message are shown', () => {
        props = {
            paymentError: true,
        };
        const wrapper = shallow(<PaymentForm {...props} />);
        expect(wrapper.find('[data-automation="paymentForm"]').length).to.equal(0);
    });
});
