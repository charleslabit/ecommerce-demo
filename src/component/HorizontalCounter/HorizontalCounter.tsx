import {
  ActionIcon,
  Group,
  NumberInput,
  NumberInputProps,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

interface HorizontalCounterProps {
  value: number;
  onChange: (value: number) => void;
  numberInputProps?: NumberInputProps;
  multi?: boolean;
}

export const HorizontalCounter = ({
  value,
  numberInputProps,
  onChange,
}: HorizontalCounterProps) => {
  return (
    <Group>
      <ActionIcon
        disabled={value <= (numberInputProps?.min || 0)}
        variant="default"
        size="lg"
        onClick={() => onChange(value - 1)}
      >
        <IconMinus size={16} />
      </ActionIcon>

      <NumberInput
        {...numberInputProps}
        onChange={(e) => onChange(Number(e))}
        allowLeadingZeros={false}
        allowNegative={false}
        allowDecimal={false}
        value={value}
        hideControls // Hides default up/down arrows
        styles={{
          input: { width: 60, textAlign: "center" }, // Control width
        }}
      />

      <ActionIcon
        disabled={value === numberInputProps?.max}
        variant="default"
        size="lg"
        onClick={() => {
          onChange(value + 1);
        }}
      >
        <IconPlus size={16} />
      </ActionIcon>
    </Group>
  );
};
