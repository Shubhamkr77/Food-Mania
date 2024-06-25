const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  const { order_data, order_date, email } = req.body;
  // console.log("Received request body:", req.body); //
  if (!order_data || !order_date || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let data = [...order_data];
  data.unshift({ Order_date: order_date });

  try {
    let eId = await Order.findOne({ email: email });
    //console.log(eId);

    if (eId === null) {
      await Order.create({
        email: email,
        order_data: [data],
      });
    } else {
      await Order.findOneAndUpdate(
        { email: email },
        { $push: { order_data: data } }
      );
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Server Error", message: error.message });
  }
});

router.post("/myorderData", async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    res.send("Server Error", error.message);
  }
});

// router.post("/orderData", async (req, res) => {
//   let data = req.body.order_data;
//   await data.splice(0, 0, { Order_date: req.body.order_date });

//   //if email not exisitng in db then create: else: InsertMany()
//   let eId = await Order.findOne({ email: req.body.email });
//   console.log(eId);
//   if (eId === null) {
//     try {
//       await Order.create({
//         email: req.body.email,
//         order_data: [data],
//       }).then(() => {
//         res.json({ success: true });
//       });
//     } catch (error) {
//       console.log(error.message);
//       res.send("Server Error", error.message);
//     }
//   } else {
//     try {
//       await Order.findOneAndUpdate(
//         { email: req.body.email },
//         { $push: { order_data: data } }
//       ).then(() => {
//         res.json({ success: true });
//       });
//     } catch (error) {
//       res.send("Server Error", error.message);
//     }
//   }
// });

module.exports = router;
