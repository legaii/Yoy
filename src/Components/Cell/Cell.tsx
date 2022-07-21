import React from "react";
import { Maybe } from "../../Common/Null";
import { Player, playerColor } from "../../Common/Player";
import { Block } from "../../Common/Block";
import { BlockComponent } from "../Block";

export interface CellProps {
  owner: Maybe<Player>;
  block: Block;
  jumping?: boolean;
  brightness?: number;
  onClick: () => void;
};

export const CellComponent: React.FC<CellProps> =
  ({ owner, block, jumping, brightness, onClick }) => {

  const style = {
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    background: playerColor(owner),
    filter: `brightness(${brightness}%)`,
  };

  return (
    <div style={ style } onClick={ onClick } >
      { block.type === "Null" ? <></> :
        <BlockComponent
          block={ block }
          width={ 44 }
          height={ 44 }
          jumping={ jumping }
        />
      }
    </div>
  );
};
