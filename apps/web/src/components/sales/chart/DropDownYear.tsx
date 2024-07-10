import React from 'react';
import { Box, Select, Text } from '@chakra-ui/react';

interface DropdownYearProps {
  yearNow: number;
  onYearChange: (year: number) => void;
}

const DropdownYear: React.FC<DropdownYearProps> = ({
  yearNow,
  onYearChange,
}) => {
  const [yearChoose, setYearChoose] = React.useState<number>(yearNow);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value);
    setYearChoose(newYear);
    onYearChange(newYear);
  };

  // Generate year options from 2024 to 2090
  const yearOptions = Array.from({ length: 2090 - 2024 + 1 }, (_, index) => ({
    value: 2024 + index,
    label: (2024 + index).toString(),
  }));

  return (
    <Box>
      <Text>Year:</Text>
      <Select value={yearChoose} onChange={handleYearChange}>
        {yearOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default DropdownYear;
