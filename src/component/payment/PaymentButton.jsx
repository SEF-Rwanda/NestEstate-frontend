import axios from "axios";
import jwtDecode from "jwt-decode";
const PaymentButton = (property) => {
  const baseAPIUrl = "/api/v1";

  const handleCheckout = async () => {
    // Get authentication token
    const authToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    // Decode token to get user ID if we have token
    if (authToken) {
      // Decode token to get user ID
      const decodedToken = jwtDecode(authToken);
      // Get the user ID
      const userId = decodedToken._id;
      // Make a request to the server to create a checkout session
      const { data } = await axios.post(
        `${baseAPIUrl}/payments/create-checkout-session`,
        {
          property,
          userId,
        },
        config
      );
      console.log(data);
      // Redirect user to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleCheckout}>
        Make Payment
      </button>
    </>
  );
};

export default PaymentButton;
