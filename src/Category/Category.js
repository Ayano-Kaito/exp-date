import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import './Category.scss';

// 各画面のコンポーネント 
import AddForm from './AddForm';
// import EditForm from './EditForm';
// import DelForm from './DelForm';
// import Item from '../Item/Item';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCategory: false,
            category: []
        };
    }

    componentDidMount() {
        axios.get("/api/categories").then((res) => {
            this.setState({ category: res.data })
            console.log(this.state.category)
        });
    }

    addForm() {
        this.setState((state) => ({
            addCategory: true,
        }));
    }

    render() {
        return (
                <div>
                    <table className="category">
                        <tr className="category__header">
                            <th className="category__header--title" colSpan="2">カテゴリーを選択してください</th>
                            <th className="category__header--add" onClick={this.addForm}>追加</th>
                            { this.addCategory && <AddForm />}
                        </tr>
                        {this.state.category.map((value) => (
                            <tr className="category__info">
                                <td className="category__info--item">{value.category}</td>
                                <td className="category__info--edit">編集</td>
                                <td className="category__info--delete">削除</td>
                            </tr>
                        ))}
                    </table>
                </div>
        )
    }
}

export default connect((state) => state)(Category);