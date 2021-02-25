import * as React from 'react';
import axios from "axios";
// import './Category.scss';
import {Table, TableBody, TableHead, TableCell, TableRow} from '@material-ui/core';

// 各画面のコンポーネント 
import AddModal from './AddModal';
import EditModal from './EditModal';
import DelModal from './DelModal';
import Item from '../Item/Item';

enum EventType {
    View,
    Add,
    Edit,
    Delete
}

type ListState = {
    categories: CategoryType[],
    selectedCategory: CategoryType | null,
    eventType: EventType | null,
    isCategoryAddModal: boolean,
    isCategoryEditModal: boolean,
    isCategoryDelModal: boolean
}
type CategoryType = {
    categoryId: string,
    categoryName: string
}

class Category extends React.Component<{}, ListState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            categories: [],
            selectedCategory: null,
            eventType: null,
            isCategoryAddModal: false,
            isCategoryEditModal: false,
            isCategoryDelModal: false
        };
    }

    // isShowAddModal(Boolean: boolean) {
    //     this.setState({ isCategoryAddModal: Boolean });
    // }
    // isShowEditModal(boolean: boolean, Id: string) {
    //     this.setState({ isCategoryEditModal: boolean, categoryId: Id });
    //     // console.log('カテゴリー.jsのbool：' + this.state.isCategoryEditModal)
    // }
    // isShowDelModal(boolean: boolean) {
    //     this.setState({ isCategoryDelModal: boolean })
    // }
    // isShowItem = () => this.setState({Component: Item})
    showCategory(category : CategoryType) {
        this.setState({selectedCategory: category, eventType: EventType.View})
    }
    editCategory(category: CategoryType) {
        this.setState({selectedCategory: category, eventType: EventType.Edit})
    }
    deleteCategory(category: CategoryType) {
        this.setState({selectedCategory: category, eventType: EventType.Delete})
    }
    addCategory() {
        this.setState({selectedCategory: {categoryId: '', categoryName: ''}, eventType: EventType.Add})
    }
    clearEvent(): void {
        this.setState({eventType: null})
    }

    componentDidMount() {
        axios.get("/api/categories").then((res) => {
            this.setState({ categories: res.data })
        });
    }

    render() {
        // const {Component} = this.state;
        // if(Component) return <Component />;
        return (
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}>カテゴリーを選択してください</TableCell>
                            <TableCell onClick={() => this.addCategory()}>追加</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.categories.map((category) => (
                            <TableRow key={category.categoryId}>
                                <TableCell onClick={() => this.showCategory(category)}>{category.categoryName}</TableCell>
                                <TableCell onClick={() => this.editCategory(category)}>編集</TableCell>
                                <TableCell onClick={() => this.deleteCategory(category)}>削除</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {this.state.eventType === EventType.Add && (
                    <AddModal closeCallback={() => this.clearEvent()} />
                )}
            </div>
        )
    }
}

export default Category;