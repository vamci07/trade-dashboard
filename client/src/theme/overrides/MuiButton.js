import palette from 'theme/palette';
import { common, blue } from '@material-ui/core/colors';

export default {
  root: {
    backgroundColor: palette.primary.main,
    color: common.white,
    textTransform: 'none',
    fontWeight: 700
  },
  outlined: {},
  contained: {
    backgroundColor: palette.primary.main,
    color: common.white,
    textTransform: 'none',
    fontWeight: 700,
    '&:hover, &:focus': {
      backgroundColor: blue[700]
    }
  },
  containedPrimary: {}
};
