import React from "react";
import styled, { keyframes, css } from "styled-components";

export interface JumpingProps {
  children: React.ReactNode;
  delta: number;
};

const jump = (delta: number) => keyframes`
  0%   { transform: translateY(0px); }
  30%  { transform: translateY(${delta}px); }
  50%  { transform: translateY(0px); }
  100% { transform: translateY(0px); }
`;

export const JumpingComponent = styled.div<JumpingProps>`
  animation: ${(props: JumpingProps) => jump(props.delta)} 1s ease infinite;
`;
