import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  formStyles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableCellStyles: {
    minWidth: '170px',
  },
  buttonsBlockStyles: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
    marginRight: '20px',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
export default useStyles;
