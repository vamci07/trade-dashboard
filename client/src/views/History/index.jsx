import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
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



  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      props.history.push('/');
    } else {
      props.getTrades('ALL');
      setTradesToState(props.trades);
    }
  }, []);
    
 async function setTradesToState(trades) {
    await setTrades(trades);
  }



  const useStyles1 = makeStyles(theme => ({
    root: {
      flexShrink: 0,
      color: theme.palette.text.primary,

      marginLeft: theme.spacing(2.5),
    },
  }));

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

//  function CustomPaginationActionsTable() {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.trades.length - page * rowsPerPage);

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
            <TableHead>
                <TableRow>
                  <TableCell align="right">Stock</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Action</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Starting Price</TableCell>
                  <TableCell align="right">Stoploss</TableCell>
                  <TableCell align="right">Target Price</TableCell>
                  <TableCell align="right">Closing Price</TableCell>
                  <TableCell align="right">Gain / Loss</TableCell>
                  <TableCell align="right">Emotions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {props.trades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(trade => {
                let gain;
                if(trade.closingprice) {
                  gain = ((trade.closingprice - trade.startingprice) * trade.stockquantity).toFixed(2);
                }
                else {
                  gain = '';
                }
                return (
                <TableRow key={trade.stock}>
                  <TableCell align="right">{trade.stock}</TableCell>
                  <TableCell align="right">{trade.stockname}</TableCell>
                  <TableCell align="right">{trade.action}</TableCell>
                  <TableCell align="right">{trade.stockquantity}</TableCell>
                  <TableCell align="right">{trade.startingprice}</TableCell>
                  <TableCell align="right">{trade.stoploss}</TableCell>
                  <TableCell align="right">{trade.targetprice}</TableCell>
                  <TableCell align="right">{trade.closingprice}</TableCell>
                  <TableCell align="right">{gain}</TableCell>
                  <TableCell align="right">{trade.emotionalstate}</TableCell>
                </TableRow>
                );
              })}

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
                  count={props.trades.length}
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
