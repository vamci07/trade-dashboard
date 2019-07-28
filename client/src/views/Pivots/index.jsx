import React, { Component } from 'react';
import { connect } from 'react-redux';
// Externals
import { Doughnut } from 'react-chartjs-2';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography } from '@material-ui/core';

// Material icons
import {
  ThumbUpRounded as ThumbUpIcon,
  ThumbDownRounded as ThumbDownIcon,
  ThumbsUpDownRounded as ThumbUpDownIcon
} from '@material-ui/icons';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent
} from 'components';

// Palette
import palette from 'theme/palette';


// Component styles
import styles from './style';

// create Plotly React component via dependency injection
const Plot = createPlotlyComponent(window.Plotly);

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);

class DataPivots extends React.Component {
  //function DevicesChart (props) {
    constructor(props) {
      super(props);
      this.state = props;
  }


  render() {
    const { classes, className, trades, ...rest } = this.props;
    var style1 = {
      width: '500px',
      float: 'left'
    };

    const rootClassName = classNames(classes.root, className);

    // Ready Pivot Data
    let PivotData = [];

    trades &&
    trades.map(trade => {

      let Data = {
        stock: '',
        stockname: '',
        action: '',
        stockquantity: null,
        startingprice: null,
        stoploss: null,
        targetprice: null,
        reasonfortrade: '',
        closingprice: null,
        reasonforexit: '',
        emotionalstate: '',
        outcome: '',
        gain: null,
        followedplan: '',
        date: '',
        year: null,
        month: '',
        quarter: ''
      }

      Data.stock = trade.stock;
      Data.stockname = trade.stockname;
      Data.action = trade.action;
      Data.stockquantity = trade.stockquantity;
      Data.startingprice = trade.startingprice;
      Data.stoploss = trade.stoploss;
      Data.targetprice = trade.targetprice;
      Data.reasonfortrade = trade.reasonfortrade;
      Data.closingprice = trade.closingprice;
      Data.reasonforexit = trade.reasonforexit;
      Data.emotionalstate = trade.emotionalstate;
      Data.outcome = trade.outcome;
      Data.gain = trade.gain;
      Data.followedplan = trade.followedplan;
      Data.date = trade.date.slice(0,10);
      Data.year = trade.date.slice(0,4);
//      Data.month = trade.date.slice(6,7) 
      switch ( trade.date.slice(5,7) ){
        case '01':
          Data.month = 'JAN';
          Data.quarter = 'Q1';
          break;
        case '02':
          Data.month = 'FEB';
          Data.quarter = 'Q1';
          break;
        case '03':
          Data.month = 'MAR';
          Data.quarter = 'Q1';
          break;
        case '04':
          Data.month = 'APR';
          Data.quarter = 'Q2';
          break;
        case '05':
          Data.month = 'MAY';
          Data.quarter = 'Q2';
          break;
        case '06':
          Data.month = 'JUN';
          Data.quarter = 'Q2';
          break;
        case '07':
          Data.month = 'JUL';
          Data.quarter = 'Q3';
          break;
        case '08':
          Data.month = 'AUG';
          Data.quarter = 'Q3';
          break;
        case '09':
          Data.month = 'SEP';
          Data.quarter = 'Q3';
          break;
        case '10':
          Data.month = 'OCT';
          Data.quarter = 'Q4';
          break;
        case '11':
          Data.month = 'NOV';
          Data.quarter = 'Q4';
          break;
        case '12':
          Data.month = 'DEC';
          Data.quarter = 'Q4';
          break;
      }
      PivotData.push(Data);

    });

    return (
      <PivotTableUI
      data={PivotData}
      onChange={s => this.setState(s)}
      renderers={Object.assign({}, TableRenderers)}
      {...this.state}
      />
        );
  }
}

DataPivots.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  trades: state.trades.trades
});



export default connect(mapStateToProps)(withStyles(styles)(DataPivots));
