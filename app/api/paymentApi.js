import axios from 'axios';
const PAYMENT_URL = `http://talent.seek.com.au/api/pay`;

class ConversationApi {

    static submitPayment({ amount, invoiceNumber }) {
        const url = PAYMENT_URL;
        const data = { amount, invoiceNumber };
        const request = axios.post(url, data);

        return request;
    }
}

export default ConversationApi;
