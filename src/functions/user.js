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


export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers : {
        authtoken,
      }
    }
  )

export const buyCart = async (coupon, cartID) => {
  await axios.get(
    `${process.env.REACT_APP_API}/order/${cartID}`,
    { couponApplied: coupon}
  )
}

export const applyCoins = async (authtoken, cartID, discount) => {
  await axios.post(
    `${process.env.REACT_APP_API}/user/coins/${cartID}`,
    {discount},
    {
      headers : {
        authtoken,
      }
    }
  )
}

export const addCoins = async (authtoken, email, coins) => {
  await axios.post(
    `${process.env.REACT_APP_API}/user/addCoins/${email}`, 
    {coins},
    {
      headers : {
        authtoken,
      }
    }
  )
}

export const removeCoins = async (authtoken, email, coins) => {
  await axios.post(
    `${process.env.REACT_APP_API}/user/removeCoins/${email}`, 
    {coins},
    {
      headers : {
        authtoken,
      }
    }
  )
}

export const addSolution = async (authtoken, cartID, liquid) => {
  await axios.post(
    `${process.env.REACT_APP_API}/user/solution/${cartID}`,
    {liquid},
    {
      headers : {
        authtoken
      }
    }
  )
}

export const createOrder = async (razorpayId, authtoken) => 
  await axios.post(
    `${process.env.REACT_APP_API}/user/order/new`,
    {razorpayId},
    {
      headers : {
        authtoken
      }         
    }
  )
  export const createOrderCOD = async (razorpayId, authtoken) => 
  await axios.post(
    `${process.env.REACT_APP_API}/user/order/cod/new`,
    {razorpayId},
    {
      headers : {
        authtoken
      }         
    }
  )

export const setInternational = async (cartID, authtoken) => 
    await axios.post(
      `${process.env.REACT_APP_API}/user/set/international/${cartID}`,
      {cartID},
      {
        headers : {
          authtoken
        }
      }
    )

export const getUserOrders = async (authtoken) =>
      await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
        headers: {
          authtoken
        }
      })

export const cancelOrder = async (removeID, authtoken) => 
      await axios.post(`${process.env.REACT_APP_API}/user/orders/cancel/${removeID}`, {
        headers: {
          authtoken
        }
      })
