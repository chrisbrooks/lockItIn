import React from 'react';
import Header from './Header';
import { shallow } from 'enzyme';
import { expect } from 'chai';

describe('<Header />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Header />);
    });

    it('renders a link to home page', () => {
        const actual = wrapper.find({ href: '/' }).length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders a link to contact us page', () => {
        const actual = wrapper.find({ href: '/ContactUs' }).length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });
});
