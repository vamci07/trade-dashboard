import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { connect } from 'react-redux';
import { withStyles, Fab } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { Dashboard as DashboardLayout } from 'layouts';
import {
  getTrades,
  createTrade,
  updateTrade
} from 'store/actions/tradeActions';
import AddTrade from './components/AddTrade';
import { StyledCard, StyledCardHeader, StyledCardContent } from './style';
import { red, green } from '@material-ui/core/colors';
import UpdateTrade from './components/UpdateTrade';
// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  item: {
    height: '100%'
  }
});

function Dashboard(props) {
  const [trades, setTrades] = useState([]);
  const [addTradeOpen, setAddTradeOpen] = useState(false);
  const [updateTradeOpen, setUpdateTradeOpen] = useState(false);
  const [updateTradeObj, setUpdateTradeObj] = useState({});
  const [tradeObj, setTradeObj] = useState({
    stock: '',
    action: '',
    stockquantity: 0,
    startingprice: 0,
    stoploss: 0,
    targetprice: 0,
    reasonfortrade: '',
    closingprice: 0,
    reasonforexit: '',
    emotionalstate: '',
    owner: [
      {
        email: '',
        name: ''
      }
    ]
  });

  const [stockData, setStockData] = useState([]);

  async function addTrade(newTrade) {
    await props.createTrade(newTrade);
    setAddTradeOpen(!addTradeOpen);
  }

  async function updateTradeFn(updateTradeObj) {
    await props.updateTrade(updateTradeObj);
    setUpdateTradeOpen(!updateTradeOpen);
  }

  async function setTradesToState(trades) {
    await setTrades(trades);
  }

  async function setTradeObjToState(trade) {
    setTradeObj(trade);
  }

  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      props.history.push('/');
    } else {
      props.getTrades();
      setTradesToState(props.trades);
      setTradeObjToState({
        ...tradeObj,
        owner: [
          {
            email: props.auth.user.email,
            name: props.auth.user.name
          }
        ]
      });
    }
  }, []);

  useEffect(() => {
    setTradesToState(props.trades);
    const { trades } = props;
    let symString = '';
    trades && trades.map(trade => (symString = symString + trade.stock + ','));
    symString = symString.slice(0, -1);
    let params = {};
    params = symString && {
      symbol: symString,
      api_token: 'gwfW78tA71XsiBYJbEQB8CgeL88K73aGiGfbpLEwaHszuYe5KpgMNWgSIsY3'
    };
    axios({
      url: 'https://api.worldtradingdata.com/api/v1/stock',
      method: 'get',
      params: params
    })
      .then(
        res => res && res.data && res.data.data && setStockData(res.data.data)
      )
      .catch(err => console.log(err));
  }, [props.trades]);

  function openAddTradeDialog() {
    setAddTradeOpen(!addTradeOpen);
  }

  function openUpdateTradeDialog(trade) {
    setUpdateTradeObj(trade);
    setUpdateTradeOpen(!updateTradeOpen);
  }

  const { classes } = props;
  return (
    <>
      <Grid
        container
        spacing={4}
      >
        {trades.map(trade => {
          return (
            <Grid
              item
              key={trade.id}
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              {stockData.map(stock => {
                if (stock.symbol === trade.stock) {
                  const displayPercent = (
                    ((stock.price - trade.startingprice) * 100) /
                    trade.startingprice
                  ).toFixed(2);
                  let color = '';
                  if (displayPercent < 0) {
                    color = red[300];
                  } else {
                    color = green[300];
                  }
                  return (
                    <StyledCard
                      color={color}
                      onClick={() => openUpdateTradeDialog(trade)}
                    >
                      <StyledCardHeader title={trade.stock} />
                      <StyledCardContent>{displayPercent}%</StyledCardContent>
                    </StyledCard>
                  );
                }
              })}
            </Grid>
          );
        })}
      </Grid>
      <AddTrade
        addTrade={addTrade}
        onClose={openAddTradeDialog}
        open={addTradeOpen}
        tradeObj={tradeObj}
        user={props.auth.user}
      />
      {openUpdateTradeDialog && (
        <UpdateTrade
          onClose={openUpdateTradeDialog}
          open={updateTradeOpen}
          tradeObj={updateTradeObj}
          updateTradeFn={updateTradeFn}
          user={props.auth.user}
        />
      )}
      <Fab
        onClick={openAddTradeDialog}
        style={{ bottom: 24, right: 24, position: 'absolute' }}
        variant="extended"
      >
        <AddIcon /> Add trade
      </Fab>
    </>
  );
}

Dashboard.propTypes = {
  auth: PropTypes.object,
  classes: PropTypes.object.isRequired,
  getTrades: PropTypes.func,
  history: PropTypes.object,
  trades: PropTypes.array
};

const mapStateToProps = state => ({
  auth: state.auth,
  trades: state.trades.trades
});

export default connect(
  mapStateToProps,
  { getTrades, createTrade, updateTrade }
)(withStyles(styles)(Dashboard));
