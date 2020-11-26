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
            console.log(res.data)
            this.setState({ category: res.data })
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
                        <tr className="category__info">
                            <td className="category__info--item">カテゴリー</td>
                            <td className="category__info--edit">編集</td>
                            <td className="category__info--delete">削除</td>
                            {/* {data.map((value) => (
                                <td style={this.td}>{value.category}</td>
                                <td style={this.td} onclick={<EditForm />}>編集</td>
                                <td style={this.td} onclick={<DelForm />}>削除</td>
                            ))} */}
                        </tr>
                    </table>
                </div>
        )
    }
}

export default connect((state) => state)(Category);