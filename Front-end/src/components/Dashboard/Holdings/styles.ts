import { makeStyles } from '@material-ui/core/styles';

import { spacing } from 'material-ui/styles';

export default makeStyles ({
  table: {
    minWidth: 650,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    
  },
  paper: {
    
    
    //textAlign: 'center',
    //color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    //marginBottom: theme.spacing(1),
  },
  divider: {
    //margin: theme.spacing(2, 0),
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(1),
  },
  paper: {
    
    padding: theme.spacing(1),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));
