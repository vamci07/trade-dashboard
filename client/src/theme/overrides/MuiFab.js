import { red, common } from '@material-ui/core/colors';

export default {
  root: {
    backgroundColor: red[500],
    color: common.white,
    fontWeight: 700,
    textTransform: 'none',
    '&:hover, &:focus': {
      backgroundColor: red[700]
    }
  }
};
