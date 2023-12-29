import z from 'zod';
import ExpenseCategory from '../constant/ExpenseCategory';
const EXPENSESTATUS = {
    PENDING:'pending',
    APPROVED:'approved',
    SETTLED:'settled',
    REJECTED:'rejected',
};
const expenseSchema = z.object({
    category:z.enum(ExpenseCategory.map((category) => category.value)),
    expenseNote:z.string().max(200).optional(),
    amount:z.string().refine((value) => /^[0-9]+$/.test(value)),
    currency:z.string().min(2).max(20),
    billingDate:z.date().optional(),
    merchantName:z.string().max(50).optional(),
    remarks:z.string().max(200).optional(),
    status:z.enum(Object.values(EXPENSESTATUS)).default(EXPENSESTATUS.PENDING),
    createdAt:z.date().default(new Date()),
    updatedAt:z.date().default(new Date()),

});
export default expenseSchema;
export {EXPENSESTATUS};