import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { NoPriceHoldingI } from '../../../interfaces/Holding';

export interface DialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  holdings: NoPriceHoldingI[];
}

export const DialogButton = ({open, selectedValue, onClose, holdings}: DialogProps) => {
  
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: any) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Select Holding for Stock-Graph</DialogTitle>
      <List>
        {holdings.map((holding) => (
          <ListItem button onClick={() => handleListItemClick(holding)} key={holding.company}>
            <ListItemText primary={holding.company} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
