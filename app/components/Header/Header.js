import styles from './Header.less';
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
                </a>&nbsp;
                <i
                    className={styles.headerIcon}
                    aria-hidden="true"
                    data-icon="&#57464;" />
                <span className={styles.headerNumber} data-automation="headerNumber">
                    {country === constants.location.AU ? constants.number.AU : constants.number.NZ}
                </span>

            </span>
        </div>
    </div>
);

Header.propTypes = {
    country: React.PropTypes.string,
};

export default Header;
