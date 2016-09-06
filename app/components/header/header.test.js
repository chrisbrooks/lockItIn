import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Header from './header';

describe('<Header />', () => {

    let props;

    beforeEach(() => {
        props = {
            country: 'Australia',
        };
    });

    it('should set the Australian phone number', () => {
        const wrapper = shallow(<Header {...props} />);
        expect(wrapper.find('[data-automation="headerNumber"]').text()).to.equal('1300 658 700');
    });

    it('should set the NewZealand phone number', () => {
        props.country = 'NewZealand';
        const wrapper = shallow(<Header {...props} />);
        expect(wrapper.find('[data-automation="headerNumber"]').text()).to.equal('0508 733 569');
    });
});
