import { extendTheme } from '@chakra-ui/react';
import Headings from './uielements/HeadingVariants';
const theme = extendTheme({
  colors: {
    brand_primary: {
      500: "#914FEB",
      // ...
      900: "#4B0DAF",
    },
    brand_secondary:{
      500:"#FF900E"
    },
  },
  components: {
    Heading: Headings,
  },
});
export default theme;
