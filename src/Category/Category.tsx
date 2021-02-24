import * as React from 'react';
import axios from "axios";
// import './Category.scss';
import {Table, TableBody, TableHead, TableCell, TableRow} from '@material-ui/core';
// import mock from './mock/categories';

// 各画面のコンポーネント 
import AddModal from './AddModal';
import EditModal from './EditModal';
import DelModal from './DelModal';
import Item from '../Item/Item';

interface categoryProps {
    categories: any,
    Component: string,
    isCategoryAddModal: boolean,
    isCategoryEditModal: boolean,
    isCategoryDelModal: boolean
}

class Category extends React.Component<categoryProps> {
    constructor(props: categoryProps) {
        super(props);
        this.state = {
            Component: null,
            isCategoryAddModal: false,
            isCategoryEditModal: false,
            isCategoryDelModal: false
        };
    }

    isShowAddModal(Boolean: boolean) {
        this.setState({ isCategoryAddModal: Boolean });
    }
    isShowEditModal(boolean: boolean, Id: string) {
        this.setState({ isCategoryEditModal: boolean, categoryId: Id });
        //console.log('カテゴリー.jsのbool：' + this.state.isCategoryEditModal)
    }
    isShowDelModal(boolean: boolean) {
        this.setState({ isCategoryDelModal: boolean })
    }
    isShowItem = () => this.setState({Component: Item})

    render() {
        // const {Component} = this.state;
        // if(Component) return <Component />;
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2}>カテゴリーを選択してください</TableCell>
                        <TableCell onClick={() => this.isShowAddModal(true)}>追加</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.categories.map((category, index) => (
                        <TableRow key={index}>
                            <TableCell onClick={this.isShowItem}>{category.categoryName}</TableCell>
                            <TableCell onClick={() => this.isShowEditModal(true, category.categoryId)}>編集</TableCell>
                            <TableCell onClick={() => this.isShowDelModal(true)}>削除</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {/* { this.props.isCategoryAddModal && (
                    <AddModal />
                )}
                { this.props.isCategoryEditModal && (
                    // <EditModal onClose={() => this.isShowEditModal(false)} />
                    <EditModal isOpen={this.props.isCategoryEditModal} onClose={this.isShowEditModal(false)} />
                )}
                { this.props.isCategoryDelModal && (
                    <DelModal />
                )} */}
            </Table>
        )
    }
}

export default Category;