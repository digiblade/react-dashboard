import React from "react";
import A_Input from "../../Atom/A_Input";
import { connect } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { placeOrder } from "../../../Redux/Actions/AddToCart/cartActions";
import M_NoContent from "../Response/M_NoContent";

function M_Order({ cartItems, placeOrder }) {
  const [amount, setAmount] = React.useState({});
  const [open, setState] = React.useState(false);
 
  const handleClose = () => {
    setState(false);
  };
  const handleClick = () => {
    setState(true);
    placeOrder();
  };
  React.useEffect(() => {
    getCalculativeValue();
  }, [cartItems]);
  const getCalculativeValue = () => {
    let total = 0.0;
    let symbol = "";
    cartItems.forEach((product) => {
      symbol = product.productDetails.currency.symbol;
      total +=
        product.productQty * parseFloat(product.productVariant.grossPrice);
    });
    total = parseFloat(total).toFixed(2);
    let tax = parseFloat(total / 9).toFixed(2);
    let orderTotal = parseFloat(
      parseFloat(tax * 3) + parseFloat(total)
    ).toFixed(2);
    setAmount({ tax, total, orderTotal, symbol });
  };
  return (
    <>
      {cartItems && Array.isArray(cartItems) && cartItems.length > 0 ? (
        <div>
          <h4>Purchase Order Number</h4>
          <A_Input
            id="qty"
            inputBarStyle={{ width: "100%" }}
            style={{ width: "100%" }}
            icon=" "
            // onChange={handleQty}
            placeholder={"Add Quantity..."}
            value={"12245458789"}
          />
          <div className="" style={{ paddingTop: "1rem" }}>
            <div className="title">Addresses</div>
            <div className="description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque,
              iste nulla.
            </div>
          </div>

          <div
            className=""
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="title text-gray">Items total</div>
            <div className="title text-gray">
              {amount.symbol} {amount.total}
            </div>
          </div>
          <div
            className=""
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="title text-gray">SGST (9%)</div>
            <div className="title text-gray">
              {amount.symbol} {amount.tax}
            </div>
          </div>
          <div
            className=""
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="title text-gray">CGST (9%)</div>
            <div className="title text-gray">
              {amount.symbol} {amount.tax}
            </div>
          </div>
          <div
            className=""
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="title text-gray">IGST (9%)</div>
            <div className="title text-gray">
              {amount.symbol} {amount.tax}
            </div>
          </div>
          <hr />
          <div
            className=""
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="title text-gray">Order Total</div>
            <div className="title text-gray">
              {amount.symbol} {amount.orderTotal}
            </div>
          </div>
          <div
            className=""
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button className="btn" onClick={placeOrder}>Clear Cart</button>
            <button className="btn btn-primary" onClick={handleClick}>
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <M_NoContent />
      )}
      
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Order Placed!
        </Alert>
      </Snackbar>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};

export default connect(mapStateToProps, { placeOrder })(M_Order);
