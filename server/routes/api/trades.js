const express = require("express");
const router = express.Router();
const passport = require("passport");

const Trade = require("../../models/Trade");
// Load input validation
const validateTradeInput = require("../../validation/trade");

// @route GET api/trades
// @desc Get all trades for a specific user
// @access Private
router.get(
  "/:action",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let tradesArr = [];
    let action = req.params.action;

    // Member trades
    await Trade.find({})
      .then(trades => {
        trades.map(trade => {
           trade.owner.map(member => {
            if (member.email == req.user.email) {
              tradesArr.push(trade);
/*              if(action == 'OPEN') {
                console.log('Get OPEN Trades');
                if (!trade.closingprice) {
                    tradesArr.push(trade);
                  }
                }
              else {
                console.log('Get ALL Trades');
                tradesArr.push(trade);
                console.log(tradesArr);
              } */
            }
          }); 
        });
      })
      .catch(err => console.log(err));

    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    // Combine with owner trades
    await Trade.find({ owner: OWNER })
      .then(trades => {
        let finalArr = [...trades, ...tradesArr];
        res.json(finalArr);
      })
      .catch(err => console.log(err));
  }
);

// @route GET api/trades/:id
// @desc Get specific trade by id
// @access Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    console.log('I am in get trades by ID');
    Trade.findById(id).then(trade => res.json(trade));
  }
);

// @route POST api/trades/create
// @desc Create a new trade
// @access Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // Form validation

    const { errors, isValid } = validateTradeInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    } 

    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    const NEW_TRADE = await new Trade({
      owner: OWNER,
      stock: req.body.stock,
      stockname: req.body.stockname,
      action: req.body.action,
      stockquantity: req.body.stockquantity,
      startingprice: req.body.startingprice,
      stoploss: req.body.stoploss,
      targetprice: req.body.targetprice,
      reasonfortrade: req.body.reasonfortrade,
      closingprice: req.body.closingprice,
      reasonforexit: req.body.reasonforexit,
      emotionalstate: req.body.emotionalstate,
      outcome: req.body.outcome,
      gain: req.body.gain,
      followedplan: req.body.followedplan
    });

    NEW_TRADE.save()
      .then(trade => res.json(trade))
      .catch(err => console.log(err));
  }
);

// @route PATCH api/trades/update
// @desc Update an existing trade
// @access Private
router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let tradeFields = {};

    tradeFields.stock = req.body.stock;
    tradeFields.action = req.body.action;
    tradeFields.stockquantity = req.body.stockquantity;
    tradeFields.startingprice = req.body.startingprice;
    tradeFields.stoploss = req.body.stoploss;
    tradeFields.targetprice = req.body.targetprice;
    tradeFields.reasonfortrade = req.body.reasonfortrade;
    tradeFields.closingprice = req.body.closingprice;
    tradeFields.reasonforexit = req.body.reasonforexit;
    tradeFields.emotionalstate = req.body.emotionalstate;
    tradeFields.outcome = req.body.outcome;
    tradeFields.gain = req.body.gain;
    tradeFields.followedplan = req.body.followedplan;

    Trade.findOneAndUpdate(
      { _id: req.body._id },
      { $set: tradeFields },
      { new: true }
    )
      .then(trade => {
        res.json(trade);
      })
      .catch(err => console.log(err));
  }
);

// @route DELETE api/trades/delete/:id
// @desc Delete an existing trade
// @access Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Trade.findById(req.params.id).then(trade => {
      trade.remove().then(() => res.json({ success: true }));
    });
  }
);

module.exports = router;
