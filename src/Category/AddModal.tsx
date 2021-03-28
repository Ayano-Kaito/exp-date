import * as React from 'react';
import axios from 'axios';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddModal(props: AddModalProps) {
    const [name, setName] = React.useState("");
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
  
    const clickAddButton = () => {
      const params = {
        categoryName: name
      }
      axios.post("/api/categories", { params }).then((res) => {
        console.log(res.data)
      })
      .catch((e) => {
        console.error(e.response)
      })
      props.onClose();
    }
  
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setName(value);
      setButtonDisabled(!Boolean(value));
    }
  
    return (
      <Dialog open={props.isOpen} onClose={props.onClose} aria-labelledby="form-dialog-title">
        <DialogTitle>カテゴリー名を追加します</DialogTitle>
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
          <Button disabled={buttonDisabled} onClick={clickAddButton} color="primary">
            追加する
          </Button>
        </DialogActions>
      </Dialog>
    );
  }