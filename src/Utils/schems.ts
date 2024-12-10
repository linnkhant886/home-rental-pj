import * as z from 'zod';

export const profileSchema = z.object({
  // firstName: z.string().max(5, { message: 'max length is 5' }),
  firstName: z.string().min(2, { message: 'min length of first name 2' }),
  lastName: z.string().min(2, { message: 'min length of last name is 2' }),
  userName: z.string().min(2, { message: 'min length of user name is 2' }),
});


