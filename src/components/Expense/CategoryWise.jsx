import { Flex, Text, Divider } from '@chakra-ui/react';
import PieChartGraph from '../Charts/PieChartGraph';
import CategoryContainer from './CategoryContainer';
export default function CategoryWise({data, COLORS}) {
    return (
        <Flex
            flexDirection={'column'}
            gap={4}
            bg={'white'}
            p={2}
            borderRadius={'12px'}
            border={'1px solid rgba(0, 0, 0, 0.05)'}
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
                data.length > 0 && data.map((item, index) => (
                    <CategoryContainer
                        key={`index-${item.name}-${item.value}-${item.perc}`}
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
