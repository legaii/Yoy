import React from "react";
import { isEqual } from "lodash";
import { rules, BlockContainer } from "../../Common/State";
import { JumpingComponent } from "../Jumping";


export interface BlockProps {
  block: BlockContainer;
  width: number;
  height: number;
};



export const BlockComponent: React.FC<BlockProps> = (
  { block, width, height }
) => {

  const style = {
    width: `${width}px`,
    height: `${height}px`,
  };

  const img: React.ReactNode = (
    <img src={ rules.getIcon(block.block) } style={ style } />
  );

  if (block.movable) {
    return <JumpingComponent delta={-5}>{img}</JumpingComponent>;
  }

  return img;
};
