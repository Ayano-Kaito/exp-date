import * as React from 'react';
import axios from 'axios';
import './Category.scss';
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: {
    categoryId: string,
    categoryName: string
  } | null;
};

export default function DeleteModal(props: DeleteModalProps) {

  const clickDeleteButton = () => {
    const params = {
      categoryId: props.category?.categoryId
    };
    axios.post("/api/categories", { params }).then((res) => {
      // リフレッシュ処理の追加
      console.log(res.data)
    })
      .catch((e) => {
        console.error(e.response)
      })
    props.onClose();
  };

  return (
    <Dialog className="DeleteCategory" open={props.isOpen} onClose={props.onClose} aria-labelledby="form-dialog-title">
      <DialogContent>{props.category?.categoryName}</DialogContent>
      <DialogContent>を削除しますか？</DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={clickDeleteButton} color="primary">
          削除する
        </Button>
      </DialogActions>
    </Dialog>
  );
};