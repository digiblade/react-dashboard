import { FavoriteBorder } from "@mui/icons-material";
import React from "react";
import { connect } from "react-redux";
import {
  addToCart,
  updateCart,
} from "../../../Redux/Actions/AddToCart/cartActions";
import profile from "../../../Assets/Image/profile.jpg";
import A_Input from "../../Atom/A_Input";
function P_ProductPage({
  productDetails,
  productVariant: pv,
  productQty: pq,
  addToCart,
  index,
  updateCart,
  onClose = () => {},
}) {
  const [colorVariant, setColorVariant] = React.useState(
    (pv && pv.colorDescription) || ""
  );
  const [productVariant, setProductVariant] = React.useState(pv ? pv : {});
  const [productQty, setProductQty] = React.useState(pq ? pq : 12);
  const [validation, setValidation] = React.useState({});
  const [validationCheck, setValidationCheck] = React.useState(false);
  const handleSelectColorVariant = (item) => {
    setColorVariant(item);
    setProductVariant({});
  };
  const handleProductVariant = (item) => {
    setProductVariant(item);
  };
  const handleQty = (event) => {
    if (event.target.id === "qty" && Number(event.target.value) < 12) {
      setValidation({ ...validation, qty: "Minimum QTY is 12" });
    } else if (event.target.id === "qty" && Number(event.target.value) > 100) {
      setValidation({ ...validation, qty: "Maximum QTY is 100" });
    } else {
      setValidation({ ...validation, qty: "" });
    }

    setProductQty(event.target.value);
  };
  const handleAddToCart = () => {
    let payload = {
      productDetails,
      productVariant,
      productQty,
    };
    if (pv) {
      updateCart(payload, index);
    } else {
      addToCart(payload);
    }
  };
  React.useEffect(() => {
    if (
      productQty > 11 &&
      productQty < 100 &&
      Object.keys(productVariant).length > 0
    ) {
      setValidationCheck(true);
    } else {
      setValidationCheck(false);
    }
  }, [validation, productQty, productVariant]);
  return (
    <div>
      {productDetails && typeof productDetails === "object" ? (
        <>
          <div className="">
            <FavoriteBorder className="fav-icon" />
            <img
              className="product-image"
              src={
                productDetails.productImages &&
                productDetails.productImages.length > 0
                  ? productDetails.productImages[0]
                  : profile
              }
              alt=""
            />
            .
            <div
              className="title "
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="">{productDetails.itemDescription}</div>
              {productVariant.grossPrice ? (
                <div className="">
                  {productDetails.currency.symbol} {productVariant.grossPrice}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="description">{"Lorem ipsum dummy text"}</div>
          </div>
          <h4>Please Select Color Descriptions</h4>
          <div className="radio-group">
            {[
              ...new Set(
                productDetails.variants.map((item) => item.colorDescription)
              ),
            ].map((item) => (
              <div
                onClick={() => handleSelectColorVariant(item)}
                className={`radio-item ${
                  colorVariant === item ? "active" : ""
                }`}
              >
                {item}{" "}
              </div>
            ))}
          </div>
          {colorVariant && colorVariant !== "" ? (
            <>
              <h4>Please Select Packaging Descriptions</h4>
              <div className="radio-group">
                {productDetails.variants
                  .filter((item) => item.colorDescription === colorVariant)
                  .map((item) => (
                    <div
                      onClick={() => handleProductVariant(item)}
                      className={`radio-item ${
                        productVariant.packingCode === item.packingCode
                          ? "active"
                          : ""
                      }`}
                    >
                      {item.packingDescription}
                    </div>
                  ))}
              </div>
            </>
          ) : (
            ""
          )}
          {productVariant.variantId ? (
            <>
              <h4>Enter Quantity</h4>
              <div className="radio-group">
                <A_Input
                  id="qty"
                  inputBarStyle={{ width: "100%" }}
                  style={{ width: "100%" }}
                  icon=" "
                  onChange={handleQty}
                  placeholder={"Add Quantity..."}
                  value={productQty}
                />
              </div>
              <span className="error">
                {validation && validation.qty ? validation.qty : ""}
              </span>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          className={`btn btn-primary ${validationCheck ? "" : "disabled"}`}
          style={{ padding: "0.6rem 3rem " }}
          onClick={() => {
            if (validationCheck) {
              handleAddToCart();
              onClose();
            }
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default connect(null, { addToCart, updateCart })(P_ProductPage);
