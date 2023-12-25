
import {Flex, Text, Switch, Spinner} from '@chakra-ui/react'
export default function ActivateDeactiveBar({isActive, handleOrganisationStatus, isUpdatingStatus}) {
    return (
        <Flex
            p={2}
            boxShadow={'0px 2px 16px 0px rgba(0, 0, 0, 0.05)'}
            justifyContent={'space-between'}
            alignItems={'center'}
            mx={0}
            h={'56px'}
        >
            <Text fontSize={'16px'} fontWeight={500} color={'b'}>
                Activate organisation
            </Text>
            {!isUpdatingStatus && (
                <Switch
                    colorScheme="teal"
                    size={'lg'}
                    isChecked={isActive}
                    onChange={handleOrganisationStatus}
                    readOnly={isUpdatingStatus}
                />
            )}
            {isUpdatingStatus && <Spinner />}
        </Flex>
    )
}
