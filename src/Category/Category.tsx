import * as React from 'react';
import axios from "axios";
import './Category.scss';
import {Table, TableBody, TableHead, TableCell, TableRow} from '@material-ui/core';
import mock from '../mock/categories';

// 各画面のコンポーネント 
import AddModal from './AddModal';
import EditModal from './EditModal';
import DelModal from './DelModal';
import Item from '../Item/Item';

interface categoriesProps {
}

interface categoriesState {
    categories: {
        categoryId: string,
        categoryName: string,
    }[]
    selectedCategory: string | null,
    isCategoryAddModal: boolean,
    isCategoryEditModal: boolean,
    isCategoryDelModal: boolean
}

class Category extends React.Component<categoriesProps, categoriesState> {
    constructor(props: categoriesProps) {
        super(props);
        this.state = {
            categories: [],
            selectedCategory: null,
            isCategoryAddModal: false,
            isCategoryEditModal: false,
            isCategoryDelModal: false
        };
    }

    addModal(isAddModal: boolean) {
        this.setState({ isCategoryAddModal: isAddModal });
    }
    editModal(isEditModal: boolean) {
        this.setState({ isCategoryEditModal: isEditModal });
        //console.log('カテゴリー.jsのbool：' + this.state.isCategoryEditModal)
    }
    delModal(isDelModal: boolean) {
        this.setState({ isCategoryDelModal: isDelModal })
    }
    // item = () => this.setState({selectedCategory: Item})

    componentDidMount() {
        axios.get("/api/categories").then((res) => {
            this.setState({ categories: res.data })
            console.log(this.state.categories)
        });
    }
    render() {
        // const {Component} = this.state;
        // if(Component) return <Component />;
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2}>カテゴリーを選択してください</TableCell>
                        <TableCell onClick={() => this.addModal(true)}>追加</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.categories.map((category, index) => (
                        <TableRow key={index}>
                            {/* <TableCell onClick={this.item}>{category.categoryName}</TableCell> */}
                            <TableCell onClick={() => this.editModal(true)}>編集</TableCell>
                            <TableCell onClick={() => this.delModal(true)}>削除</TableCell>
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