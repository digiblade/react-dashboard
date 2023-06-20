import "./App.css";
import React from "react";
import profile from "./Assets/Image/profile.jpg";
import M_Category from "./Component/Molecule/Cards/M_Category";
import M_ProductCard from "./Component/Molecule/Cards/M_ProductCard";
import A_Input from "./Component/Atom/A_Input";
import M_Navbar from "./Component/Molecule/Navbar/M_Navbar";
import M_Drawer from "./Component/Molecule/Drawer/M_Drawer";
import M_Cart from "./Component/Molecule/Cart/M_Cart";
import { httpGet } from "./Api/Api";
import A_Skeleton from "./Component/Atom/A_Skeleton ";
import M_NoContent from "./Component/Molecule/Response/M_NoContent";
import A_SimpleDialog from "./Component/Atom/A_SimpleDialog";
import P_ProductPage from "./Component/Pages/ProductPage/P_ProductPage";
import { Close } from "@mui/icons-material";
import M_Order from "./Component/Molecule/Order/M_Order";
function App() {
  const [categories, setCategories] = React.useState([]);
  const [subCategories, setSubCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [idCollections, setIdCollections] = React.useState({});
  const [loadingTracker, setLoadingTracker] = React.useState({});
  const [selectedProduct, setSelectedProduct] = React.useState({});
  React.useEffect(() => {
    getCategories();
  }, []);
  const handleCategoryClick = (categoryId) => {
    let tempIdCollection = { ...idCollections };
    delete tempIdCollection.subCategoryId;
    setIdCollections({ ...tempIdCollection, categoryId });
    setProducts([]);
    setSubCategories([]);
    getSubCategories(categoryId);
  };
  const handleSubCategoryClick = (subCategoryId) => {
    let tempIdCollection = { ...idCollections };
    setIdCollections({ ...tempIdCollection, subCategoryId });
    setProducts([]);
    getProducts(subCategoryId);
  };
  const getCategories = async () => {
    let tempLoadingTracker = { ...loadingTracker };
    setLoadingTracker({ ...tempLoadingTracker, category: true });
    let responseData = await httpGet("getCategories.json");
    console.log(responseData.result);
    setCategories(responseData.result || []);
    setLoadingTracker({ ...tempLoadingTracker, category: false });
  };

  const getSubCategories = async (id) => {
    let tempLoadingTracker = { ...loadingTracker };
    setLoadingTracker({ ...tempLoadingTracker, subCategory: true });
    let responseData = await httpGet(`getSubCategory_${id}.json`);
    setSubCategories(responseData.result || []);
    setLoadingTracker({ ...tempLoadingTracker, subCategory: false });
  };
  const getProducts = async (id) => {
    let tempLoadingTracker = { ...loadingTracker };
    setLoadingTracker({ ...tempLoadingTracker, products: true });
    let responseData = await httpGet(`getProduct_${id}.json`);
    setProducts(responseData.result || []);
    setLoadingTracker({ ...tempLoadingTracker, products: false });
  };
  const handleOnClick = (product) => {
    setSelectedProduct({ productDetails: product });
  };
  return (
    <div>
      <header>
        <M_Navbar />
      </header>
      <main>
        <div className="dashboard">
          <M_Drawer />
          <div className="card-section span-6">
            <div className="section-header">
              <div className="section-title">Print Heads</div>
              <A_Input placeholder={"Search..."} />
            </div>

            <div className="section-body">
              <h3>Categories</h3>
              {loadingTracker && loadingTracker.category !== true ? (
                <>
                  {categories.length > 0 ? (
                    <div className="category">
                      {categories.map((category) => (
                        <M_Category
                          onClick={handleCategoryClick}
                          profile={category.categoryImageURL || profile}
                          categoryName={category.categoryName}
                          id={category.categoryId}
                          key={category.categoryId}
                          active={
                            category.categoryId === idCollections.categoryId
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <A_Skeleton />
              )}
              {categories.length > 0 &&
              idCollections.categoryId &&
              idCollections.categoryId !== "" ? (
                <>
                  <hr />
                  <h3>Sub Categories</h3>
                  <div className="category">
                    {loadingTracker && loadingTracker.subCategory !== true ? (
                      <>
                        {subCategories.length > 0 ? (
                          <div className="category">
                            {subCategories.map((subCategory) => (
                              <M_Category
                                onClick={handleSubCategoryClick}
                                profile={
                                  subCategory.subCategoryImageURL || profile
                                }
                                categoryName={subCategory.subCategoryName}
                                id={subCategory.subCategoryId}
                                key={subCategory.subCategoryId}
                                active={
                                  subCategory.subCategoryId ===
                                  idCollections.subCategoryId
                                }
                              />
                            ))}
                          </div>
                        ) : (
                          <M_NoContent />
                        )}
                      </>
                    ) : (
                      <A_Skeleton />
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
              {subCategories.length > 0 &&
              idCollections.subCategoryId &&
              idCollections.subCategoryId !== "" ? (
                <>
                  <hr />
                  <h3>Products</h3>
                  {products.length > 0 ? (
                    <div className="product">
                      {loadingTracker && loadingTracker.products !== true ? (
                        <>
                          {products.map((product) => (
                            <M_ProductCard
                              profile={
                                product.productImages &&
                                product.productImages.length > 0
                                  ? product.productImages[0]
                                  : profile
                              }
                              title={product.itemDescription}
                              description={"Lorem ipsum dummy text"}
                              productDetails={product}
                              onClick={handleOnClick}
                            />
                          ))}
                        </>
                      ) : (
                        <A_Skeleton />
                      )}
                    </div>
                  ) : (
                    <M_NoContent />
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="card-with-grid span-4">
            <div className="card-section-half cart">
              <M_Cart />
            </div>
            <div className="card-section-half cart">
              <M_Order />
            </div>
          </div>
        </div>
      </main>
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
            productDetails={
              (selectedProduct && selectedProduct.productDetails) || ""
            }
          />
        }
      />
    </div>
  );
}

export default App;
