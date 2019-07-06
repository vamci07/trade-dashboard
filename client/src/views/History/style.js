import React from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardContent } from '@material-ui/core';

export const StyledCard = styled(({ ...props }) => (
  <Card
    classes={{ root: 'root' }}
    {...props}
  />
))`
  &.root {
    background-color: ${props => props.color};
    cursor: pointer;
  }
`;

export const StyledCardHeader = styled(({ ...props }) => (
  <CardHeader
    classes={{ root: 'root' }}
    {...props}
  />
))`
  &.root {
    div {
      span {
        font-weight: 700;
        font-size: 24px;
      }
    }
  }
`;

export const StyledCardContent = styled(({ ...props }) => (
  <CardContent
    classes={{ root: 'root' }}
    {...props}
  />
))`
  &.root {
    color: #fff;
    font-weight: 500;
    font-size: 14px;
  }
`;
