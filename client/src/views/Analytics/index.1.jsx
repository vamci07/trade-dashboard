import React, { useEffect, useState, Component } from 'react';
import { connect } from 'react-redux';
// Externals
import { Doughnut } from 'react-chartjs-2';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button, IconButton, Typography } from '@material-ui/core';

// Material icons
import {
  LaptopMac as LaptopMacIcon,
  PhoneIphone as PhoneIphoneIcon,
  Refresh as RefreshIcon,
  TabletMac as TabletMacIcon,
  ThumbUpRounded as ThumbUpIcon,
  ThumbDownRounded as ThumbDownIcon,
  ThumbsUpDownRounded as ThumbUpDownIcon,
  ArrowBackRounded as ArrowBackIcon
} from '@material-ui/icons';


// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletToolbar,
  PortletContent
} from 'components';


// Palette
import palette from 'theme/palette';

// Chart configuration
import { data, options, newonclick } from './chart';

// Component styles
import styles from './style';
/*
const [trades, setTrades] = useState([]);

useEffect(() => {
  if (!this.props.auth.isAuthenticated) {
    this.props.history.push('/');
  } else {
    this.props.getTrades('ALL');
    setTradesToState(this.props.trades);
  }
}, []);
  
async function setTradesToState(trades) {
  await setTrades(trades);
};
*/

class DevicesChart extends Component {
//function DevicesChart (props) {

  constructor(props) {
    super(props);
    this.state = {
      isFirstLevel: true,
//      data: service.filterData('')
    };

    console.log('in constructor');
    console.log(this.state);
    this.customizePoint = this.customizePoint.bind(this);
//    this.onClick = this.onClick.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  filterData(name) {
    return data.filter(function(item) {
      return item.parentID === name;
    });
  }

  customizePoint() {
    return {
  //      color: colors[Number(this.state.isFirstLevel)],
      hoverStyle: !this.state.isFirstLevel ? {
        hatching: 'none'
      } : {}
    };
  }

  onButtonClick() {
    if (!this.state.isFirstLevel) {
      this.setState({
        isFirstLevel: true
  //        data: service.filterData('')
      });
    }
  }

  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);
    let tradeData = [];
    let totalTrades = this.props.trades.length;
    let totalWins = 0;
    let totalLost = 0;

    this.props.trades.map(trade => {
      if(trade.closingprice) {
        if(trade.closingprice > trade.startingprice) {
          if(trade.action.toLowerCase() == 'buy'){
            totalWins = totalWins + 1;
          }
          else {
            totalLost = totalLost + 1;
          }
        } 
        else {
          if(trade.action.toLowerCase() == 'buy'){
            totalLost = totalLost + 1;
          }
          else {
            totalWins = totalWins + 1;            
          }
        }
      }
    });

    let percentWins = (totalWins*100/totalTrades).toFixed(0);
    let percentLost = (totalLost*100/totalTrades).toFixed(0);
    let percentOpen = (100 - percentWins - percentLost);

    tradeData.push(percentWins);
    tradeData.push(percentLost);
    tradeData.push(percentOpen);

    data.datasets[0].data = tradeData;
    data.labels = ['Winners', 'Losers', 'Still Open'];

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader noDivider>
          <PortletLabel title="Trade Stats" />
          <PortletToolbar>
            <div>
              <IconButton
                onClick={this.onButtonClick}
                visible={!this.state.isFirstLevel}
                variant="text"
              >
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div>
              <IconButton
                onClick={this.handleRefresh}
                variant="text"
              >
                <RefreshIcon />
              </IconButton>
            </div>
          </PortletToolbar> 
        </PortletHeader>
        <div>
        <PortletContent>
          <div className={classes.chartWrapper}>
            <Doughnut
              data={data}
              options={options}
 //             customizePoint={this.customizePoint}
              onClick={this.newonclick}
 //             className={this.state.isFirstLevel ? 'pointer-on-bars' : ''}
            />
          </div>
          <div className={classes.stats}>
            <div className={classes.device}>
              <ThumbUpIcon className={classes.deviceIcon} />
              <Typography variant="body1">{data.labels[0]}</Typography>
              <Typography
                style={{ color: palette.primary.main }}
                variant="h2"
              >
                {data.datasets[0].data[0]}%
              </Typography>
            </div>
            <div className={classes.device}>
              <ThumbDownIcon className={classes.deviceIcon} />
              <Typography variant="body1">{data.labels[1]}</Typography>
              <Typography
                style={{ color: palette.danger.main }}
                variant="h2"
              >
                {data.datasets[0].data[1]}%
              </Typography>
            </div>
            <div className={classes.device}>
              <ThumbUpDownIcon className={classes.deviceIcon} />
              <Typography variant="body1">{data.labels[2]}</Typography>
              <Typography
                style={{ color: palette.warning.main }}
                variant="h2"
              >
                {data.datasets[0].data[2]}%
              </Typography>
            </div>
          </div>
        </PortletContent>
        </div>
      </Portlet>
    );
  }
}

DevicesChart.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  trades: state.trades.trades
});

//export default connetwithStyles(styles)(DevicesChart);

export default connect(
  mapStateToProps
)(withStyles(styles)(DevicesChart));