import { object, string } from 'yup';

export const userSchema = object({
  task: string()
    .required('Todo is required')
    .min(5, 'Task must be at least 5 characters')
    .max(30, 'Task must be at most 30 characters')
    .matches(/^[a-zA-Z\s]*$/, 'Task must not contain numbers'),
  userEmail: string(),
});
