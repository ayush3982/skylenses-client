import axios from "axios";

export const createCarousel = async (carousel, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/carousel`, carousel, {
    headers: {
      authtoken,
    },
});

export const getcarousels = async () =>
  await axios.get(`${process.env.REACT_APP_API}/carousels/`); 

export const removecarousel = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/carousel/${slug}`, {
    headers: {
      authtoken,
    },
});

export const getcarousel = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/carousel/${slug}`);

export const updatecarousel = async (slug, carousel, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/carousel/${slug}`, carousel, {
    headers: {
      authtoken,
    },
}); 

