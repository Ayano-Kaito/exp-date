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
  items: Array<item>,
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
  const [itemInfo, setItemInfo] = React.useState<ItemsType>({
    categoryName: "",
    categoryId: "",
    totalResults: 0,
    items: []
  });
  const [select, setSelect] = React.useState<ItemState["selectedItem"]>(null);
  const [event, setEvent] = React.useState<ItemState["eventType"]>(null);
  const [isDisplay, setIsDisplay ] = React.useState("list");
  const [page, setPage] = React.useState(1); // ページ番号
  const [totalPage, setTotalPage] = React.useState(1); //総ページ数
  const [displayedItems, setDisplayedItems] = React.useState<ItemsType["items"]>(); //表示データ
  const displayNum = 1; //1ページあたりの表示数

  React.useEffect(() => {
    axios.get("/api/items").then((res) => {
      setItemInfo(res.data);
      setTotalPage(res.data.totalResults / displayNum);
      setDisplayedItems(res.data.items.slice(((page - 1) * displayNum), page * displayNum));
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

  const changePage = (event: any, index: number) => {
    setPage(index);
    setDisplayedItems(itemInfo?.items.slice(((index - 1) * displayNum), index * displayNum))
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
          <TableCell colSpan={3}>{itemInfo?.categoryName}</TableCell>
          <TableCell align="right" onClick={addItem}>＋</TableCell>
        </TableRow>
      </TableHead>
      <TableBody className={`Item__${isDisplay ? "list" : "thumbnail"}}`}>
        {displayedItems && (
          displayedItems.map((item) => (
            <TableRow key={item.itemId}>
              <TableCell><img src={item.imagePath} alt="画像"></img></TableCell>
              <TableCell onClick={() => editItem(item)}>{item.itemName}</TableCell>
              <TableCell onClick={() => deleteItem(item)}><IconButton>削除</IconButton></TableCell>
              <TableCell>{item.limitDate}</TableCell>
              <TableCell>{isExpired(item.limitDate)}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.remark}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      {event === EventType.Add && (
				<AddModal onClose={() => clearEvent()} isOpen={true} categoryName={itemInfo?.categoryName} />
			)}
      {event === EventType.Edit && (
				<EditModal onClose={() => clearEvent()} isOpen={true} item={select} categoryName={itemInfo?.categoryName} />
			)}
      {event === EventType.Delete && (
				<DeleteModal onClose={() => clearEvent()} isOpen={true} item={select} />
			)}
      <Pagination className="Item__pagination" count={totalPage} variant="outlined" onChange={changePage} page={page} />
    </Table>
  )
}