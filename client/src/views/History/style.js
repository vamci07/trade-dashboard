import React from 'react';
import styled from 'styled-components';
import { TableCell, TableRow } from '@material-ui/core';

export const StyledTableCell = styled(({ ...props }) => (
  <TableCell
    classes={{ root: 'root' }}
    {...props}
  />
))`
  &.root {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
  },
  &.body{
    fontSize: 14,
  }
`;

export const StyledTableRow = styled(({ ...props }) => (
  <TableRow
    classes={{ root: 'root' }}
    {...props}
  />
))`
  &.root {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  }
`;
