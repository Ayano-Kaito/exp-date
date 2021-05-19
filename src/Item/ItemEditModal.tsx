import * as React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Dialog, Table, TableHead, TableCell, TableRow, IconButton } from '@material-ui/core';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName?: string;
  item: {
    itemName?: string,
    itemId?: string,
    stock?: string,
    limitDate?: string,
    imagePath?: string,
    remark?: string
  } | null;
}

export default function EditModal (props: EditModalProps) {
  const [item, setItem] = React.useState({
    itemName: props.item?.itemName,
    itemId: props.item?.itemId,
    stock: props.item?.stock,
    limitDate: props.item?.limitDate,
    imagePath: props.item?.imagePath,
    remark: props.item?.remark
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
    

  const clickEditButton = () => {
    const params = {
      item: item
    };
    console.log(params);
    axios.put("/api/items", { params }).then((res) => {
      console.log(res.data)
    })
      .catch((e) => {
        console.error(e.response)
      })
    props.onClose();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name
    setItem({ ...item, [name]: value })
    setButtonDisabled(!Boolean(value));
  };

  return (
    <Dialog fullScreen open={props.isOpen} onClose={props.onClose} aria-labelledby="form-dialog-title">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Link to={`/`}><IconButton>家</IconButton></Link>
            </TableCell>
            <TableCell>アイテムを編集</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><TextField type="file">{item.imagePath}</TextField></TableCell>
            <TableCell>{props.categoryName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <TextField
                name="itemName"
                type="text"
                fullWidth
                placeholder="アイテム名を入力してください"
                value={item.itemName}
                onChange={handleTextChange}/>
              <TextField
                name="stock"
                type="number"
                fullWidth
                placeholder="在庫数を入力してください"
                value={item.stock}
                onChange={handleTextChange}
              />
              <TextField
                name="limitDate"
                type="date"
                fullWidth
                placeholder="期限を設定してください"
                value={item.limitDate}
                onChange={handleTextChange}
              />
              <TextField
                name="remark"
                type="text"
                fullWidth
                placeholder="メモ"
                value={item.remark}
                onChange={handleTextChange}
              />
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Button onClick={props.onClose} color="primary">
        キャンセル
    </Button>
      <Button disabled={buttonDisabled} onClick={clickEditButton} color="primary">
        更新する
    </Button>
    </Dialog>
  );
};