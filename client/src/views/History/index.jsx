import React, { useEffect, useState } from 'react';
import ReactExport from "react-export-excel";
import PropTypes from 'prop-types';
import { makeStyles, useTheme, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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
import {
  SaveAlt as SaveAltIcon
} from '@material-ui/icons';
import { red, green, common } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import MUIDataTable from "mui-datatables";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { connect } from 'react-redux';
import { withStyles, Button } from '@material-ui/core';
import { getTrades } from 'store/actions/tradeActions';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;



function History(props) {
  const [, setTrades] = useState([]);

  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      props.history.push('/');
    } else {
      //      props.getTrades('ALL');
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

      marginLeft: theme.spacing(2.5)
    }
  }));


  const columns = [
    {
      name: "date",
      options: {
        label: 'Entry Date',
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const nf = value;
          return nf.slice(0,10);
        }
      }
    },
    {
      name: "stock",
      options: {
        label: 'Stock',
        filter: true
      }
    },
    {
      name: "stockname",
      options: {
        label: 'Stock Name',
        filter: false,
        }
    },
    {
      name: "action",
      options: {
        label: 'Action',
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const nf = value;
          return nf.toUpperCase();
        }
      }
    },
    {
      name: "stockquantity",
      options: {
        label: 'Stock Quantity',
        filter: false
      }
    },
    {
      name: "startingprice",
      options: {
        label: 'Starting Price',
        filter: false
      }
    },
    {
      name: "stoploss",
      options: {
        label: 'Stop Loss',
        filter: false,
        }
    },
    {
      name: "targetprice",
      options: {
        label: 'Target Price',
        filter: false
      }
    },
    {
      name: "closingprice",
      options: {
        label: 'Closing Price',
        filter: false
      }
    },
    {
      name: "gain",
      options: {
        label: 'Gain / Loss',
        filter: true,
        }
    },
    {
      name: "emotionalstate",
      options: {
        label: 'Emotional State',
        filter: true
      }
    },
    {
      name: "followedplan",
      options: {
        label: 'Plan Followed',
        filter: true
      }
    }
  ];

  const options = {
    filter: true,
    filterType: "multiselect",
    responsive: "scroll",
    selectableRows: "none"
//    resizableColumns: true
  };

  const useStyles2 = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3)
    },
    table: {
      minWidth: 500
    },
    tableWrapper: {
      overflowX: 'auto'
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    SaveAltIcon: {
      marginLeft: '875px',
      margintop: '24px'
    }
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
          aria-label="First Page"
          disabled={page === 0}
          onClick={handleFirstPageButtonClick}
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          aria-label="Previous Page"
          disabled={page === 0}
          onClick={handleBackButtonClick}
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          aria-label="Next Page"
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          onClick={handleNextButtonClick}
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          aria-label="Last Page"
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          onClick={handleLastPageButtonClick}
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
    rowsPerPage: PropTypes.number.isRequired
  };

  //function CustomPaginationActionsTable() {



  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.trades.length - page * rowsPerPage);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (

      <MUIDataTable
        title={"Trade List"}
        data={props.trades}
        columns={columns}
        options={options}
      />
  );
  //}
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
  { getTrades }
)(withStyles()(History));
