import React, { useState } from 'react';
import { Flex, Text, Spinner, Button, Modal, ModalBody, ModalHeader, ModalFooter, ModalContent, useDisclosure, ModalOverlay } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useUserStore from '../../../store/useUserStore';
import createAxiosInstance from '../../../utils/ApiHandler';
import { useNavigate } from 'react-router-dom';
function ConfirmModal({ onConfirm, isLoading, isError }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button
                bg={'#914FEB'}
                color={'white'}
                w={'100%'}
                onClick={onOpen}
            >
                Settle
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xs'}>
                <ModalOverlay />
                <ModalContent
                    borderRadius={'8px'}
                >
                    <ModalHeader
                        fontSize={'20px'}
                        fontWeight={600}
                        color={'rgba(0, 0, 0, 0.80)'}
                        pb={0}
                    >
                        Confirm Settlement
                    </ModalHeader>
                    <ModalBody>
                        <Text
                            fontSize={'14px'}
                            fontWeight={400}
                            color={'rgba(0, 0, 0, 0.64)'}
                        >
                            Are you sure to confirm the settlement of this expense?
                        </Text>
                        {isError && <Text
                            fontSize={'14px'}
                            fontWeight={400}
                            color={'red'}
                        >
                            Failed to settle the expense
                        </Text>}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant={'ghost'}
                            mr={3} onClick={onClose}
                            isDisabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='ghost'
                            color={'#2938F7'}
                            onClick={onConfirm}
                            isDisabled={isLoading}
                        >
                            {isLoading ? <Spinner /> : 'Confirm'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
const Settle = ({ expense }) => {
    const user = useUserStore(s => s.user);
    const removeFromPendingSettlements = useUserStore(s => s.removeFromPendingSettlements);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const onConfirm = async () => {
        const accessToken = user.accessToken;
        const api = createAxiosInstance(accessToken);
        setIsLoading(true);
        try {
            await api.put(`/user/expense/settle/${expense.id}`);
            setIsLoading(false);
            removeFromPendingSettlements(expense.id);
            navigate(`/expense-detail/${expense.id}`, { state: { ...expense, status: 'settled' } })
        } catch (error) {
            console.log(error);
            setIsError(true);
        }
        setIsLoading(false);
    }
    return (
        <Flex
            flexDirection={'column'}
            h={'auto'}
            flex={1}
            justifyContent={'flex-end'}
            gap={'20px'}
        >
            <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                gap={'16px'}
            >
                <Button
                    variant={'outline'}
                    border={'1px solid var(--primary-1, #914FEB)'}
                    color={'#914FEB'}
                    w={'100%'}
                    as={Link}
                    isDisabled={isLoading}
                    to={`/expense/${expense.id}/reject`}
                >
                    Reject
                </Button>

                <ConfirmModal
                    isLoading={isLoading}
                    onConfirm={onConfirm}
                    isError={isError}
                />

            </Flex>
        </Flex>
    );
}

export default Settle;
