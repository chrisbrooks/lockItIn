import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import PaymentInfo from './PaymentInfo';

describe('<PaymentInfo />', () => {

    let props;

    beforeEach(() => {
        props = {
            amount: '500.00',
            gst: '50.00',
            customerNumber: '1122334455',
            invoiceNumber: 'f24jsjkae',
            surcharge: 12.32,
            cardType: 'Amex',
        };
    });

    it('should show the correct figures and not show surcharge when cardType is Visa', () => {
        props.surcharge = 0;
        props.cardType = 'Visa';
        const wrapper = shallow(<PaymentInfo {...props} />);
        expect(wrapper.find('[data-automation="paymentSurchargeTitle"]').length).to.equal(0);
        expect(wrapper.find('[data-automation="paymentSurcharge"]').length).to.equal(0);
        expect(wrapper.find('[data-automation="paymentTotal"]').text()).to.equal('$500.00');
    });

    it('should show the correct figures and not show surcharge when cardType is MasterCard', () => {
        props.surcharge = 0;
        props.cardType = 'MasterCard';
        const wrapper = shallow(<PaymentInfo {...props} />);
        expect(wrapper.find('[data-automation="paymentSurchargeTitle"]').length).to.equal(0);
        expect(wrapper.find('[data-automation="paymentSurcharge"]').length).to.equal(0);
        expect(wrapper.find('[data-automation="paymentTotal"]').text()).to.equal('$500.00');
    });

    it('should show the correct figures when cardType is set to Amex', () => {
        const wrapper = shallow(<PaymentInfo {...props} />);
        expect(wrapper.find('[data-automation="paymentSurchargeTitle"]').text()).to.equal('Amex');
        expect(wrapper.find('[data-automation="paymentSurcharge"]').text()).to.equal('$12.32');
        expect(wrapper.find('[data-automation="paymentTotal"]').text()).to.equal('$512.32');
    });

    it('should show the correct customer and invoice numbers', () => {
        const wrapper = shallow(<PaymentInfo {...props} />);
        expect(wrapper.find('[data-automation="paymentCustomerNumber"]').text()).to.equal('1122334455');
        expect(wrapper.find('[data-automation="paymentInvoiceNumber"]').text()).to.equal('f24jsjkae');
    });

});
