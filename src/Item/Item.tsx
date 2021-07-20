import * as React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

// デザイン
import './Item.scss';
import { Table, TableHead, TableBody, TableCell, TableRow, Grid, GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
// アイコン
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'; // ホーム
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined'; // サムネイル
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined'; // リスト
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'; // 追加
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'; // 削除

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
  const [isDisplay, setIsDisplay] = React.useState("list");
  const [page, setPage] = React.useState(1); // ページ番号
  const [totalPage, setTotalPage] = React.useState(1); //総ページ数
  const [displayedItems, setDisplayedItems] = React.useState<ItemsType["items"]>(); //表示データ
  const [displayNum, setDisplayNum] = React.useState(2); //1ページあたりの表示数

  React.useEffect(() => {
    axios.get("/api/items").then((res) => {
      setItemInfo(res.data);
      setTotalPage(Math.ceil(res.data.totalResults / displayNum));
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

  const backHome = () => {
    document.location.href = "/";
  }

  const isExpired = (limit: string) => {
    const today = dayjs().format().slice(0, 10)
    const expired = today > limit
    if (expired) {
      return '期限切れ'
    }
  }

  const itemsPage = (displayNum: number) => {
    // 必ず1ページ目を表示
    const displayPage = 1;
    setPage(1);
    setTotalPage(Math.ceil(itemInfo.totalResults / displayNum));
    setDisplayedItems(itemInfo?.items.slice(((displayPage - 1) * displayNum), displayPage * displayNum));
  }

  const displayChange = (display: string) => {
    setIsDisplay(display);
    if (display === "thumbnail") {
      const number = 50;
      // 表示するアイテム数を変更し、総ページ数と表示するアイテムを変更
      setDisplayNum(number);
      itemsPage(number);
    }
    if (display === "list") {
      const number = 2;
      // 表示するアイテム数を変更し、総ページ数と表示するアイテムを変更
      setDisplayNum(number);
      itemsPage(number);
    }
  }

  const changePage = (event: any, index: number) => {
    setPage(index);
    setDisplayedItems(itemInfo?.items.slice(((index - 1) * displayNum), index * displayNum))
  }

  return (
    <>
      <Table className="Item">
        <TableHead className="Item__header">
          <TableRow className="Item__icon">
            <TableCell onClick={backHome}><HomeOutlinedIcon /></TableCell>
            <TableCell onClick={() => displayChange("thumbnail")}><AppsOutlinedIcon /></TableCell>
            <TableCell onClick={() => displayChange("list")}><MenuOutlinedIcon /></TableCell>
          </TableRow>
          <TableRow className="Item__categoryName">
            <TableCell>{itemInfo?.categoryName}</TableCell>
          </TableRow>
          <TableRow className="Item__add">
            <TableCell align="right" onClick={addItem}><AddOutlinedIcon /></TableCell>
          </TableRow>
        </TableHead>
        {isDisplay === "list" ? (
          <TableBody className="Item__list">
            {displayedItems && (
              displayedItems.map((item) => (
                <TableRow key={item.itemId}>
                  <TableRow className="Item__image">
                    <TableCell><img src={item.imagePath} alt="画像" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell onClick={() => editItem(item)}>{item.itemName}</TableCell>
                    <TableCell onClick={() => deleteItem(item)}><DeleteOutlineOutlinedIcon /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{item.limitDate}</TableCell>
                    <TableCell>{isExpired(item.limitDate)}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>{item.remark}</TableCell>
                  </TableRow>
                </TableRow>
              ))
            )}
          </TableBody>
        ) : (
          <Grid className="Item__thumbnail">
            {displayedItems && (
              displayedItems.map((item) => (
                <GridList key={item.itemId}>
                  <GridListTile onClick={() => editItem(item)}><img src={item.imagePath} alt="画像" />
                    <GridListTileBar
                      title={item.itemName}
                      actionIcon={
                        <IconButton onClick={() => deleteItem(item)}>
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                </GridList>
              ))
            )}
          </Grid>
        )}
      </Table>
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
    </>
  )
}