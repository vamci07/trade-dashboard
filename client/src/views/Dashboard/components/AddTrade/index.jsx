import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
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
  Typography,
  withStyles} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import AxiosExample from 'components/Autocomplete';
import _ from 'underscore';
import validate from 'validate.js';
import schema from './1.';
import { connect } from 'react-redux';
import styles from './styles';
import NumberFormat from 'react-number-format';

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
      stock: '',
 //     stockname: '',
      action: '',
      stockquantity: null,
      startingprice: null,
      stoploss: null,
      targetprice: null,
      reasonfortrade: '',
      closingprice: null,
      reasonforexit: '',
      emotionalstate: ''
    },
    errors: {
      stock: '',
 //     stockname: '',
      action: '',
      stockquantity: null,
      startingprice: null,
      stoploss: null,
      targetprice: null,
      reasonfortrade: '',
      closingprice: null,
      reasonforexit: '',
      emotionalstate: ''
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
  }, 2000);


  const handleStockSelection = item => {
    setNewTrade({
      ...newTrade,
      stock: item.symbol,
      stockname: item.name
    });
  };

  function handleChange(field,event) {
    const newState = { ...newTrade };
    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = event.target.value;
    setNewTrade(newState); 
 /*   setNewTrade({
      ...newTrade,
      [event.target.name]: event.target.value
    });*/
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

  async function handleCreate() {
    evaluateOutcome();
//    props.addTrade(newTrade);

    try {
      const newState = { ...newTrade };
      newState.isLoading = true;
      setNewTrade(newState);
      await props.addTrade(newTrade);;
    } catch (error) {
      newTrade({
        ...newTrade,
        isLoading: false,
        submitError: error
      });
    }
  }

  const { classes } = props;
  const {
    isLoading,
    values,
    touched,
    errors,
    isValid,
    submitError
  } = newTrade;

  const showActionError = errors.action;
  const showstockquantityError = errors.stockquantity;
  const showstartingpriceError = touched.startingprice && errors.startingprice;
  const showstoplossError = touched.stoploss && errors.stoploss;
  const showtargetpriceError = touched.targetprice && errors.targetprice;
  const showreasonfortradeError = touched.reasonfortrade && errors.reasonfortrade;

  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
        }}
        thousandSeparator
      />
    );
  }



  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
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
          <AxiosExample handleStockSelection={handleStockSelection} />
        </div>
        <div style={{ width: '100%' }}>
          <RadioGroup
            name="action"
            onChange={event => handleChange('action',  event)}
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
          {showActionError && (
                <Typography
                className={classes.fieldError}
                  variant="body2"
                >
                  {errors.action[0]}
                </Typography>
              )}
        </div>
        <div className={classes.field}>
          <TextField
            label="Quantity"
            name="stockquantity"
            onChange={event => handleChange('stockquantity',  event)}
            value={values.stockquantity}
            variant="filled"
/*            InputProps={{
              inputComponent: NumberFormatCustom,
            }}*/
          />
          {showstockquantityError && (
                <Typography
                className={classes.fieldError}
                  variant="body2"
                >
                  {errors.stockquantity[0]}
                </Typography>
              )}
        </div>
        <TextField
          label="Starting Price"
          name="startingprice"
          onChange={event => handleChange('startingprice',  event)}
          value={values.startingprice}
          variant="filled"
 /*         InputProps={{
            inputComponent: NumberFormatCustom,
          }} */
        />
        <TextField
          label="Target Price"
          name="targetprice"
          onChange={event => handleChange('targetprice',  event)}
          value={values.targetprice}
          variant="filled"
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
        <TextField
          label="Stoploss"
          name="stoploss"
          onChange={event => handleChange('stoploss',  event)}
          value={values.stoploss}
          variant="filled"
        />
        <TextField
          label="Reason for Trade"
          name="reasonfortrade"
          onChange={event => handleChange('reasonfortrade',  event)}
          value={values.reasonfortrade}
          variant="filled"
        />
        <TextField
          label="Closing Price"
          name="closingprice"
          onChange={event => handleChange('closingprice',  event)}
          value={values.closingprice}
          variant="filled"
        />
        <TextField
          label="Reason for Exit"
          name="reasonforexit"
          onChange={event => handleChange('reasonforexit',  event)}
          value={values.reasonforexit}
          variant="filled"
        />
        <TextField
          label="Emotional State"
          name="emotionalstate"
          onChange={event => handleChange('emotionalstate',  event)}
          value={values.emotionalstate}
          variant="filled"
        />
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

AddTrade.propTypes = {
  auth: PropTypes.object,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps
)(
  compose(
    withRouter,
    withStyles(styles)
  )(AddTrade)
);

