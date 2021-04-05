import * as React from 'react';
// import axios from 'axios';
import itemMock from '../mock/items';
import {Table, TableBody, TableHead, TableCell, TableRow} from '@material-ui/core';

if (window.location.host === 'localhost:3000') {
    itemMock.initMock()
    console.log(itemMock)
}

interface ItemProps {
    isOpen: boolean;
    onClose: () => void;
    category: {
        categoryId: string,
        categoryName: string
    } | null;
}

interface itemsType {
    categoryName: string,
    categoryId: string,
    totalResults: number,
    results: number,
    offset: number,
    items: [
      {
        itemName: string,
        itemId: string,
        stock: number,
        limitDate: string,
        imagePath: string,
        remark: string
      }
    ]
}

export default function Item (props: ItemProps) {
    const [items, setItems] = React.useState([]);

    // React.useEffect(() => {
    //     axios.get("/api/items").then((res) => {
    //         console.log(res);
    //         setItems(res.data);
    //     })
    //     .catch((e) => {
    //         console.error(e.response)
    //     })
    // }, items)

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={2}>item</TableCell>
                    <TableCell>＋</TableCell>
                </TableRow>
            </TableHead>
        </Table>
    )
}