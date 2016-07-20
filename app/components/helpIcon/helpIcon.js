import styles from './helpIcon.less';
import React from 'react';

const helpIcon = ({
    cardType,
    onToggle,
    toggle,
    }) => {

    return (
        <div className={styles.helpIconContainer}>
            <i aria-hidden="true" data-icon="&#57384;" className={styles.helpIcon} onClick={onToggle}></i>
            { toggle && <div className={styles.helpIconContentContainer}>
                <span className={styles.helpIconArrowLeft}><span className={styles.helpIconArrowLeftInner}></span></span>
                { (cardType === '' || cardType !== 'Amex') && <div className={styles.helpIconContent}><h4 className={styles.helpIconHeadingFirst}>Visa &amp; Mastercard</h4>
                    <div className={styles.helpImageContainer}>
                        <div className={styles.helpImage}></div>
                        <div className={styles.helpImageDescription}>Last 3 digits on signature panel</div>
                    </div>
                    </div>}
                { (cardType === '' || cardType === 'Amex') && <div className={styles.helpIconContent}><h4 className={styles.helpIconHeading}> American Express </h4>
                <div className={styles.helpImageContainer}>
                    <div className={styles.helpImageAmex}></div>
                    <div className={styles.helpImageDescriptionAmex}>4 digits on the front of the card</div>
                    </div> </div>}
                <span className={styles.helpIconCloseIcon}>
                    <i aria-hidden="true" data-icon="&#57488;" onClick={onToggle}></i>
                </span>
            </div> }
        </div>
    );
};

export default helpIcon;


