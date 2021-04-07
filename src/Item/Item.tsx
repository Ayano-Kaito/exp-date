import * as React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Table, TableHead, TableBody, TableCell, TableRow} from '@material-ui/core';

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
    items: Array<item>,
}

interface item {
    itemName: string,
    itemId: string,
    stock: number,
    limitDate: string,
    imagePath: string,
    remark: string
}

export default function Item (props: ItemProps) {
    const [items, setItems] = React.useState<itemsType>();

    React.useEffect(() => {
        axios.get("/api/items").then((res) => {
            console.log(res);
            setItems(res.data);
        })
        .catch((e) => {
            console.error(e.response)
        })
    }, [])

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Link to={`/`}>戻る</Link>
                    </TableCell>
                    <TableCell>サ</TableCell>
                    <TableCell>リ</TableCell>
                    <TableCell colSpan={2}>{items?.categoryName}</TableCell>
                    <TableCell align="right">＋</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {items?.items.map((item) => (
                    <TableRow key={item.itemId}>
                        <TableCell>{item.imagePath}</TableCell>
                        <TableCell>{item.itemName}</TableCell>
                        <TableCell>削除</TableCell>
                        <TableCell>{item.limitDate}</TableCell>
                        <TableCell>{item.stock}</TableCell>
                        <TableCell>{item.remark}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}