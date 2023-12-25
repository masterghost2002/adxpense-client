import React, {memo}  from 'react';
import { Flex, Box } from '@chakra-ui/react';
import BarChartGraph from '../Charts/BarChartGraph';
import YearSelector from '../YearSelector';
import ExportHandler from '../Export/ExportHandler';
const YearlyExpense = ({currentYear,setCurrentYear, data})=> {
    
    return (
        <Flex
            justifyContent={'center'}
            borderRadius={'8px'}
            flexDirection={'column'}
            gap={5}
        >
            <Flex
                w={'100%'}
                justifyContent={'space-between'}
            >
                <YearSelector
                    currentYear = {currentYear}
                    setCurrentYear={setCurrentYear}
                />
                <ExportHandler
                    data={data}
                />
            </Flex>
            <Box
                h={'260px'}
                bg={'white'}
                py={5}
            >
                <BarChartGraph 
                    data={data}
                />
            </Box>
        </Flex>
    )
}
export default memo(YearlyExpense)
