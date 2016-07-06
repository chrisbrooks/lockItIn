import styles from './Header.less';

import React from 'react';

const Header = () => (
    <div className={styles.header}>
        <div className={styles.headerInnerContainer}>
            <a href="/" className={styles.seekLogoContainer}>
                <span className={styles.seekLogo}></span>
                <span className={styles.seekLogoText}>employer</span>
            </a>
            <span className={styles.headerNumberContainer}>
                <a href="/ContactUs" className={styles.headerNumber}>
                    Customer Service
                </a>&nbsp;
                <i
                    className={styles.seekIcon}
                    aria-hidden="true"
                    data-icon="&#57464;" />1300 658 700
            </span>
        </div>
    </div>
);

export default Header;
