import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Card, CardHeader, Fab } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { Dashboard as DashboardLayout } from 'layouts';
import { getTrades, createTrade } from 'store/actions/tradeActions';
import AddTrade from './components/AddTrade';

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

  async function addTrade(newTrade) {
    await props.createTrade(newTrade);
    setAddTradeOpen(!addTradeOpen);
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
  }, [props.trades]);

  function openAddTradeDialog() {
    setAddTradeOpen(!addTradeOpen);
  }

  const { classes } = props;
  return (
    <DashboardLayout title="Dashboard">
      <div className={classes.root}>
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
                <Card>
                  <CardHeader title={trade.stock} />
                </Card>
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
        <Fab
          onClick={openAddTradeDialog}
          style={{ bottom: 24, right: 24, position: 'absolute' }}
          variant="extended"
        >
          <AddIcon /> Add trade
        </Fab>
      </div>
    </DashboardLayout>
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
  { getTrades, createTrade }
)(withStyles(styles)(Dashboard));
