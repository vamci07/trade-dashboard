import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { withStyles, Fab, CardActions, IconButton } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import {
  Add as AddIcon,
  Edit as UpdateIcon,
  DeleteOutline as DeleteIcon
} from '@material-ui/icons';
import {
  getTrades,
  createTrade,
  updateTrade,
  deleteTrade
} from 'store/actions/tradeActions';
import AddTrade from './components/AddTrade';
import { StyledCard, StyledCardHeader } from './style';
import { red, green, common } from '@material-ui/core/colors';
import UpdateTrade from './components/UpdateTrade';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  item: {
    height: '100%'
  }
});

function dashReducer(state, action) {
  switch (action.type) {
    case 'ADDTRADEDIALOG': {
      return { ...state, addTradeOpen: !state.addTradeOpen };
    }
    case 'UDPATETRADEDIALOG': {
      return { ...state, updateTradeOpen: !state.updateTradeOpen };
    }
    case 'TRADES': {
      return { ...state, trades: action.trades };
    }
    case 'SETTRADEOBJ': {
      return { ...state, tradeObj: action.tradeObj };
    }
    case 'UPDATETRADEOBJ': {
      return { ...state, updateTradeObj: action.trade };
    }
    case 'STOCKDATA': {
      return { ...state, stockData: action.data.data };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function Dashboard(props) {
  const [state, dispatch] = useReducer(dashReducer, {
    trades: [],
    addTradeOpen: false,
    updateTradeOpen: false,
    updateTradeObj: {},
    tradeObj: {
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
    },
    stockData: []
  });

  const {
    trades,
    addTradeOpen,
    updateTradeOpen,
    updateTradeObj,
    tradeObj,
    stockData
  } = state;

  async function addTrade(newTrade) {
    await props.createTrade(newTrade);
    dispatch({ type: 'SETTRADEOBJ', newTrade });
    dispatch({ type: 'ADDTRADEDIALOG' });
  }

  async function updateTradeFn(updateTradeObj) {
    console.log(updateTradeObj);
    await props.updateTrade(updateTradeObj);
    // await dispatch({ type: 'UPDATETRADEOBJ', updateTradeObj });
    dispatch({ type: 'UDPATETRADEDIALOG' });
  }

  async function deleteTrade(id) {
    await props.deleteTrade(id);
  }

  async function setTradesToState(trades) {
    dispatch({ type: 'TRADES', trades });
  }

  async function setTradeObjToState(trade) {
    dispatch({ type: 'SETTRADEOBJ', trade });
  }

  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      props.history.push('/');
    } else {
      props.getTrades('OPEN');
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
    const { trades } = props;
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
    let symString = '';
    if (Object.keys(trades).length > 0) {
      let openTrades = 0;
      trades &&
        trades.map(trade => {
          if (!trade.closingprice) {
            if (openTrades < 5) {
              symString = symString + trade.stock + ',';
            }
            openTrades++;
          }
        });
      if (symString.length > 0) {
        symString = symString.slice(0, -1);
        let params = {};
        params = symString && {
          symbol: symString,
          api_token:
            'gwfW78tA71XsiBYJbEQB8CgeL88K73aGiGfbpLEwaHszuYe5KpgMNWgSIsY3'
        };
        /* const headers = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept'
        }; */
        axios({
          url: 'https://api.worldtradingdata.com/api/v1/stock',
          method: 'get',
          params: params
        })
          .then(res => {
            const { data: data } = res;
            data && dispatch({ type: 'STOCKDATA', data });
          })
          // eslint-disable-next-line no-console
          .catch(err => console.log(err));
      }
    }
  }, [props.trades]);

  function openAddTradeDialog() {
    dispatch({ type: 'ADDTRADEDIALOG' });
  }

  function openUpdateTradeDialog(trade) {
    dispatch({ type: 'UPDATETRADEOBJ', trade });
    dispatch({ type: 'UDPATETRADEDIALOG' });
  }

  return (
    <>
      <Grid
        container
        spacing={4}
      >
        {trades &&
          trades.map(trade => {
            if (!trade.closingprice) {
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
                      console.log(trade);
                      return (
                        <StyledCard
                          color={color}
                          style={{ cursor: 'default' }}
                        >
                          <StyledCardHeader
                            title={
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'space-between'
                                }}
                              >
                                <span>{trade.stock}</span>
                                <span style={{ fontWeight: 600, fontSize: 14 }}>
                                  {displayPercent}
                                </span>
                              </div>
                            }
                          />
                          <CardActions
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-end'
                            }}
                          >
                            <IconButton
                              onClick={() => openUpdateTradeDialog(trade)}
                            >
                              <UpdateIcon style={{ color: common.white }} />
                            </IconButton>
                            <IconButton onClick={() => deleteTrade(trade._id)}>
                              <DeleteIcon style={{ color: common.white }} />
                            </IconButton>
                          </CardActions>
                        </StyledCard>
                      );
                    }
                  })}
                </Grid>
              );
            }
          })}
      </Grid>
      <AddTrade
        addTrade={addTrade}
        onClose={openAddTradeDialog}
        open={addTradeOpen}
        tradeObj={tradeObj}
        user={props.auth.user}
      />
      {updateTradeOpen && (
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
  classes: PropTypes.object,
  createTrade: PropTypes.func,
  getTrades: PropTypes.func,
  history: PropTypes.object,
  trades: PropTypes.array,
  updateTrade: PropTypes.func
};

const mapStateToProps = state => ({
  auth: state.auth,
  trades: state.trades.trades
});

export default connect(
  mapStateToProps,
  { getTrades, createTrade, updateTrade, deleteTrade }
)(withStyles(styles)(Dashboard));
