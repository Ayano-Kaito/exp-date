import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category: {
    categoryId: string,
    categoryName: string
  } | null;
}

export default function EditModal (props: EditModalProps)  {
  console.log(props.category);

  return (
    <div>
      <Dialog open={props.isOpen} onClose={props.onClose} aria-labelledby="form-dialog-title">
      <DialogTitle>カテゴリー名を編集します</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          type="text"
          fullWidth
          value={props.category?.categoryName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={props.onClose} color="primary">
          編集する
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
}