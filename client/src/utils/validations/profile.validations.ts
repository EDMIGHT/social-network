import * as z from 'zod';

import { userBaseInfoValidation } from '@/utils/validations/auth.validations';

export const editProfileValidations = userBaseInfoValidation;

export type IEditProfileFields = z.infer<typeof editProfileValidations>;
