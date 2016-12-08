import React, { PropTypes } from 'react';
import styles from './App.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-spin';
import * as constants from '../constants';
import * as dateChangeActions from '../actions/dateChangeActions/dateChangeActions';
import Header from '../components/Header/Header';
import CandidateInfo from '../components/CandidateInfo/CandidateInfo';


export class App extends React.Component {

    constructor(props) {
        super(props);

        this.onDateChange = this.onDateChange.bind(this);
        this.onSendReminder = this.onSendReminder.bind(this);
    }

    onDateChange(interviewId, interviewTime) {
        this.props.dateChangeActions.selectedItem(interviewId);
        this.props.dateChangeActions.sendDateChange(interviewId, interviewTime);
    }

    onSendReminder(interviewId) {
        this.props.dateChangeActions.selectedItem(interviewId);
        this.props.dateChangeActions.sendReminder(interviewId);
    }

    render() {

        return (

            <div className={styles.pageOuterContainer}>

                <Header country={this.props.country} />

                <div className={styles.pageContainer}>

                    <div className={styles.candidateListOuterContainer}>

                        <div className={styles.candidateListContainer}>

                            <div className={styles.candidateLogo}></div>

                            <h1>Managing Director of SEEK</h1>

                            <div className={styles.candidateListInnerContainer}>

                                <CandidateInfo
                                    candidateDetails={this.props.candidateDetails}
                                    onDateChange={this.onDateChange}
                                    onSendReminder={this.onSendReminder}
                                    loading={this.props.loading}
                                    dateChangeSuccess={this.props.dateChangeSuccess}
                                    dateChangeError={this.props.dateChangeError}
                                    selectedItem={this.props.selectedItem}
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

App.propTypes = {
    dateChangeError: PropTypes.bool,
    dateChangeSuccess: PropTypes.bool,
    onDateChange: PropTypes.func,
    candidateDetails: PropTypes.array,
    loading: PropTypes.bool,
    selectedItem: PropTypes.string,
    country: PropTypes.string,
    dateChangeActions: PropTypes.shape({
        sendDateChange: PropTypes.func,
    }),
};

function mapStateToProps(state) {
    return {
        country: state.country.country,
        candidateDetails: state.candidateInfo.candidateDetails,
        loading: state.dateChange.loading,
        dateChangeSuccess: state.dateChange.dateChangeSuccess,
        dateChangeError: state.dateChange.dateChangeError,
        selectedItem: state.dateChange.selectedItem,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dateChangeActions: bindActionCreators(dateChangeActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
