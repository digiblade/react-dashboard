import React from "react";
import profile from "../../../Assets/Image/profile.jpg";
import { connect } from "react-redux";
import M_NoContent from "../Response/M_NoContent";
import { Close, Edit } from "@mui/icons-material";
import A_SimpleDialog from "../../Atom/A_SimpleDialog";
import P_ProductPage from "../../Pages/ProductPage/P_ProductPage";
function M_Cart({ cartItems }) {
  const [selectedProduct, setSelectedProduct] = React.useState({});
  const handleSelectedProduct = (product, index) => {
    setSelectedProduct({ ...product, index });
  };
  return (
    <>
      {Array.isArray(cartItems) && cartItems.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems &&
              cartItems.map((item, index) => (
                <tr>
                  <td>
                    <div className="profile">
                      <img
                        src={
                          item.productDetails.productImages &&
                          item.productDetails.productImages.length > 0
                            ? item.productDetails.productImages[0]
                            : profile
                        }
                        className="circle-avatar"
                        alt=""
                      />
                      <div className="profile-details">
                        <div className="heading">
                          {item.productDetails.itemDescription}
                        </div>
                        <div className="subheading">
                          {item.productVariant.colorDescription} ,{" "}
                          {item.productVariant.packingDescription}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.productQty}</td>
                  <td>
                    {item.productDetails.currency.symbol}{" "}
                    {item.productVariant.grossPrice}/-
                  </td>
                  <td className="primary-color">
                    <Edit
                      onClick={() => {
                        handleSelectedProduct(item, index);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <M_NoContent />
      )}
      <A_SimpleDialog
        open={selectedProduct && selectedProduct.productDetails}
        header={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {(selectedProduct &&
              selectedProduct.productDetails &&
              selectedProduct.productDetails.itemDescription) ||
              ""}
            <Close
              onClick={() => {
                setSelectedProduct({ productDetails: false });
              }}
            />
          </div>
        }
        onClose={() => {
          setSelectedProduct({ productDetails: false });
        }}
        content={
          <P_ProductPage
            onClose={() => {
              setSelectedProduct({ productDetails: false });
            }}
            {...selectedProduct}
          />
        }
      />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};

export default connect(mapStateToProps)(M_Cart);
