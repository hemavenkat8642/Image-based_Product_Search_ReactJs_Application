import "./index.css";

const ProductItem = (props) => {
  const { ProductDetails } = props;

  const ImageUrl =
    typeof ProductDetails.product_photos === "string"
      ? ProductDetails.product_photos
      : ProductDetails.product_photos[0];

  return (
    <div className="product-card">
      <img className="product-img" src={ImageUrl} alt="product img" />
      <div className="product-description-card">
        <h1 className="product-title">{ProductDetails.product_title}</h1>
        <a
          href={ProductDetails.product_page_url}
          target="_blank"
          rel="noreferrer"
        >
          click here
        </a>
      </div>
    </div>
  );
};

export default ProductItem;
