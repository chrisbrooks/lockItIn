import styles from './HelpIcon.less';
import React, { PropTypes } from 'react';

const HelpIcon = ({
    cardType,
    toggleHelpBox,
    toggle,
    }) => (
    <div className={styles.helpIconContainer}>
        <i aria-hidden="true" className={styles.helpIcon} onClick={toggleHelpBox}></i>
        {toggle && <div className={styles.helpIconContentContainer} data-automation="helpIconContentContainer">
            <span className={styles.helpIconArrowLeft}><span className={styles.helpIconArrowLeftInner}></span></span>
            {(cardType === '' || cardType !== 'Amex') && <div className={styles.helpIconContent} data-automation="helpIconContentOtherCards">
                <h4 className={styles.helpIconHeadingFirst}>Visa &amp; Mastercard</h4>
                <div className={styles.helpImageContainer}>
                    <div className={styles.helpImage}></div>
                    <div className={styles.helpImageDescription}>Last 3 digits on signature panel</div>
                </div>
            </div>}
            {(cardType === '' || cardType === 'Amex') && <div className={styles.helpIconContent} data-automation="helpIconContentAmex">
                <h4 className={styles.helpIconHeading}> American Express </h4>
                <div className={styles.helpImageContainer}>
                    <div className={styles.helpImageAmex}></div>
                    <div className={styles.helpImageDescriptionAmex}>4 digits on the front of the card</div>
                </div>
            </div>}
            <i aria-hidden="true" className={styles.helpIconCloseIconImage} data-automation="helpIconCloseIcon" onClick={toggleHelpBox}></i>
        </div>}
    </div>
);

HelpIcon.propTypes = {
    cardType: PropTypes.string,
    toggleHelpBox: PropTypes.func.isRequired,
    toggle: PropTypes.bool,
};

export default HelpIcon;
