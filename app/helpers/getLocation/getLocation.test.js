import { expect } from 'chai';
import { getLocation } from './getLocation';

describe('testing url parameters', () => {

    it('should set the location to Australia', () => {

        global.window = {
            location: {
                href: 'https://talent.seek.com.au',
            },
        };

        const spy = getLocation();

        expect(spy).to.equal('Australia');

    });

    it('should set the location to NewZealand', () => {

        global.window = {
            location: {
                href: 'https://talent.seek.co.nz',
            },
        };

        const spy = getLocation();

        expect(spy).to.equal('NewZealand');

    });

    it('should default to Australia when href does not match', () => {

        global.window = {
            location: {
                href: 'https://random.url.com',
            },
        };

        const spy = getLocation();

        expect(spy).to.equal('Australia');

    });
});
