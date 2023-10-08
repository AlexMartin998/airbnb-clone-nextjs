import * as yup from 'yup';

export const listingSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  imageSrc: yup.string().required(),
  category: yup.string().required(),
  roomCount: yup.number().required(),
  bathroomCount: yup.number().required(),
  guestCount: yup.number().required(),
  location: yup.object().required(),
  price: yup.number().required(),
});
