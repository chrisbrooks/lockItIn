import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import PaymentSuccess from './paymentSuccess';

describe('<PaymentSuccess />', () => {

    let props;

    beforeEach(() => {
        props = {
            customerNumber: '1122334455',
            invoiceNumber: 'f24jsjkae',
            totalAmount: '300.00',
            prn: 'sdfsd98f7df',
        };

        global.window = {
            print: {},
        };
    });

    it('should show the correct figures on the success page', () => {
        const wrapper = shallow(<PaymentSuccess {...props} />);
        expect(wrapper.find('[data-automation="paymentCustomerNumber"]').text()).to.equal('1122334455');
        expect(wrapper.find('[data-automation="paymentInvoiceNumber"]').text()).to.equal('f24jsjkae');
        expect(wrapper.find('[data-automation="paymentAmount"]').text()).to.equal('$300.00');
        expect(wrapper.find('[data-automation="paymentReference"]').text()).to.equal('sdfsd98f7df');
    });

    it('should show the correct figures on the success page', () => {
        const wrapper = shallow(<PaymentSuccess {...props} />);
        expect(wrapper.find('[data-automation="paymentCustomerNumber"]').text()).to.not.equal('yyyyy455');
        expect(wrapper.find('[data-automation="paymentInvoiceNumber"]').text()).to.not.equal('frrrrrre');
        expect(wrapper.find('[data-automation="paymentAmount"]').text()).to.not.equal('$310.00');
        expect(wrapper.find('[data-automation="paymentReference"]').text()).to.not.equal('sdyyyyyf');
    });

});
