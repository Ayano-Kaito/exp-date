import * as React from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    itemName: string,
    itemId: string,
    stock: string,
    limitDate: string,
    imagePath: string,
    remark: string
  } | null;
};

export default function DeleteModal(props: DeleteModalProps) {

  const clickDeleteButton = () => {
    const params = {
      categoryId: props.item?.itemId
    };
    axios.delete("/api/items", { params }).then((res) => {
      // リフレッシュ処理の追加
      console.log(res.data)
    })
      .catch((e) => {
        console.error(e.response)
      })
    props.onClose();
  };

  return (
    <Dialog open={props.isOpen} onClose={props.onClose} aria-labelledby="form-dialog-title">
      <DialogContent>{props.item?.itemName}</DialogContent>
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