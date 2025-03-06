import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { addToCart,selectCartItems } from '../../features/cart/cartSlice';  // Import the addToCart action
import Cookies from 'js-cookie';
import { TailSpin } from 'react-loader-spinner';
// import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';
import Header from '../Header';
import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const ProductItemDetails = () => {
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions
  const cartItems = useSelector(selectCartItems);
  const [productData, setProductData] = useState(null); // Initialize product data to null to avoid accessing properties before data is fetched
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const { id } = useParams(); // Extract product id from URL params

  useEffect(() => {
    const getProductData = async () => {
      setApiStatus(apiStatusConstants.inProgress);

      const baseUrl=process.env.REACT_APP_API_URL
      const jwtToken = Cookies.get('jwt_token');
      const apiUrl = `${baseUrl}/api/products/${id}`;
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      };
      try {
        const response = await fetch(apiUrl, options);
        if (response.ok) {
          const fetchedData = await response.json();
          const formattedData = {
            availability: fetchedData.availability,
            brand: fetchedData.brand,
            description: fetchedData.description,
            id: fetchedData._id,
            imageUrl: fetchedData.imageUrl,
            price: fetchedData.price,
            rating: fetchedData.rating,
            title: fetchedData.title,
            totalReviews: fetchedData.totalReviews,
          };
          setProductData(formattedData); // Update state with formatted product data
          setApiStatus(apiStatusConstants.success);
        } else if (response.status === 404) {
          setApiStatus(apiStatusConstants.failure);
        }
      } catch (error) {
        setApiStatus(apiStatusConstants.failure); // Handle any fetch error
      }
    };

    getProductData();
  }, [id]); // Dependency on product ID, refetch if the ID changes

  const handleAddToCart = () => {
   // console.log(productData)
    if (productData) {
    
      dispatch(addToCart(productData)); // Dispatch the addToCart action with the product data
   
      localStorage.setItem('cart', JSON.stringify([...cartItems, productData])); // Update LocalStorage
    }
  };

  const renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <TailSpin type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  const renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  );

  const renderProductDetailsView = () => (
    <div className="product-details-success-view">
      <div className="product-details-container">
        <img src={productData.imageUrl} alt="product" className="product-image" />
        <div className="product">
          <h1 className="product-name">{productData.title}</h1>
          <p className="price-details">Rs {productData.price}/-</p>
          <div className="rating-and-reviews-count">
            <div className="rating-container">
              <p className="rating">{productData.rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star"
              />
            </div>
            <p className="reviews-count">{productData.totalReviews} Reviews</p>
          </div>
          <p className="product-description">{productData.description}</p>
          <div className="label-value-container">
            <p className="label">Available:</p>
            <p className="value">{productData.availability}</p>
          </div>
          <div className="label-value-container">
            <p className="label">Brand:</p>
            <p className="value">{productData.brand}</p>
          </div>
          <hr className="horizontal-line" />
          <button
            type="button"
            className="button add-to-cart-btn"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="product-item-details-container">
        {renderProductDetails()}
      </div>
    </>
  );
};

export default ProductItemDetails;
