import styles from './header.less';

import React from 'react';

const Header = () => (
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
                    data-icon="&#57464;" />1300 658 700
            </span>
        </div>
    </div>
);

export default Header;
