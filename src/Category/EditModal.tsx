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

export default function EditModal(props: EditModalProps) {
  const [name, setName] = React.useState(props.category?.categoryName);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const clickEditButton = () => {
    console.log('送信されたよ！')
    props.onClose();
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setButtonDisabled(!Boolean(value));
  }

  return (
    <Dialog open={props.isOpen} onClose={props.onClose} aria-labelledby="form-dialog-title">
      <DialogTitle>カテゴリー名を編集します</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          type="text"
          fullWidth
          value={name}
          onChange={handleNameChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          キャンセル
        </Button>
        <Button disabled={buttonDisabled} onClick={clickEditButton} color="primary">
          更新する
        </Button>
      </DialogActions>
    </Dialog>
  );
}