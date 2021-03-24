import * as React from 'react';
import axios from 'axios';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: {
    categoryId: string,
    categoryName: string
  } | null;
}

interface EditModalState {
  name?: string | null;
  buttonDisabled: boolean;
}

export default class EditModal extends React.Component<EditModalProps, EditModalState> {
  constructor(props: EditModalProps) {
    super(props);
    this.state = {
      name: props.category?.categoryName,
      buttonDisabled: false
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.clickEditButton = this.clickEditButton.bind(this);
  }

  clickEditButton() {
    const params = {
      categoryId: this.props.category?.categoryId,
      categoryName: this.state.name
    }
    axios.put("/api/categories", { params }).then((res) => {
      console.log(res.data)
    })
      .catch((e) => {
        console.error(e.response)
      })
    this.props.onClose();
  }

  handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    this.setState({ name: value })
    this.setState({ buttonDisabled: !Boolean(value) });
  }

  render() {
    return (
      <Dialog open={this.props.isOpen} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
        <DialogTitle>カテゴリー名を編集します</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            キャンセル
          </Button>
          <Button disabled={this.state.buttonDisabled} onClick={this.clickEditButton} color="primary">
            更新する
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}