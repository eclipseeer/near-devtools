import { string, object } from 'yup';

export const schema = object({
  name: string().required('Mandatory field').max(50, 'Max characters 50'),
  url: string().required('Mandatory field'),
  header: object({
    name: string().required('Mandatory field').max(250),
    value: string().required('Mandatory field').max(250),
  }).nullable(),
});
