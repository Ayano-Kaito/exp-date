import * as React from 'react';
import axios from 'axios';
import './Category.scss';
import {Table, TableBody, TableHead, TableCell, TableRow} from '@material-ui/core';

// 各画面のコンポーネント 
import AddModal from './AddModal';
import EditModal from './EditModal';
import DelModal from './DelModal';
import Item from '../Item/Item';

enum EventType {
    Item,
    Add,
    Edit,
    Delete
}
interface CategoriesProps {
}

interface CategoriesState {
    categories: CategoryType[]
    selectedCategory: CategoryType | null,
    eventType: EventType | null,
    isCategoryAddModal: boolean,
    isCategoryEditModal: boolean,
    isCategoryDelModal: boolean
}
interface CategoryType {
    categoryId: string,
    categoryName: string
}

class Category extends React.Component<CategoriesProps, CategoriesState> {
    constructor(props: CategoriesProps) {
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

    showCategory(category : CategoryType) {
        this.setState({selectedCategory: category, eventType: EventType.Item})
    }
    addCategory() {
        this.setState({selectedCategory: {categoryId: '', categoryName: ''}, eventType: EventType.Add})
    }
    editCategory(category: CategoryType) {
        this.setState({selectedCategory: category, eventType: EventType.Edit})
    }
    deleteCategory(category: CategoryType) {
        this.setState({selectedCategory: category, eventType: EventType.Delete})
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
        return (
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
                {this.state.eventType === EventType.Item && (
                    <Item onClose={() => this.clearEvent()} isOpen={true} category={this.state.selectedCategory} />
                )}
                {this.state.eventType === EventType.Add && (
                    <AddModal onClose={() => this.clearEvent()} isOpen={true} />
                )}
                {this.state.eventType === EventType.Edit && (
                    <EditModal onClose={() => this.clearEvent()} isOpen={true} category={this.state.selectedCategory} />
                )}
                {this.state.eventType === EventType.Delete && (
                    <DelModal onClose={() => this.clearEvent()} isOpen={true} category={this.state.selectedCategory} />
                )}
            </Table>
        )
    }
}

export default Category;