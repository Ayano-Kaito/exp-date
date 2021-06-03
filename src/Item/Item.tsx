import * as React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

// デザイン
import './Item.scss';
import { Table, TableHead, TableBody, TableCell, TableRow, IconButton } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

// 各画面のコンポーネント 
import AddModal from './ItemAddModal';
import EditModal from './ItemEditModal';
import DeleteModal from './ItemDeleteModal';

enum EventType {
	Add,
	Edit,
	Delete
}

interface ItemProps {
  isOpen: boolean;
  onClose: () => void;
  category: {
    categoryId: string,
    categoryName: string
  } | null;
}

interface ItemState {
  selectedItem: item | null,
	eventType: EventType | null,
}

interface ItemsType {
  categoryName: string,
  categoryId: string,
  totalResults: number,
  results: number,
  offset: number,
  items: item[],
}

interface item {
  itemName: string,
  itemId: string,
  stock: string,
  limitDate: string,
  imagePath: string,
  remark: string
}

export default function Item(props: ItemProps) {
  const [items, setItems] = React.useState<ItemsType>();
  const [select, setSelect] = React.useState<ItemState["selectedItem"]>(null);
  const [event, setEvent] = React.useState<ItemState["eventType"]>(null);
  const [isDisplay, setIsDisplay ] = React.useState("list");
  const [page, setPage] = React.useState(1)
  const [offset, setOffset] = React.useState(0);


  React.useEffect(() => {
    axios.get("/api/items").then((res) => {
      setItems(res.data);
    })
      .catch((e) => {
        console.error(e.response)
      })
  }, [])

  const addItem = () => {
    setSelect({
      itemName: "",
      itemId: "",
      stock: "",
      limitDate: "",
      imagePath: "",
      remark: ""
    });
    setEvent(EventType.Add);
  };

  const editItem = (item: item) => {
    setSelect(item);
    setEvent(EventType.Edit);
  };

  const deleteItem = (item: item) => {
    setSelect(item);
    setEvent(EventType.Delete);
  };

  const clearEvent = () => {
		setEvent(null);
	};

  const isExpired = (limit: string) => {
    const today = dayjs().format().slice(0 , 10)
    const expired = today > limit
    if (expired) {
      return '期限切れ'
    }
  }

  const displayChange = (display: string) => {
    setIsDisplay(display);
  }

  const changePage = (offset: number) => {
    setOffset(offset);
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Link to={`/`}>戻る</Link>
          </TableCell>
          <TableCell><IconButton onClick={() => displayChange("thumbnail")}>サ</IconButton></TableCell>
          <TableCell><IconButton onClick={() => displayChange("list")}>リ</IconButton></TableCell>
          <TableCell colSpan={3}>{items?.categoryName}</TableCell>
          <TableCell align="right" onClick={addItem}>＋</TableCell>
        </TableRow>
      </TableHead>
      <TableBody className={`Item__${isDisplay ? "list" : "thumbnail"}}`}>
        {items?.items.map((item) => (
          <TableRow key={item.itemId}>
            <TableCell><img src={item.imagePath} alt="画像"></img></TableCell>
            <TableCell onClick={() => editItem(item)}>{item.itemName}</TableCell>
            <TableCell onClick={() => deleteItem(item)}><IconButton>削除</IconButton></TableCell>
            <TableCell>{item.limitDate}</TableCell>
            <TableCell>{isExpired(item.limitDate)}</TableCell>
            <TableCell>{item.stock}</TableCell>
            <TableCell>{item.remark}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {event === EventType.Add && (
				<AddModal onClose={() => clearEvent()} isOpen={true} categoryName={items?.categoryName} />
			)}
      {event === EventType.Edit && (
				<EditModal onClose={() => clearEvent()} isOpen={true} item={select} categoryName={items?.categoryName} />
			)}
      {event === EventType.Delete && (
				<DeleteModal onClose={() => clearEvent()} isOpen={true} item={select} />
			)}
      <Pagination className="Item__pagination" count={10} variant="outlined" onChange={(e, offset) => changePage(offset)} page={page} />
    </Table>
  )
}