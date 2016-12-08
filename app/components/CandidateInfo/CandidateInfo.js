import styles from './CandidateInfo.less';
import React from 'react';
const DateTime = require('react-datetime');
import Spinner from 'react-spin';

const CandidateInfo = ({
    candidateDetails,
    onDateChange,
    onSendReminder,
    dateChangeError,
    dateChangeSuccess,
    loading,
    selectedItem,
    }) => {

    const listItems = candidateDetails.map(function(item, index) {

        let storedTime;

        const date = item.interviewTime ? new Date(item.interviewTime) : 'Please set a Date/Time';

        const storeTime = (e) => {
            storedTime = e.utc().format();
        };

        const saveTime = () => {
            onDateChange(item.interviewId, storedTime);
        };

        const sendReminder = () => {
            onSendReminder(item.interviewId);
        }

        return (
            <li className={styles.candidateList} key={index}>

                <div className={styles.statusContainer}>
                    { item.responseStatus === 'accepted' &&
                    <div className={styles.statusContent}>
                        <div className={styles.acceptedStatus}></div>
                        <p>Accepted</p>
                    </div>
                    }
                    { item.responseStatus === 'declined' &&
                    <div className={styles.statusContent}>
                        <div className={styles.declinedStatus}></div>
                        <p>Declined</p>
                    </div>
                    }
                    { item.responseStatus === 'noResponse' &&
                    <div className={styles.statusContent}>
                        <div className={styles.noResponseStatus}></div>
                        <p>Not Responded</p>
                    </div>
                    }
                    { item.responseStatus === 'notSent' &&
                    <div className={styles.statusContent}>
                        <div className={styles.notSentStatus}></div>
                        <p>Not Sent</p>
                    </div>
                    }
                </div>

                <div className={styles.candidateContentContainer}>

                    <div className={styles.sendReminder} onClick={sendReminder}>Send Reminder</div>

                    <div className={styles.candidateContent}>
                        <h2 className={styles.candidateName}>{item.candidateName}</h2>
                        <div>
                            <div>
                            <h3 className={styles.candidateEmail}>Email: <span>{item.candidateEmail}</span></h3>
                            <h4 className={styles.candidatePhone}>Mobile: <span>{item.candidatePhNo} </span></h4>
                            <h4 className={styles.candidatePosition}>Current position: <span>{item.candidateCurrentRole} </span></h4>
                            </div>

                        </div>
                    </div>

                    <div className={styles.dateTimeContent}>

                        {(dateChangeSuccess) &&

                            <div className={styles.overlay}>
                                <div className={styles.errorContent}>
                                    <div className={styles.errorLogoSuccess}></div>
                                    <div className={styles.errorText}>{dateChangeSuccess}</div>
                                </div>
                            </div>

                        }

                        {(dateChangeError && item.interviewId === selectedItem) &&
                            <div className={styles.overlay}>
                                <div className={styles.errorContent}>
                                    <div className={styles.errorLogo}></div>
                                    <div className={styles.errorText}>{dateChangeError}</div>
                                </div>
                            </div>
                        }

                        {(loading && item.interviewId === selectedItem) &&
                            <div className={styles.overlay}>
                                <Spinner
                                    config={{
                                        lines: 7,
                                        length: 0,
                                        width: 10,
                                        radius:10,
                                        color: '#fff',
                                        left: '0px',
                                        className: 'spinner',
                                        position: 'relative',
                                        top: '0px',
                                    }}
                                />
                            </div>
                        }


                        <div className={styles.dateContent}>

                            <DateTime onChange={storeTime} closeOnSelect={true} defaultValue={date}/>

                            <div className={styles.saveTime} onClick={saveTime}>Save</div>
                        </div>

                    </div>

                </div>
            </li>
        );
    });

    return (
        <div className={styles.candidateInfo}>
            {listItems}
        </div>
    );
};

CandidateInfo.propTypes = {
    customerNumber: React.PropTypes.string,
};

export default CandidateInfo;
