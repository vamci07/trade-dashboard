import React, { useState, useEffect } from 'react';
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
import { blue, red} from '@material-ui/core/colors';
import validate from 'validate.js';
import _ from 'underscore';
import schema from './schema';

function UpdateTrade(props) {
  const { open, tradeObj } = props;
  const [updateTradeObj, setUpdateTradeObj] = useState({
    values: {
    _id: '',
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

  useEffect(() => {
    setUpdateTradeObj({
      ...updateTradeObj,
      values: {
      _id: tradeObj._id || null,
      stock: tradeObj.stock,
      stockName: tradeObj.stockname,
      action: tradeObj.action,
      stockquantity: String(tradeObj.stockquantity),
      startingprice:  String(tradeObj.startingprice),
      stoploss:  String(tradeObj.stoploss),
      targetprice:  String(tradeObj.targetprice),
      reasonfortrade: tradeObj.reasonfortrade,
      closingprice:  tradeObj.closingprice,
      reasonforexit: tradeObj.reasonforexit,
      emotionalstate: tradeObj.emotionalstate,
      outcome: tradeObj.outcome,
      gain: tradeObj.gain,
      followedplan: tradeObj.followedplan,
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
  }, [tradeObj]);

  const validateForm = _.debounce(() => {
    const { values } = updateTradeObj;
    const newState = { ...updateTradeObj };
    const errors = validate(values, schema);
    newState.errors = errors || {};
    newState.isValid = errors ? false : true;
    setUpdateTradeObj(newState);
  }, 300);

  function handleChange(field, value) {
    const newState = { ...updateTradeObj };
    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;
    setUpdateTradeObj(newState);
    validateForm();
  }

  function evaluateOutcome() {
    // calculate gain
    if (values.closingprice) {
      if (values.action.toLowerCase() === 'buy') {
        values.gain = (
          (values.closingprice - values.startingprice) *
          values.stockquantity
        ).toFixed(2);

        if (values.closingprice > values.startingprice) {
          values.outcome = 'win';
        } else {
          values.outcome = 'loss';
        }

        const algoPercent = 0.05;
        if (
          (values.closingprice >
            values.targetprice * (1 - algoPercent) &&
          values.closingprice <
            values.targetprice * (1 + algoPercent))  ||
            (values.closingprice >
              values.stoploss * (1 - algoPercent) &&
            values.closingprice <
              values.stoploss * (1 + algoPercent))
        ) {
          values.followedplan = 'Y';
        } else values.followedplan = 'N';
      } else {
        values.gain = (
          (values.startingprice - values.closingprice) *
          values.stockquantity
        ).toFixed(2);
        if (values.closingprice < values.startingprice) {
          values.outcome = 'win';
        } else {
          values.outcome = 'loss';
        }

        const algoPercent = 0.05;
        if (
          (values.closingprice >
            values.targetprice * (1 - algoPercent) &&
          values.closingprice <
            values.targetprice * (1 + algoPercent)) ||
          (values.closingprice >
            values.stoploss * (1 - algoPercent) &&
          values.closingprice <
            values.stoploss * (1 + algoPercent))
        ) {
          values.followedplan = 'Y';
        } else values.followedplan = 'N';
      }
    } else {
      values.gain = '';
      values.outcome = '';
    }
  }

  function handleUpdate() {
    evaluateOutcome();
    props.updateTradeFn(values);
  }


  const {
    isLoading,
    values,
    touched,
    errors,
    isValid,
    submitError
  } = updateTradeObj;

//  console.log(updateTradeObj);
//  const showstockError = touched.stock && errors.stock;
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
        Update trade
      </DialogTitle>
      <DialogContent>
        <div style={{ width: '100%', justifyContent: 'center' }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 600,
              margin: '16px 8px'
            }}
          >
            {values.stockName} - {values.stock}
          </div>
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
              control={
                <Radio
                  checked={values.action === 'buy'}
                  color="primary"
                  disabled={true}
                />
              }
              label="Buy"
              value="buy"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={values.action === 'sell'}
                  color="primary"
                  disabled={true}
                />
              }
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
          onClick={handleUpdate}
          disabled={!isValid}
          variant="contained"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateTrade;
