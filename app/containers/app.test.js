import React from 'react';
import styles from './app.less';
import { connect } from 'react-redux';
import { App } from './app';
import * as constants from '../constants';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
