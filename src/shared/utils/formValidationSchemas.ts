import { email, minLength, object, string } from 'valibot';

export const registerFormSchema = object({
  name: string('Name is required', [
    minLength(3, 'Needs to be at least 3 characters'),
  ]),
  email: string('Email is required', [
    minLength(3, 'Needs to be at least 3 characters'),
    email('Invalid email'),
  ]),
  password: string('Password is required', [
    minLength(6, 'Needs to be at least 6 characters'),
    email('Invalid email'),
  ]),
});
