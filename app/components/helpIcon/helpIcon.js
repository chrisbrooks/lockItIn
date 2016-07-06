import styles from './HelpIcon.less';

import React from 'react';

const HelpIcon = () => {

    return (
        <div className={helpIcon}>
            <p>sdsdsd</p>
            <div className={helpIconContent}>
                <span className={helpIconArrowLeft}><span className={helpIconArrowLeftInner}></span></span>
                <span>

                    <h4 className={helpIconHeadingFirst}>Visa &amp; Mastercard</h4>
                    <div className={helpImageContainer}>
                        <div className={helpImage}></div>
                        <div className={helpImageDescription}>Last 3 digits on signature panel</div>
                    </div>

                    <h4 className={helpIconHeading}> American Express </h4>
                     <div className={helpImageContainer}>
                         <div className={helpImageAmex}></div>
                         <div className={helpImageDescriptionAmex}>4 digits on the front of the card</div>
                     </div>

                </span>
            </div>

            <span className={helpIconCloseIcon}>
                <i aria-hidden="true" data-icon=""></i>
            </span>
        </div>
    );
};

export default HelpIcon;


