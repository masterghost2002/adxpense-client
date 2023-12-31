import React, { useState } from 'react';
import { Button, Flex, Text, Spinner, Modal, ModalBody, ModalHeader, ModalFooter, ModalContent, useDisclosure, ModalOverlay } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/useUserStore';
import createAxiosInstance from '../../../utils/ApiHandler';
function ConfirmModal({ onConfirm, isLoading, isError }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button
                variant={'outline'}
                border={'1px solid var(--primary-1, #914FEB)'}
                color={'#914FEB'}
                w={'100%'}
                display={'flex'}
                gap={'8px'}
                onClick={onOpen}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                    <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#914FEB" />
                </svg>
                Delete
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
                        Delete expense
                    </ModalHeader>
                    <ModalBody>
                        <Text
                            fontSize={'14px'}
                            fontWeight={400}
                            color={'rgba(0, 0, 0, 0.64)'}
                        >
                            Are you sure you want to delete this expense?
                        </Text>
                        {isError && <Text
                            fontSize={'14px'}
                            fontWeight={400}
                            color={'red'}
                        >
                            Failed to delete the expense
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
const EditDelete = ({ expense }) => {
    const navigate = useNavigate();
    const user = useUserStore(s => s.user);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const handleDeleteExpense = async () => {
        const accessToken = user.accessToken;
        const api = createAxiosInstance(accessToken);
        setIsLoading(true);
        try {
            await api.delete(`/user/expense/delete/${expense.id}`);
            setIsLoading(false);
            navigate(-1)
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
                <ConfirmModal
                    onConfirm={handleDeleteExpense}
                    isLoading={isLoading}
                    isError = {isError}
                />

                <Button
                    border={'1px solid var(--primary-1, #914FEB)'}
                    color={'#914FEB'}
                    w={'100%'}
                    variant={'outline'}
                    display={'flex'}
                    onClick={() => navigate(`/expense/${expense.id}/edit`, { state: expense })}
                    gap={'8px'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M20.625 19.5938H3.375C2.96016 19.5938 2.625 19.9289 2.625 20.3438V21.1875C2.625 21.2906 2.70937 21.375 2.8125 21.375H21.1875C21.2906 21.375 21.375 21.2906 21.375 21.1875V20.3438C21.375 19.9289 21.0398 19.5938 20.625 19.5938ZM6.03984 17.625C6.08672 17.625 6.13359 17.6203 6.18047 17.6133L10.1227 16.9219C10.1695 16.9125 10.2141 16.8914 10.2469 16.8563L20.182 6.92109C20.2038 6.89941 20.221 6.87366 20.2328 6.8453C20.2445 6.81695 20.2506 6.78656 20.2506 6.75586C20.2506 6.72516 20.2445 6.69477 20.2328 6.66642C20.221 6.63806 20.2038 6.61231 20.182 6.59063L16.2867 2.69297C16.2422 2.64844 16.1836 2.625 16.1203 2.625C16.057 2.625 15.9984 2.64844 15.9539 2.69297L6.01875 12.6281C5.98359 12.6633 5.9625 12.7055 5.95312 12.7523L5.26172 16.6945C5.23892 16.8201 5.24707 16.9493 5.28545 17.071C5.32384 17.1927 5.39132 17.3032 5.48203 17.393C5.63672 17.543 5.83125 17.625 6.03984 17.625Z" fill="#914FEB" />
                    </svg> Edit
                </Button>
            </Flex>
        </Flex>
    );
}

export default EditDelete;
