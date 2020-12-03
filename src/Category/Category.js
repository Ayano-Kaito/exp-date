import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
// import './Category.scss';
import {Table, TableBody, TableHead, TableCell, TableRow} from '@material-ui/core';

// 各画面のコンポーネント 
import AddForm from './AddForm';
import EditForm from './EditForm';
import DelForm from './DelForm';
import Item from '../Item/Item';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            addCategory: false,
            Component: null
        };
    }

    selectAdd = () => this.setState({Component: AddForm})
    selectEdit = () => this.setState({Component: EditForm})
    selectDel = () => this.setState({Component: DelForm})
    selectItem = () => this.setState({Component: Item})

    componentDidMount() {
        axios.get("/api/categories").then((res) => {
            this.setState({ category: res.data })
            console.log(this.state.category)
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
                        <TableCell onClick={this.selectAdd}>追加</TableCell>
                        { this.addCategory && <AddForm />}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.category.map((value) => (
                        <TableRow key={value.categoryId}>
                            <TableCell onClick={this.selectItem}>{value.category}</TableCell>
                            <TableCell onClick={this.selectEdit}>編集</TableCell>
                            <TableCell onClick={this.selectDel}>削除</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }
}

export default connect((state) => state)(Category);