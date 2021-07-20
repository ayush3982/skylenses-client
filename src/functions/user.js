import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
});

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
});

export const saveUserAddress = async (
    authtoken,
    billing_customer_name,
    billing_address,
    billing_city,
    billing_pincode,
    billing_state,
    billing_country,
    billing_email,
    billing_phone
  ) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    {
      billing_customer_name,
      billing_address,
      billing_city,
      billing_pincode,
      billing_state,
      billing_country,
      billing_email,
      billing_phone },
    {
      headers: {
        authtoken,
      },
    }
  );

  export const getUser = async (authtoken, email) =>
  await axios.get(`${process.env.REACT_APP_API}/user/getuser/${email}`, {
    headers: {
      authtoken,
    },
});
