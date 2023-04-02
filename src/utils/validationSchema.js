import * as yup from 'yup';

export const userLoginSchema = yup.object({
  email: yup.string().required().email(),
  pwd: yup.string().required().min(7).max(14),
});

export const userRegisterSchema = yup.object({
  user: yup.string().required(),
  email: yup.string().required().email(),
  pwd: yup.string().required().min(7).max(14),
});
