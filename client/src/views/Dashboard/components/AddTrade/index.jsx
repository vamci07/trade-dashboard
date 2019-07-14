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
  FormControlLabel
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import AxiosExample from 'components/Autocomplete';

function AddTrade(props) {
  const { open } = props;
  const [newTrade, setNewTrade] = useState({
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
  });

  const handleStockSelection = item => {
    setNewTrade({
      ...newTrade,
      stock: item.symbol,
      stockname: item.name
    });
  };

  function handleChange(event) {
    setNewTrade({
      ...newTrade,
      [event.target.name]: event.target.value
    });
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
    props.addTrade(newTrade);
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
        Add a new trade
      </DialogTitle>
      <DialogContent>
        <div style={{ width: '100%', justifyContent: 'center' }}>
          <AxiosExample handleStockSelection={handleStockSelection} />
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
            value={newTrade.action}
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
        </div>
        <TextField
          label="Quantity"
          name="stockquantity"
          onChange={event => handleChange(event)}
          value={newTrade.stockquantity}
          variant="filled"
        />
        <TextField
          label="Starting Price"
          name="startingprice"
          onChange={event => handleChange(event)}
          value={newTrade.startingprice}
          variant="filled"
        />
        <TextField
          label="Target Price"
          name="targetprice"
          onChange={event => handleChange(event)}
          value={newTrade.targetprice}
          variant="filled"
        />
        <TextField
          label="Stoploss"
          name="stoploss"
          onChange={event => handleChange(event)}
          value={newTrade.stoploss}
          variant="filled"
        />
        <TextField
          label="Reason for Trade"
          name="reasonfortrade"
          onChange={event => handleChange(event)}
          value={newTrade.reasonfortrade}
          variant="filled"
        />
        <TextField
          label="Closing Price"
          name="closingprice"
          onChange={event => handleChange(event)}
          value={newTrade.closingprice}
          variant="filled"
        />
        <TextField
          label="Reason for Exit"
          name="reasonforexit"
          onChange={event => handleChange(event)}
          value={newTrade.reasonforexit}
          variant="filled"
        />
        <TextField
          label="Emotional State"
          name="emotionalstate"
          onChange={event => handleChange(event)}
          value={newTrade.emotionalstate}
          variant="filled"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCreate}
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTrade;
