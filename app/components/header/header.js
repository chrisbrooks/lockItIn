import styles from './header.less';
import React from 'react';
import * as constants from '../../constants';

const Header = ({ country }) => (
    <div className={styles.header}>
        <div className={styles.headerInnerContainer}>
            <a href="/" className={styles.headerLogoContainer}>
                <span className={styles.headerLogo}></span>
                <span className={styles.headerLogoText}>employer</span>
            </a>
            <span className={styles.headerNumberContainer}>
                <a href="/ContactUs" className={styles.headerNumber}>
                    Customer Service
                </a>
                <i
                    className={styles.headerIcon}
                    aria-hidden="true"
                />
                <span className={styles.headerNumber} data-automation="headerNumber">
                    {country === constants.location.AU ? constants.customerServiceNumber.AU : constants.customerServiceNumber.NZ}
                </span>

            </span>
        </div>
    </div>
);

Header.propTypes = {
    country: React.PropTypes.string,
};

export default Header;
