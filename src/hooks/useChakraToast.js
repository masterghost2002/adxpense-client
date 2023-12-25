import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
const useChakraToast = () => {
  const toast = useToast();
  // types are: "success", "info", "warning", "error"
  const addToast = useCallback((newRes) => {
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
  }, [toast]);

  return addToast;
};
export default useChakraToast;