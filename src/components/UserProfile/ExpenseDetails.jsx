import PieChartGraph from "../Charts/PieChartGraph";
import { Flex, Text, Divider, Box } from "@chakra-ui/react";
const makeExpenseDetails = (data)=>{
  let foodTotal = 0;
  let travelTotal = 0;
  let marketingAndAdvertismentTotal = 0;
  let miscellaneousTotal = 0;
  let total = 0;
  for(let i=0; i<data.length; i++){
    const expense = data[i];
    if(expense.category === 'food'){
      foodTotal += parseInt(expense.amount);
    } else if(expense.category === 'travel'){
      travelTotal += parseInt(expense.amount);
    } else if(expense.category === 'marketingAndAdvertisment'){
      marketingAndAdvertismentTotal += parseInt(expense.amount);
    } else if(expense.category === 'miscellaneous'){
      miscellaneousTotal += parseInt(expense.amount);
    }
    total += parseInt(expense.amount);
  }
  const foodPerc = (foodTotal/total)*100;
  const travelPerc = (travelTotal/total)*100;
  const marketingAndAdvertismentPerc = (marketingAndAdvertismentTotal/total)*100;
  const miscellaneousPerc = (miscellaneousTotal/total)*100;
  return [
    {
      name: 'Food',
      value: foodTotal,
      perc: Math.round(foodPerc)
    },
    {
      name: 'Travel',
      value: travelTotal,
      perc: Math.round(travelPerc)
    },
    {
      name: 'Marketing and Advertisment',
      value: marketingAndAdvertismentTotal,
      perc: Math.round(marketingAndAdvertismentPerc)
    },
    {
      name: 'Miscellaneous',
      value: miscellaneousTotal,
      perc: Math.round(miscellaneousPerc)
    }
  ]
}
const COLORS = ['#FF900E', '#D6BEFC', '#914FEB', '#4BC0C0'];
const CategoryContainer = ({ color, perc, category, price, currency = '₹' }) => {
  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Flex
        alignItems={'center'}
        gap={2}
      >
        <Box
          h={'30px'}
          w={'40px'}
          bg={color}
          borderRadius={'4px'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          color={'white'}
        >
          <Text
            fontSize={'14px'}
            fontWeight={500}
          >
            {perc} %
          </Text>
        </Box>
        <Text
          color={'rgba(0, 0, 0, 0.64)'}
          fontWeight={500}
          fontSize={'16px'}
        >
          {category}
        </Text>
      </Flex>
      <Text
        fontWeight={500}
        fontSize={'16px'}
      >
        {currency}{price}
      </Text>
    </Flex>
  )
}

export default function ExpenseDetails({expenses}) {
  
  const data = makeExpenseDetails(expenses);
  return (
    <Flex
      p={2}
      bg={'white'}
      w={'100%'}
      gap={4}
      flexDirection={'column'}
      py={'20px'}
    >

      <Text
        fontSize={'16px'}
        fontWeight={500}
      >
        Category Wise
      </Text>
      <PieChartGraph 
        colors={COLORS}
        data={data}
      />
      <Divider />
      {
        data.length > 0 && data.map((item, index)=>(
          <CategoryContainer
            key={index}
            color={COLORS[index]}
            category={item.name}
            price={item.value}
            perc={item.perc}
          />
        ))
      }
      
    </Flex>
  )
}
