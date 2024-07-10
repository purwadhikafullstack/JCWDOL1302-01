import React from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";

interface CardProps {
  variant?: string; // Optional variant prop for styling
  children: React.ReactNode; // Enforce children to be React elements
  // Add other props you expect Card to receive
}

const Card: React.FC<CardProps> = (props) => {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("Card", { variant });

  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default Card;
