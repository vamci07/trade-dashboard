import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography
} from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import AxiosExample from 'components/Autocomplete';
import validate from 'validate.js';
import _ from 'underscore';
import schema from './schema';


function AddTrade(props) {
  const { open } = props;
  const [newTrade, setNewTrade] = useState({
    values: {
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
    gain: '',
    followedplan: '',
    owner: [
      {
        email: props.user.email,
        name: props.user.name
      }
    ]
    },
    touched: {
    stock: false,
    action: false,
    stockquantity: false,
    startingprice: false,
    stoploss: false,
    targetprice: false,
    reasonfortrade: false,
    closingprice: false,
    },
    errors: {
    stock: null,
    action: null,
    stockquantity: null,
    startingprice: null,
    stoploss: null,
    targetprice: null,
    reasonfortrade: null,
    closingprice: null,
    },
    isValid: false,
    isLoading: false,
    submitError: null
  });

  const validateForm = _.debounce(() => {
    const { values } = newTrade;
    const newState = { ...newTrade };
    const errors = validate(values, schema);
    newState.errors = errors || {};
    newState.isValid = errors ? false : true;
    setNewTrade(newState);
  }, 300);

  const handleStockSelection = item => {
/*
    setNewTrade({
      ...newTrade,
      stock: item.symbol,
      stockname: item.name
    }); 
*/
    const newState = { ...newTrade };
    newState.submitError = null;
    let field = 'stock';
    let fieldname = 'stockname';
    newState.touched[field] = true;
    newState.values[field] = item.symbol;
    newState.values[fieldname] = item.name;
    setNewTrade(newState);
    validateForm();
  };

  function handleChange(field, value) {
    const newState = { ...newTrade };
    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;
    setNewTrade(newState);
    validateForm();
  }

  function evaluateOutcome() {
  
  // evaluate gain, outcome & followedplan
    if(newTrade.closingprice) {
      if(newTrade.action.toLowerCase() === 'buy') {
        newTrade.gain = ((newTrade.closingprice - newTrade.startingprice) * newTrade.stockquantity).toFixed(2);

        if(newTrade.closingprice > newTrade.startingprice) {
          newTrade.outcome = 'win';
        }
        else {
          newTrade.outcome = 'loss';
        }

        const algoPercent = 0.05;
        if ( ( (newTrade.closingprice > newTrade.targetprice*(1 - algoPercent) ) &&
            (newTrade.closingprice < newTrade.targetprice*(1 + algoPercent) ) ) ||
            ( (newTrade.closingprice > newTrade.stoploss*(1 - algoPercent) ) &&
            (newTrade.closingprice < newTrade.stoploss*(1 + algoPercent) ) ) 
        )
            {
              newTrade.followedplan = 'Y';
            } else newTrade.followedplan = 'N';
      }
      else {
        newTrade.gain = ((newTrade.startingprice - newTrade.closingprice) * newTrade.stockquantity).toFixed(2);

        if(newTrade.closingprice < newTrade.startingprice) {
          newTrade.outcome = 'win';
        }
        else {
          newTrade.outcome = 'loss';
        }

        const algoPercent = 0.05;
        if ( ( (newTrade.closingprice > newTrade.targetprice*(1 - algoPercent) ) &&
            (newTrade.closingprice < newTrade.targetprice*(1 + algoPercent) ) ) ||
            ( (newTrade.closingprice > newTrade.stoploss*(1 - algoPercent) ) &&
            (newTrade.closingprice < newTrade.stoploss*(1 + algoPercent) ) )
        ){
              newTrade.followedplan = 'Y';
            } else newTrade.followedplan = 'N';
      }
    }
    else {
      newTrade.gain = '';
      newTrade.outcome = '';
    }
  }

  function handleCreate() {
    evaluateOutcome();
    props.addTrade(values);
  }

  //const { classes, className } = props;
  const {
    isLoading,
    values,
    touched,
    errors,
    isValid,
    submitError
  } = newTrade;

  const showstockError = touched.stock && errors.stock;
  const showactionError = touched.action && errors.action;
  const showstockquantityError = touched.stockquantity && errors.stockquantity;
  const showstartingpriceError = touched.startingprice && errors.startingprice;
  const showtargetpriceError = touched.targetprice && errors.targetprice;
  const showstoplossError = touched.stoploss && errors.stoploss;
  const showreasonfortradeError = touched.reasonfortrade && errors.reasonfortrade;
  const showclosingpriceError = touched.closingprice && errors.closingprice;

  return (
    <Dialog
      keepMounted
      onClose={props.onClose}
      open={open}
      PaperProps={{
        style: {
          width: 480
        }
      }}>
      <DialogTitle style={{ backgroundColor: blue[500] }}>
        Add a new trade
      </DialogTitle>
      <DialogContent>
        <div style={{ width: '100%', justifyContent: 'center' }}>
          <AxiosExample handleStockSelection={handleStockSelection} />
          {showstockError && (
                <Typography
                  variant="body2"
                  style={{ color : red[300] }}
                >
                  {errors.stock[0]}
                </Typography>
              )}
        </div>
        <div style={{ width: '100%' }}>
          <RadioGroup
            name="action"
            onChange={event => handleChange('action', event.target.value)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center'
            }}
            value={values.action}
          >
            <FormControlLabel
              control={<Radio color="primary" />}
              label="Buy"
              value="buy"
            />
            <FormControlLabel
              control={<Radio color="primary" />}
              label="Sell"
              value="sell"
            />
          </RadioGroup>
          {showactionError && (
                <Typography
                  variant="body2"
                  style={{ color : red[300] }}
                >
                  {errors.action[0]}
                </Typography>
              )}
        </div>
        <div>
          <TextField
            label="Quantity"
            name="stockquantity"
            onChange={event => handleChange('stockquantity', event.target.value)}
            value={values.stockquantity}
            variant="filled"
          />
          {showstockquantityError && (
                <Typography
                  variant="body2"
                  style={{ color : red[300] }}
                >
                  {errors.stockquantity[0]}
                </Typography>
              )}
        </div>        
        <div>
          <TextField
            label="Starting Price"
            name="startingprice"
            onChange={event => handleChange('startingprice', event.target.value)}
            value={values.startingprice}
            variant="filled"
          />
          {showstartingpriceError && (
                <Typography
                  variant="body2"
                  style={{ color : red[300] }}
                >
                  {errors.startingprice[0]}
                </Typography>
              )}
        </div>
        <div>
          <TextField
            label="Target Price"
            name="targetprice"
            onChange={event => handleChange('targetprice', event.target.value)}
            value={values.targetprice}
            variant="filled"
          />
          {showtargetpriceError && (
                <Typography
                  variant="body2"
                  style={{ color : red[300] }}
                >
                  {errors.targetprice[0]}
                </Typography>
              )}
        </div>
        <div>
          <TextField
            label="Stoploss"
            name="stoploss"
            onChange={event => handleChange('stoploss', event.target.value)}
            value={values.stoploss}
            variant="filled"
          />
          {showstoplossError && (
                <Typography
                  variant="body2"
                  style={{ color : red[300] }}
                >
                  {errors.stoploss[0]}
                </Typography>
              )}
        </div>
        <div>
          <TextField
            label="Reason for Trade"
            name="reasonfortrade"
            onChange={event => handleChange('reasonfortrade', event.target.value)}
            value={values.reasonfortrade}
            variant="filled"
          />
          {showreasonfortradeError && (
                <Typography
                  variant="body2"
                  style={{ color : red[300] }}
                >
                  {errors.reasonfortrade[0]}
                </Typography>
              )}
        </div>
        <div>
          <TextField
            label="Closing Price"
            name="closingprice"
            onChange={event => handleChange('closingprice', event.target.value)}
            value={values.closingprice}
            variant="filled"
          />
          {showclosingpriceError && (
                <Typography
                  variant="body2"
                  style={{ color : red[300] }}
                >
                  {errors.closingprice[0]}
                </Typography>
              )}
        </div>
        <div>
          <TextField
            label="Reason for Exit"
            name="reasonforexit"
            onChange={event => handleChange('reasonforexit', event.target.value)}
            value={values.reasonforexit}
            variant="filled"
          />
        </div>
        <div>
          <TextField
            label="Emotional State"
            name="emotionalstate"
            onChange={event => handleChange('emotionalstate', event.target.value)}
            value={values.emotionalstate}
            variant="filled"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCreate}
          disabled={!isValid}
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTrade;