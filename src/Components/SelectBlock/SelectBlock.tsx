import React, { useState } from "react";
import { Block } from "../../Common/Block";
import { CellComponent } from "../Cell";



export interface SelectBlockProps {
  blocks: Block[];
  listener: (block: Block) => void;
};



export const SelectBlockComponent: React.FC<SelectBlockProps> =
({ blocks, listener }) => {
  const [selectedBlock, setSelectedBlock] = useState<number>(-1);
  
  const selectBlock = (i: number): void => {
    setSelectedBlock(i);
    listener(i === -1 ? { type: "Null" } : blocks[i]);
  };

  return (
  <> {
    blocks.map((block: Block, i: number) =>
      <CellComponent
        key={i}
        owner={{ type: "Null" }}
        block={block}
        brightness={ selectedBlock === i ? 125 : 100 }
        onClick={ () => selectBlock(selectedBlock === i ? -1 : i) }
      />
    )
  } </>);
};
