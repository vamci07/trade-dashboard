import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import axios from 'axios';

import { connect } from 'react-redux';
import { withStyles, Fab } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { getTrades } from 'store/actions/tradeActions';
import { StyledCard, StyledCardHeader, StyledCardContent } from './style';
import { red, green } from '@material-ui/core/colors';

function History(props) {
  const [trades, setTrades] = useState([]);
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

  /*
  // Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  item: {
    height: '100%'
  }
});*/

   // const [stockData, setStockData] = useState([]);
  
    
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
      console.log('getTrades ALL');
      props.getTrades('ALL');
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

  const useStyles1 = makeStyles(theme => ({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing(2.5),
    },
  }));


  const rows = [
    createData('Cupcake', 305, 3.7),
    createData('Donut', 452, 25.0),
    createData('Eclair', 262, 16.0),
    createData('Frozen yoghurt', 159, 6.0),
    createData('Gingerbread', 356, 16.0),
    createData('Honeycomb', 408, 3.2),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Jelly Bean', 375, 0.0),
    createData('KitKat', 518, 26.0),
    createData('Lollipop', 392, 0.2),
    createData('Marshmallow', 318, 0),
    createData('Nougat', 360, 19.0),
    createData('Oreo', 437, 18.0),
  ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

  const useStyles2 = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    table: {
      minWidth: 500,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  }));


  function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    function handleFirstPageButtonClick(event) {
      onChangePage(event, 0);
    }

    function handleBackButtonClick(event) {
      onChangePage(event, page - 1);
    }

    function handleNextButtonClick(event) {
      onChangePage(event, page + 1);
    }

    function handleLastPageButtonClick(event) {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };


  function createData(name, calories, fat) {
    return { name, calories, fat };
  }

//  function CustomPaginationActionsTable() {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, trades.length - page * rowsPerPage);

    function handleChangePage(event, newPage) {
      setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
      setRowsPerPage(parseInt(event.target.value, 10));
    }
   

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableBody>
              {trades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(trade => (
                <TableRow key={trade.stock}>
                  <TableCell component="th" scope="row">
                    {trade.stock}
                  </TableCell>
                  <TableCell align="right">{trade.startingprice}</TableCell>
                  <TableCell align="right">{trade.closingprice}</TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={trades.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'Rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
 // }




}


History.propTypes = {
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
  { getTrades}
)(withStyles()(History));
