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
  ThumbsUpDownRounded as ThumbUpDownIcon
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
import { data, options, WinDrillDown, LossDrillDown } from './chart';

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
function prepareChartData(props) {}

class DevicesChart extends Component {
  //function DevicesChart (props) {

  render() {
    const { classes, className, trades, ...rest } = this.props;
    var style1 = {
      width: '500px',
      float: 'left'
    };
    var style2 = {
      width: '500px',
      float: 'auto'
    };

    const rootClassName = classNames(classes.root, className);
    let tradeData = [];
    let totalTrades = trades.length;
    let totalWins = 0;
    let totalLost = 0;
    let followedPlanOnWins = 0;
    let followedPlanOnLoss = 0;

    trades &&
      trades.map(trade => {
        if (trade.closingprice) {
          if (trade.closingprice > trade.startingprice) {
            if (trade.action.toLowerCase() == 'buy') {
              totalWins = totalWins + 1;
              if (trade.followedplan.toLowerCase() == 'y') {
                followedPlanOnWins = followedPlanOnWins + 1;
              }
            } else {
              totalLost = totalLost + 1;
              if (trade.followedplan.toLowerCase() == 'y') {
                followedPlanOnLoss = followedPlanOnLoss + 1;
              }
            }
          } else {
            if (trade.action.toLowerCase() == 'buy') {
              totalLost = totalLost + 1;
              if (trade.followedplan.toLowerCase() == 'y') {
                followedPlanOnLoss = followedPlanOnLoss + 1;
              }
            } else {
              totalWins = totalWins + 1;
              if (trade.followedplan.toLowerCase() == 'y') {
                followedPlanOnWins = followedPlanOnWins + 1;
              }
            }
          }
        }
      });

    let percentWins = ((totalWins * 100) / totalTrades).toFixed(0);
    let percentLost = ((totalLost * 100) / totalTrades).toFixed(0);
    let percentOpen = 100 - percentWins - percentLost;

    tradeData.push(percentWins);
    tradeData.push(percentLost);
    tradeData.push(percentOpen);

    data.datasets[0].data = tradeData;
    data.labels = ['Winners', 'Losers', 'Still Open'];

    // Prepare data for Win Breakdown
    let percentfollowedPlanOnWins = (
      (followedPlanOnWins * 100) /
      totalWins
    ).toFixed(0);
    let percentNotfollowedPlanOnWins = (
      ((totalWins - followedPlanOnWins) * 100) /
      totalWins
    ).toFixed(0);
    //  let percentOpen = (100 - percentWins - percentLost);

    let WinDrillDownData = [];
    WinDrillDownData.push(percentfollowedPlanOnWins);
    WinDrillDownData.push(percentNotfollowedPlanOnWins);

    WinDrillDown.datasets[0].data = WinDrillDownData;
    WinDrillDown.labels = ['Plan Followed', 'Plan Not Followed'];

    // Prepare data for Loss Breakdown
    let percentfollowedPlanOnLoss = (
      (followedPlanOnLoss * 100) /
      totalLost
    ).toFixed(0);
    let percentNotfollowedPlanOnLoss = (
      ((totalLost - followedPlanOnLoss) * 100) /
      totalLost
    ).toFixed(0);

    let LossDrillDownData = [];
    LossDrillDownData.push(percentfollowedPlanOnLoss);
    LossDrillDownData.push(percentNotfollowedPlanOnLoss);
    //  tradeData.push(percentOpen);

    LossDrillDown.datasets[0].data = LossDrillDownData;
    LossDrillDown.labels = ['Plan Followed', 'Plan Not Followed'];

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader
          Divider
          style={style1}
        >
          <PortletLabel title="Trade Stats" />
        </PortletHeader>
        <div>
          <PortletContent>
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
        <PortletHeader
          Divider
          style={style1}
        >
          <PortletLabel title="Wins Breakdown" />
        </PortletHeader>
        <div>
          <PortletContent>
            <div className={classes.chartWrapper}>
              <Doughnut
                data={WinDrillDown}
                options={options}
              />
            </div>
            <div className={classes.stats}>
              <div className={classes.device}>
                <ThumbUpIcon className={classes.deviceIcon} />
                <Typography variant="body1">
                  {WinDrillDown.labels[0]}
                </Typography>
                <Typography
                  style={{ color: palette.primary.main }}
                  variant="h2"
                >
                  {WinDrillDown.datasets[0].data[0]}%
                </Typography>
              </div>
              <div className={classes.device}>
                <ThumbDownIcon className={classes.deviceIcon} />
                <Typography variant="body1">
                  {WinDrillDown.labels[1]}
                </Typography>
                <Typography
                  style={{ color: palette.warning.main }}
                  variant="h2"
                >
                  {WinDrillDown.datasets[0].data[1]}%
                </Typography>
              </div>
            </div>
          </PortletContent>
        </div>
        <PortletHeader
          Divider
          style={style1}
        >
          <PortletLabel title="Loss Breakdown" />
        </PortletHeader>
        <div>
          <PortletContent>
            <div className={classes.chartWrapper}>
              <Doughnut
                data={LossDrillDown}
                options={options}
              />
            </div>
            <div className={classes.stats}>
              <div className={classes.device}>
                <ThumbUpIcon className={classes.deviceIcon} />
                <Typography variant="body1">
                  {LossDrillDown.labels[0]}
                </Typography>
                <Typography
                  style={{ color: palette.primary.main }}
                  variant="h2"
                >
                  {LossDrillDown.datasets[0].data[0]}%
                </Typography>
              </div>
              <div className={classes.device}>
                <ThumbDownIcon className={classes.deviceIcon} />
                <Typography variant="body1">
                  {LossDrillDown.labels[1]}
                </Typography>
                <Typography
                  style={{ color: palette.warning.main }}
                  variant="h2"
                >
                  {LossDrillDown.datasets[0].data[1]}%
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

export default connect(mapStateToProps)(withStyles(styles)(DevicesChart));
