import React from 'react';
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';
import { DateRange } from 'react-date-range';

type Props = {
  range: any;
  handleRangeChange: any;
  showPicker: any;
  setShowPicker: any;
};

const DatePicker = ({
  range,
  handleRangeChange,
  showPicker,
  setShowPicker,
}: Props) => {
  return (
    <Popover isOpen={showPicker} onClose={() => setShowPicker(false)}>
      <PopoverTrigger>
        <InputGroup>
          <Input
            onClick={() => setShowPicker(true)}
            readOnly
            value={`${format(range[0].startDate!, 'dd/MM/yyyy')} - ${format(range[0].endDate!, 'dd/MM/yyyy')}`}
          />
          <InputRightElement>
            <IconButton
              aria-label="Open date picker"
              icon={<FaCalendarAlt />}
              onClick={() => setShowPicker(!showPicker)}
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <DateRange
            ranges={range}
            onChange={handleRangeChange}
            moveRangeOnFirstSelection={false}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
