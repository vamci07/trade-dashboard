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
  FormControlLabel
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

function UpdateTrade(props) {
  const { open, tradeObj } = props;
  const [updateTradeObj, setUpdateTradeObj] = useState({});

  useEffect(() => {
    setUpdateTradeObj({
      ...updateTradeObj,
      _id: tradeObj._id || null,
      stock: tradeObj.stock,
      stockName: tradeObj.stockname,
      action: tradeObj.action,
      stockquantity: tradeObj.stockquantity,
      startingprice: tradeObj.startingprice,
      stoploss: tradeObj.stoploss,
      targetprice: tradeObj.targetprice,
      reasonfortrade: tradeObj.reasonfortrade,
      closingprice: tradeObj.closingprice,
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
    });
  }, [tradeObj]);

  function handleChange(event) {
    setUpdateTradeObj({
      ...updateTradeObj,
      [event.target.name]: event.target.value
    });
  }

  function evaluateOutcome() {
    // calculate gain
    if (updateTradeObj.closingprice) {
      if (updateTradeObj.action.toLowerCase() === 'buy') {
        updateTradeObj.gain = (
          (updateTradeObj.closingprice - updateTradeObj.startingprice) *
          updateTradeObj.stockquantity
        ).toFixed(2);

        if (updateTradeObj.closingprice > updateTradeObj.startingprice) {
          updateTradeObj.outcome = 'win';
        } else {
          updateTradeObj.outcome = 'loss';
        }

        const algoPercent = 0.1;
        if (
          (updateTradeObj.closingprice >
            updateTradeObj.targetprice * (1 - algoPercent) &&
          updateTradeObj.closingprice <
            updateTradeObj.targetprice * (1 + algoPercent))  ||
            (updateTradeObj.closingprice >
              updateTradeObj.stoploss * (1 - algoPercent) &&
            updateTradeObj.closingprice <
              updateTradeObj.stoploss * (1 + algoPercent))
        ) {
          updateTradeObj.followedplan = 'Y';
        } else updateTradeObj.followedplan = 'N';
      } else {
        updateTradeObj.gain = (
          (updateTradeObj.startingprice - updateTradeObj.closingprice) *
          updateTradeObj.stockquantity
        ).toFixed(2);
        if (updateTradeObj.closingprice < updateTradeObj.startingprice) {
          updateTradeObj.outcome = 'win';
        } else {
          updateTradeObj.outcome = 'loss';
        }

        const algoPercent = 0.1;
        if (
          (updateTradeObj.closingprice >
            updateTradeObj.targetprice * (1 - algoPercent) &&
          updateTradeObj.closingprice <
            updateTradeObj.targetprice * (1 + algoPercent)) ||
          (updateTradeObj.closingprice >
            updateTradeObj.stoploss * (1 - algoPercent) &&
          updateTradeObj.closingprice <
            updateTradeObj.stoploss * (1 + algoPercent))
        ) {
          updateTradeObj.followedplan = 'Y';
        } else updateTradeObj.followedplan = 'N';
      }
    } else {
      updateTradeObj.gain = '';
      updateTradeObj.outcome = '';
    }
  }

  function handleUpdate() {
    evaluateOutcome();
    props.updateTradeFn(updateTradeObj);
  }

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
            {updateTradeObj.stockName} - {updateTradeObj.stock}
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <RadioGroup
            name="action"
            onChange={event => handleChange(event)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center'
            }}
            value={updateTradeObj.action}
          >
            <FormControlLabel
              control={
                <Radio
                  checked={updateTradeObj.action === 'buy'}
                  color="primary"
                />
              }
              label="Buy"
              value="buy"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={updateTradeObj.action === 'sell'}
                  color="primary"
                />
              }
              label="Sell"
              value="sell"
            />
          </RadioGroup>
        </div>
        <TextField
          label="Quantity"
          name="stockquantity"
          onChange={event => handleChange(event)}
          value={updateTradeObj.stockquantity}
          variant="filled"
        />
        <TextField
          label="Starting Price"
          name="startingprice"
          onChange={event => handleChange(event)}
          value={updateTradeObj.startingprice}
          variant="filled"
        />
        <TextField
          label="Target Price"
          name="targetprice"
          onChange={event => handleChange(event)}
          value={updateTradeObj.targetprice}
          variant="filled"
        />
        <TextField
          label="Stoploss"
          name="stoploss"
          onChange={event => handleChange(event)}
          value={updateTradeObj.stoploss}
          variant="filled"
        />
        <TextField
          label="Reason for Trade"
          name="reasonfortrade"
          onChange={event => handleChange(event)}
          value={updateTradeObj.reasonfortrade}
          variant="filled"
        />
        <TextField
          label="Closing Price"
          name="closingprice"
          onChange={event => handleChange(event)}
          value={updateTradeObj.closingprice}
          variant="filled"
        />
        <TextField
          label="Reason for Exit"
          name="reasonforexit"
          onChange={event => handleChange(event)}
          value={updateTradeObj.reasonforexit}
          variant="filled"
        />
        <TextField
          label="Emotional State"
          name="emotionalstate"
          onChange={event => handleChange(event)}
          value={updateTradeObj.emotionalstate}
          variant="filled"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleUpdate}
          variant="contained"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateTrade;
