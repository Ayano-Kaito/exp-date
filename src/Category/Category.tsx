import * as React from 'react';
// import { connect } from 'react-redux';
import axios from "axios";
// import './Category.scss';
import {Table, TableBody, TableHead, TableCell, TableRow} from '@material-ui/core';

// 各画面のコンポーネント 
import AddModal from './AddModal';
import EditModal from './EditModal';
import DelModal from './DelModal';
import Item from '../Item/Item';

interface categoryProps {
    categories: string,
    Component: string,
    isCategoryAddModal: boolean,
    isCategoryEditModal: boolean,
    isCategoryDelModal: boolean
}

export default class Category extends React.Component<categoryProps> {
    constructor(props: categoryProps) {
        super(props);
        this.state = {
            categories: [],
            Component: null,
            isCategoryAddModal: false,
            isCategoryEditModal: false,
            isCategoryDelModal: false
        };
    }

    isShowAddModal(boolean) {
        this.setState({ isCategoryAddModal: boolean })
    }
    isShowEditModal(boolean, Id) {
        this.setState({ isCategoryEditModal: boolean, categoryId: Id })
        // console.log('カテゴリー.jsのbool：' + this.state.isCategoryEditModal)
    }
    isShowDelModal(boolean) {
        this.setState({ isCategoryDelModal: boolean })
    }
    isShowItem = () => this.setState({Component: Item})

    componentDidMount() {
        axios.get("/api/categories").then((res) => {
            this.setState({ categories: res.data })
            // console.log(this.state.categories)
        });
    }

    render() {
        // const {Component} = this.state;
        // if(Component) return <Component />;
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan="2">カテゴリーを選択してください</TableCell>
                        <TableCell onClick={() => this.isShowAddModal(true)}>追加</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.categories.map((category) => (
                        <TableRow key={category.categoryId}>
                            <TableCell onClick={this.isShowItem}>{category.categoryName}</TableCell>
                            <TableCell onClick={() => this.isShowEditModal(true, category.categoryId)}>編集</TableCell>
                            <TableCell onClick={() => this.isShowDelModal(true)}>削除</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                { this.state.isCategoryAddModal && (
                    <AddModal />
                )}
                { this.state.isCategoryEditModal && (
                    // <EditModal onClose={() => this.isShowEditModal(false)} />
                    <EditModal isOpen={this.state.isCategoryEditModal} onClose={this.isShowEditModal(false)} />
                )}
                { this.state.isCategoryDelModal && (
                    <DelModal />
                )}
            </Table>
        )
    }
}