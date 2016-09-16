import { expect } from 'chai';
import { getUrlParams } from './getUrlParams';

describe('testing url parameters', () => {

    it('should set the correct parameters', () => {

        global.window = {
            location: {
                href: 'http://localhost:3000/?Y3VzdG9tZXJudW1iZXI9MD' +
        'AwMDAwMDIzMSZhbW91bnQ9Mjc1LjAwICZpbnZvaWNlbnVtYmVyPTAwOTI2NzQxMjEmcHJuPUlOVjAwOTI2N' +
        'zQxMjEmZW1haWw9bHBlYW5nQHNlZWsuY29tLmF1',
            },
        };

        const spy = getUrlParams();

        expect(spy).to.eql({
            customernumber: '0000000231',
            amount: '275.00 ',
            invoicenumber: '0092674121',
            prn: 'INV0092674121',
            email: 'lpeang@seek.com.au',
        });

    });

    it('should not set the correct parameters', () => {

        global.window = {
            location: {
                href: 'http://localhost:3000/?Y3VzdG9tZXJudW1iZXI9MD' +
                'AwMDAwMDIzMSZhbW91bnQ9Mjc1LjAwICZpbnZvaWNlbnVtYmVyPTAwOTI2NzQxMjEmcHJuPUlOVjAwOTI2N' +
                'zQxMjEmZW1haWw9bHBlYW5nQHNlZWsuY29tLmF1',
            },
        };

        const spy = getUrlParams();

        expect(spy).to.not.eql({
            customernumber: '0000000231',
        });

    });
});
