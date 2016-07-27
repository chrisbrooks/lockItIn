import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import HelpIcon from './helpIcon';

describe('<HelpIcon />', () => {

    let props;

    beforeEach(() => {
        props = {
            toggle: true,
            onToggle: sinon.spy(),
            cardType: 'Amex',
        };
    });

    it('should show popup when onToggle is Clicked', () => {
        props.onToggle = sinon.spy();
        const wrapper = shallow(<HelpIcon {...props} />);
        wrapper.find('[data-automation="helpIconCloseIcon"]').simulate('click');
        expect(props.onToggle.called).to.equal(true);
    });

    it('should show popup when toggle is true', () => {
        const wrapper = shallow(<HelpIcon {...props} />);
        expect(wrapper.find('[data-automation="helpIconContentContainer"]').length).to.equal(1);
    });

    it('should not show popup when toggle is false', () => {
        props.toggle = false;
        const wrapper = shallow(<HelpIcon {...props} />);
        expect(wrapper.find('[data-automation="helpIconContentContainer"]').length).to.equal(0);
    });

    it('should only show the Amex card information in the pop up', () => {
        const wrapper = shallow(<HelpIcon {...props} />);
        expect(wrapper.find('[data-automation="helpIconContentAmex"]').length).to.equal(1);
        expect(wrapper.find('[data-automation="helpIconContentOtherCards"]').length).to.equal(0);
    });

    it('should only show the Visa & MasterCard card information in the pop up', () => {
        props.cardType = 'Visa';
        const wrapper = shallow(<HelpIcon {...props} />);
        expect(wrapper.find('[data-automation="helpIconContentAmex"]').length).to.equal(0);
        expect(wrapper.find('[data-automation="helpIconContentOtherCards"]').length).to.equal(1);
    });

    it('should show all the card information in the pop up', () => {
        props.cardType = '';
        const wrapper = shallow(<HelpIcon {...props} />);
        expect(wrapper.find('[data-automation="helpIconContentAmex"]').length).to.equal(1);
        expect(wrapper.find('[data-automation="helpIconContentOtherCards"]').length).to.equal(1);
    });

});
