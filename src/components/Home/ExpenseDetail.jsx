import { memo } from 'react';
import { Flex, Text} from '@chakra-ui/react';
import DateRangeSelector from '../DateRangeSelector';
import TotalExpenseContainer from '../Expense/TotalExpenseContainer'
import CategoryWise from '../Expense/CategoryWise';
import makeExpenseDetails from '../../utils/FilterExpenseCategory';
const COLORS = ['#FF900E', '#D6BEFC', '#914FEB', '#4BC0C0'];
const tempData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];
const ExpenseDetail = ({startDate, setStartDate, endDate, setEndDate, data = tempData, total = 0})=> {
    const CategoryWiseData = makeExpenseDetails(data);
    return (
        <Flex
            w={'100%'}
            gap={4}
            flexDirection={'column'}
            py={'20px'}
        >
            <Flex
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Text
                    fontSize={'20px'}
                    fontWeight={'600'}
                    color={'blackaplha.800'}
                >
                    Expense Details
                </Text>
                <DateRangeSelector 
                    setEndDate={setEndDate}
                    setStartDate={setStartDate}
                    startDate={startDate}
                    endDate={endDate}
                />
            </Flex>
            <TotalExpenseContainer
                total={`₹${total || 0}`}
            />
           <CategoryWise
                data={CategoryWiseData}
                COLORS={COLORS}
           />
        </Flex>
    )
}
export default memo(ExpenseDetail);