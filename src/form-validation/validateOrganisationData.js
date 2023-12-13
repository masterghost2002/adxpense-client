import { z } from 'zod';
const validateOrganisationData = z.object({
  organisationName: z
    .string()
    .min(3, {message:'Organisation name must be 3 char long'})
    .max(30, {message:'Organisation name must be less than 30 char'}),
  email: z.string().email(),
  url: z.string().url({message:'Must be url'}),
});
export default validateOrganisationData;