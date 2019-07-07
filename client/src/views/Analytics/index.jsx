import React, { useEffect, useState, Component } from 'react';
import { connect } from 'react-redux';
// Externals
import { Doughnut } from 'react-chartjs-2';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { IconButton, Typography } from '@material-ui/core';

// Material icons
import {
  LaptopMac as LaptopMacIcon,
  PhoneIphone as PhoneIphoneIcon,
  Refresh as RefreshIcon,
  TabletMac as TabletMacIcon,
  ThumbUpRounded as ThumbUpIcon,
  ThumbDownRounded as ThumbDownIcon,
  ThumbsUpDownRounded as ThumbUpDownIcon,
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
import { data, options } from './chart';

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
  
  render() {
    const { classes, className, ...rest } = this.props;
    var style1 = {
      width: '750px',
      float: 'left'
    }
    var style2 = {
      width: '700px',
      float: 'auto'
    }

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
            <IconButton
              className={classes.refreshButton}
              onClick={this.handleRefresh}
              variant="text"
            >
              <RefreshIcon />
            </IconButton>
          </PortletToolbar>
        </PortletHeader>
        <div>
        <PortletContent style={style1}>
          <div className={classes.chartWrapper}>
            <Doughnut
              data={data}
              options={options}
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
        <PortletContent style={style1}>
          <div className={classes.chartWrapper}>
            <Doughnut
              data={data}
              options={options}
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