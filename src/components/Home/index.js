// importing required items
import { Component } from "react";
import ProductItem from "../ProductItem";
import "./index.css";

// class for home component
class Home extends Component {
  // state variables
  state = {
    productsList: [],
    errorMessage: "",
    isLoading: false,
    displayFiveProductsOnly: true,
    errorsCount: 0,
  };

  // function for handling image if there are any changes in image input tag
  handleImageChange = (event) => {
    this.setState({ isLoading: true });
    const file = event.target.files[0];

    // checking if any file is uploaded or not
    if (!file) {
      this.setState((previousValue) => ({
        errorMessage: "Please select an image to proceed further...",
        isLoading: false,
        productsList: [],
        errorsCount: previousValue.errorsCount + 1,
      }));
      return;
    }

    // getting uploaded file type and size
    const { type, size } = file;

    // checking if the uploaded file is image or not
    if (!type.startsWith("image/")) {
      this.setState((previousValue) => ({
        errorMessage:
          "Please upload an image file (JPEG, PNG, GIF, BMP, or WEBP)",
        isLoading: false,
        productsList: [],
        errorsCount: previousValue.errorsCount + 1,
      }));
      return;
    }

    // as the api accepts images size upto 32MB, checking if the size of uploaded image is less than 32MB or not, to get rid of errors from google cloud vision api
    if (size > 32 * 1024 * 1024) {
      this.setState((previousValue) => ({
        errorMessage: "Please upload an image file smaller than 32MB",
        isLoading: false,
        productsList: [],
        errorsCount: previousValue.errorsCount + 1,
      }));
      return;
    }

    // if there are no errors till now, resetting the errorMessage, isLoading and productsList state variables
    this.setState({
      errorMessage: "",
      isLoading: false,
      productsList: [],
      errorsCount: 0,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      // extracting base64-encoded image data to pass it to the api (cloud vision api accepts only base64Data)
      const base64Data = reader.result.split(",")[1];
      // calling image content analyzing function by passing base64Data (extracted image data) to cloud vision api as a parameter to the function
      this.analyzeImageContent(base64Data);
    };
    reader.readAsDataURL(file);
  };

  // function for processing and getting label variables of uploaded image using cloud vision api
  analyzeImageContent = async (base64Data) => {
    // cloud vision api
    // to use your own api key, replace the url with `https://vision.googleapis.com/v1/images:annotate?key=${"YOUR-KEY"}`
    const response = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDQHnWFXtHyRHPBk9zTKp3QO7DMSppiqR4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64Data,
              },
              features: [
                {
                  type: "LABEL_DETECTION",
                },
              ],
            },
          ],
        }),
      }
    );

    // checking if the connection of api and everything is fine or not and then proceeding further (handling errors)
    if (!response.ok) {
      this.setState((previousValue) => ({
        errorMessage:
          "Something went wrong while analyzing the image, please try again",
        isLoading: false,
        productsList: [],
        errorsCount: previousValue.errorsCount + 1,
      }));
      return;
    } else {
      const data = await response.json();
      // extracting labels received as a response from api and storing them in a list in imageLabels variable
      const imageLabels = data.responses[0].labelAnnotations.map(
        (label) => label.description
      );
      // logging the data received from cloud vision api in console separated by comma(",")
      console.log(imageLabels.join(","));
      // calling getProducts function by passing data received from the api (label keywords) separated by comma(",") as a parameter to the function
      this.getProducts(imageLabels.join(","));
    }
  };

  // function for processing and getting products data using a product search api
  getProducts = async (query) => {
    this.setState({ isLoading: true });
    // product search api
    // to use your own api key, replace the value of this 'X-RapidAPI-Key' with 'YOUR-KEY' in headers
    const url = `https://real-time-product-search.p.rapidapi.com/search?q=${query}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "06e7838abamsh10b65c46a53596dp1cd7c2jsnb11025fd84fd",
        "X-RapidAPI-Host": "real-time-product-search.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);

    //  checking if the connection of api and everything is fine or not and then proceeding further (handling errors)
    if (response.ok) {
      const result = await response.json();
      // updating the productsList state variable with the data received as a response from product search api
      this.setState({
        isLoading: false,
        productsList: result.data,
        displayFiveProductsOnly: true,
        errorsCount: 0,
      });
      // logging the products data received from api in console
      console.log(result.data);
    } else {
      // if there are any errors with product search api, updating the errorMessage state variable with error message
      this.setState((previousValue) => ({
        errorMessage:
          "Something went wrong while searching for products, please try again",
        isLoading: false,
        productsList: [],
        errorsCount: previousValue.errorsCount + 1,
      }));
    }
  };

  // function for changing the number of products to display. whether to display only 5 products or all
  handleDisplayProductsLimit = () => {
    this.setState((previousValue) => ({
      displayFiveProductsOnly: !previousValue.displayFiveProductsOnly,
    }));
  };

  // rendering the data
  render() {
    const {
      productsList,
      errorMessage,
      isLoading,
      displayFiveProductsOnly,
      errorsCount,
    } = this.state;

    // based on number of products to display, filtering number of product items in a list
    const filteredProductsList = displayFiveProductsOnly
      ? productsList.slice(0, 5)
      : productsList;

    return (
      <div className="main-container">
        <p className="assignment-by">
          Assignment by Thatha Hemavenkat Nagateja
        </p>

        <label className="input-label" htmlFor="imgUpload">
          Image-based Product Search:
        </label>
        <br />

        <input
          type="file"
          id="imgUpload"
          className="input-tag"
          onChange={this.handleImageChange}
        />

        {errorMessage && (
          <p className="error-message">
            {errorMessage}
            <br />
            <br />
            {/* If the user is getting errors more than 3 times, I mentioned to contact me for assistance */}
            {errorsCount >= 3
              ? "Encountering recurring errors? Please contact Nagateja for prompt assistance and solutions."
              : null}
          </p>
        )}

        {!isLoading ? (
          productsList.length > 0 && (
            <div className="products-container">
              <h1 className="products-list-title">Similar products:</h1>
              <ul>
                {filteredProductsList.map((each) => (
                  <li key={each.product_id}>
                    <ProductItem ProductDetails={each} />
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={this.handleDisplayProductsLimit}
                className="display-products-limit-btn"
              >
                {displayFiveProductsOnly ? "Show more" : "Show less"}
              </button>
            </div>
          )
        ) : (
          <div className="loading-container">
            <div className="spinner-border" role="status"></div>
            <p className="loading-text">
              Please wait while processing the data...
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
