import z from 'zod';
// eslint-disable-next-line no-useless-escape
const indianPhoneNumberRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
const USERROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    ACCOUNTANT: 'accountant',
    EMPLOYEE: 'employee',
}
const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name can't be more than 50 characters long").refine(
        value => /^[a-zA-Z\s]*$/.test(value),
        {
            message: "Name can only contain alphabets and spaces",
        }
    ),
    email: z.string().email(), // must be unique
    role: z.enum(Object.values(USERROLES)),
    phone: z.string().refine(phoneNumber => indianPhoneNumberRegex.test(phoneNumber), {
        message: 'Must be a valid Indian phone number',
    }).optional(), // must be unique
    city: z.string().min(2, "City must be at least 2 characters long").max(50, "City can't be more than 50 characters long"),
    state: z.string().min(2, "State must be at least 2 characters long").max(50, "State can't be more than 50 characters long"),
});
export { USERROLES };
export default userSchema;