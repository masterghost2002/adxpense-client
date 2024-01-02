import { Flex, Text } from "@chakra-ui/react";
import completeExpenseValidate from '../../form-validation/completeExpenseValidate';
const ExpenseCategory = {
    'travel': 'Travel Expenses',
    'office-supplies': 'Office Supplies',
    'meals-entertainment': 'Meals and Entertainment',
    'utilities': 'Utilities',
    'exmployee-benefits-welfare': 'Employee Benefits and Welfare',
    'professional-services': 'Professional Services',
    'marketingAndAdvertisment': 'Marketing and Advertising',
    'maintenance-repairs': 'Maintenance and Repairs',
    'subscriptions-memberships': 'Subscriptions and Memberships',
    'miscellaneous': 'Miscellaneous Expenses'

};
const ExpenseBox = ({ expense, onClick }) => {
    const date = new Date(
        expense?.billingDate._seconds
            ? expense.billingDate._seconds * 1000
            : expense.billingDate,
    );
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const result = completeExpenseValidate.safeParse({ ...expense, billingDate: date });
    const pendingItems = result.success ? 0 : result.error.errors.length;
    return (
        <Flex
            h={'70px'}
            w={'100%'}
            borderRadius={'8px'}
            padding={'16px'}
            bg={'#FBFBFB'}
            justifyContent={'space-between'}
            alignItems={'center'}
            onClick={onClick}
            cursor={'pointer'}
        >
            <Flex
                flexDirection={'column'}
                flex={3}
            >
                <Text
                    fontSize={'18px'}
                    fontWeight={700}
                >
                    {ExpenseCategory[expense.category]}
                </Text>
                <Flex
                    alignItems={'center'}
                    gap={'8px'}
                >
                    <Text
                        fontSize={'12px'}
                        fontWeight={400}
                        color={'rgba(0, 0, 0, 0.64)'}
                    >
                        {expense.billingDate ? `${day} ${month}` : ""}
                    </Text>
                    {
                        pendingItems > 0 &&
                        <Flex
                            gap={'8px'}
                            alignItems={'center'}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                                <circle cx="2" cy="2" r="2" fill="black" fillOpacity="0.5" />
                            </svg>
                            <Text
                                fontSize={'12px'}
                                fontWeight={500}
                                color={'#E53E3E'}
                            >
                                {pendingItems} items missing
                            </Text>
                        </Flex>
                    }
                </Flex>

            </Flex>
            <Text
                fontSize={'18px'}
                fontWeight={700}
                textAlign={'end'}
                flex={1}
            >
                {expense.currency ? expense.currency : ""} {expense.amount}
            </Text>
        </Flex>
    );
};
export default ExpenseBox;