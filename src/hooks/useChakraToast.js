import { useToast } from '@chakra-ui/react';
const useChakraToast = () => {
  const toast = useToast();
  // types are: "success", "info", "warning", "error"
  const addToast = (newRes) => {
    toast({
      title: newRes.title,
      description: newRes.message,
      status: newRes.status,
      position: 'top',
      isClosable: true,
      duration: 5000,
      containerStyle: {
        zIndex: 9999,
        width: '90%',
        top: '0px',
        margin: '10px',
      },
    });
  };

  return addToast;
};
export default useChakraToast;