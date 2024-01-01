import React from "react"
import { Modal, ModalOverlay, ModalContent, ModalBody, Text, Flex, Progress, Box } from "@chakra-ui/react"
export default function UploadPage({isOpen, progress = 0}) {
    const finalRef = React.useRef(null)

    return (
        <>
            <Modal
                finalFocusRef={finalRef}
                isOpen={isOpen}
                size={'full'}
            >
                <ModalOverlay />
                <ModalContent
                    bg="rgba(255, 255, 255, 0.6)"
                >
                    <ModalBody
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        gap={'20px'}
                    >

                        <Flex
                            flexDirection={'column'}
                            justifyContent={'flex-start'}
                            alignItems={'flex-start'}
                            gap={'20px'}
                        >
                            <Text
                                fontSize={'28px'}
                                fontWeight={'bold'}
                            >
                                Uploading...
                            </Text>
                            <Text
                                fontWeight={500}
                                color={'#666666'}

                            >
                                Just give a moment to process your files
                            </Text>
                            <Flex
                                flexDirection={'column'}
                                w={'100%'}
                                alignItems={'flex-end'}
                                gap={'5px'}
                            >
                                <Text
                                    fontSize={'12px'}
                                    fontWeight={'bold'}

                                >
                                    {progress}%
                                </Text>
                                <Box
                                    w={'100%'}
                                >
                                    <Progress 
                                        colorScheme='blue' 
                                        size='sm' 
                                        value={progress} 
                                        borderRadius={'10px'}
                                        bg={'#E5E5E5'}
                                    />
                                </Box>
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}