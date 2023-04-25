import * as yup from 'yup';

export const userLoginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(7).max(100),
});

export const userRegisterSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(7).max(100),
});

export const hotelSchema = yup.object({
  name: yup.string().required(),
  country: yup.string().required(),
  city: yup.string().required(),
  address: yup.string().required(),
  price: yup.number().required().positive().integer(),
  capacity: yup.number().required().positive().integer(),
  description: yup.string().required(),
});

export const roomSchema = yup.object({
  roomNumber: yup.number().required().positive().integer(),
  roomFloor: yup.number().required().positive().integer(),
  price: yup.number().required().positive().integer(),
  capacity: yup.number().required().positive().integer(),
  description: yup.string().required(),
});

export const bookingSchema = yup.object({
  roomNumber: yup.number().required().positive().integer(),
  roomFloor: yup.number().required().positive().integer(),
  price: yup.number().required().positive().integer(),
  capacity: yup.number().required().positive().integer(),
  finalPrice: yup.number().required().positive().integer(),
  dataOff: yup.string().required(),
  dataEnd: yup.string().required(),
});
