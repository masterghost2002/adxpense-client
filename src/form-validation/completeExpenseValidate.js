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
    expenseNote:z.string().max(200),
    amount:z.string().refine((value) => /^[0-9]+$/.test(value)),
    currency:z.string().min(1).max(20),
    billingDate:z.date(),
    merchantName:z.string().max(50),
    remarks:z.string().max(200).optional(),
    receipts:z.array(z.string().url()).min(1),
});
export default expenseSchema;
export {EXPENSESTATUS};