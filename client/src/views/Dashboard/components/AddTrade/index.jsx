import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@material-ui/core';
import { blue, common } from '@material-ui/core/colors';
import axios from 'axios';
import { AutoComplete } from 'antd';

function AddTrade(props) {
  const { open } = props;
  const [newTrade, setNewTrade] = useState({
    stock: '',
    action: '',
    stockquantity: null,
    startingprice: null,
    stoploss: null,
    targetprice: null,
    reasonfortrade: '',
    closingprice: null,
    reasonforexit: '',
    emotionalstate: '',
    owner: [
      {
        email: props.user.email,
        name: props.user.name
      }
    ]
  });

  function handleChange(event) {
    setNewTrade({
      ...newTrade,
      [event.target.name]: event.target.value
    });
  }

  function handleCreate() {
    props.addTrade(newTrade);
  }

  const [dataSource, setDataSource] = useState([]);
  const getTickerFromAPi = async e => {
    console.log(e);
    const response = await axios.get(
      `https://ticker-2e1ica8b9.now.sh/keyword/${e}`
    );
    console.log(response);
    const ArraysofData = response.data.map(f => [f.symbol + ' ,' + f.name]);
    const FlatArray = [].concat(...ArraysofData);
    setDataSource(FlatArray);
    //this.setState({ dataSource: FlatArray });
  };

  const [search, setSearch] = useState('');
  const handleSearch = e => {
    if (e) {
      getTickerFromAPi(e);
      setSearch({ search: e }, () => getTickerFromAPi(e));
      //this.setState({ search: e }, () => getTickerFromAPi(e));
    } else {
      setSearch(e);
      //this.setState({ search: e });
    }
  };

  const clearState = () => {
    setDataSource([]);
  };

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
          <TextField
            fullWidth
            label="Stock Name"
            name="stock"
            onChange={event => handleChange(event)}
            value={newTrade.stock}
            variant="filled"
          />
        </div>
        <AutoComplete
          dataSource={dataSource}
          onChange={e => handleSearch(e)}
          onSelect={clearState}
          placeholder="search Ticker"
          value={search}
        />
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
