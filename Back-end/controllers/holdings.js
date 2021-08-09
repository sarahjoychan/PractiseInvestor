const User = require('../models/userModel');

// when user buys/sells a holding
// router.put('/users/:username', updateUser)//when user adds/deletes a holding affects cash, activities,
// req.body = {date, company, action, quanitity, price} //basically sends the acitivty

// push onto acitivities of user
// change the cash amount left : cash - netamount
async function pushActivityChangeCash(username, activity) {
  return await User.findOneAndUpdate(
    { userName: username },
    {
      $push: { activities: { $each: [activity], $position: 0 } }, // push to front of array
      $inc: { cash: activity.action === 'buy' ? -Number((activity.netAmount).toFixed(2)) : activity.netAmount },
    },
    { new: true }, // when you send the put request you can actualy see the new user object in the the res.body
  );
}

exports.updateHoldings = async (req, res) => {
  try {
    const username = req.user.userName;
    const activity = req.body;

    if (!username) return res.status(401).send({ message: 'Unauthenticated' }); // 401 - unauthenticated error

    let updatedUser = await pushActivityChangeCash(username, activity);

    /// /////////////////////////////////////////////////////////////////////////////////////
    // add or delete from holdings, if holdings zero need to remove the whole object for that company
    const userHoldings = (await User.findOne({ userName: username }, 'holdings')).holdings;
    let companyHolding = userHoldings.filter((userHolding) => userHolding.company === activity.company)[0];

    if (activity.action === 'buy') { // checks if its a buy order
      if (companyHolding) { // checks if currently owns the stock
        // add to current quanity and calculate new avg cost
        companyHolding.avgCost = Number((((companyHolding.avgCost * companyHolding.quantity) + activity.netAmount) / (companyHolding.quantity + activity.quantity)).toFixed(2));
        companyHolding.quantity += activity.quantity;
      } else { // else if doesnt own the stock currently then add the new holding
        companyHolding = {
          company: activity.company,
          ticker: activity.ticker,
          quantity: activity.quantity,
          avgCost: Number((activity.price).toFixed(2)),
        };
        updatedUser = await User.findOneAndUpdate(
          { userName: username },
          { $push: { holdings: companyHolding } },
          { new: true },
        );
        res.status(200);
        res.send(updatedUser);
        return;
      }
    } else { // if a sell order
      // if selling all your current shares remove the whole object
      if (activity.quantity === companyHolding.quantity) companyHolding = false;
      // if less than total quanitity, subtract from current quantiity
      else companyHolding.quantity -= activity.quantity;
    }

    // I have to do this above i think?
    if (companyHolding) {
      // update object in database
      updatedUser = await User.findOneAndUpdate(
        { userName: username },
        { // coundlt figure out a way to replace the holding object
          $pull: { holdings: { company: activity.company } }, // delete holdings
        },
        { new: true },
      );
      updatedUser = await User.findOneAndUpdate(
        { userName: username },
        { // coundlt figure out a way to replace the holding object
          $push: { holdings: companyHolding }, // delete holdings
        },
        { new: true },
      );
    } else {
      // remove from database the holding index in array
      updatedUser = await User.findOneAndUpdate(
        { userName: username },
        { $pull: { holdings: { company: activity.company } } }, // removes element in array
        { new: true },
      );
    }
    res.status(200);
    res.send(updatedUser);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};
