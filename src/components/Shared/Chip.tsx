import React, { FC, ReactNode } from "react";
import styled from "@emotion/styled";

import colors from "../../styles/colors";

const ChipBox = styled.button<{ hasBorder?: boolean }>((props) => ({
  "&::before": {
    // remove mozilla protocol +/- icon
    content: "none",
  },
  cursor: "pointer",
  paddingRight: 0,
  backgroundColor: props.hasBorder ? undefined : colors.lightgrey,
  borderRadius: 20,
  padding: props.hasBorder ? 8 : 0,
  border: props.hasBorder ? `1px solid ${colors.grey}` : 0,
}));

interface ChipProps {
  onClick(): void;
  deletable?: boolean;
  children?: ReactNode;
}

const Chip: FC<ChipProps> = ({ onClick, deletable, children }: ChipProps) => {
  return (
    <ChipBox onClick={onClick} hasBorder={!deletable}>
      <>{children}</>
    </ChipBox>
  );
};

export default Chip;
