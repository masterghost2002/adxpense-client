const Title = {
  textDecoration: 'underline',
  textUnderlineOffset: 6,
  textDecorationThickness: 2,
  fontSize: '1.2em',
  textDecorationColor: 'purple.400',
  marginTop: 3,
  marginBottom: 2,
};
const SubHeading = {
  textDecoration: 'underline',
  textUnderlineOffset: 6,
  textDecorationThickness: 2,
  fontSize: '1em',
  textDecorationColor: 'gray.500',
  marginTop: 3,
  marginBottom: 2,
};
const Headings = {
  variants: {
    title: Title,
    'sub-heading': SubHeading,
  },
};
export default Headings;
