import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
// import './Category.scss';
import {Table, TableBody, TableHead, TableCell, TableRow} from '@material-ui/core';

// 各画面のコンポーネント 
import AddModal from './AddModal';
import EditModal from './EditModal';
import DelModal from './DelModal';
import Item from '../Item/Item';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            addCategory: false,
            Component: null,
            isCategoryAddModal: false,
            isCategoryEditModal: false,
            isCategoryDelModal: false
        };
    }

    isShowAddModal(boolean) {
        this.setState({ isCategoryAddModal: boolean })
    }
    isShowEditModal(boolean) {
        this.setState({ isCategoryEditModal: boolean })
    }
    isShowDelModal(boolean) {
        this.setState({ isCategoryDelModal: boolean })
    }
    isShowItem = () => this.setState({Component: Item})

    componentDidMount() {
        axios.get("/api/categories").then((res) => {
            this.setState({ categories: res.data })
            console.log(this.state.categories)
        });
    }

    render() {
        const {Component} = this.state;
        if(Component) return <Component />;
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
                            <TableCell onClick={() => this.isShowEditModal(true)}>編集</TableCell>
                            <TableCell onClick={() => this.isShowDelModal(true)}>削除</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                { this.state.isCategoryAddModal && (
                    <AddModal />
                )}
                { this.state.isCategoryEditModal && (
                    <EditModal />
                )}
                { this.state.isCategoryDelModal && (
                    <DelModal />
                )}
            </Table>
        )
    }
}

export default connect((state) => state)(Category);