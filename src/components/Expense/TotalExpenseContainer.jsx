import { Flex, Image, Text } from '@chakra-ui/react'
import WalletSvg from '../../static/images/WalletSvg.svg'
export default function TotalExpenseContainer({total = '₹0'}) {
  return (
    <Flex
    h={'64px'}
    bg={'#FFF'}
    w={'100%'}
    borderRadius={'8px'}
    justifyContent={'space-between'}
    alignItems={'center'}
    px={2}
>
    <Flex
        alignItems={'center'}
        gap={4}
       
    >
        <Image
            src={WalletSvg}
            w={'28px'}
            h={'28px'}
        />
        <Text
            fontSize={'14px'}
            fontWeight={400}
        >
            Total Expense
        </Text>

    </Flex>
    <Text
        fontSize={'24px'}
        fontWeight={500}
        color={'#4BC0C0'}
    >
       {total}
    </Text>
</Flex>
  )
}
