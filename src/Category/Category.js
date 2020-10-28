import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Category.scss';

// 各画面のコンポーネント 
import AddForm from './AddForm';
// import EditForm from './EditForm';
// import DelForm from './DelForm';
// import Item from '../Item/Item';

class Category extends Component {

    render() {
        let data = this.props.value
        console.log(data)
        return (
                <div>
                    <table className="category">
                        <tr className="category__header">
                            <th className="category__header--title" colSpan="2">カテゴリーを選択してください</th>
                            <th className="category__header--add" onClick={<AddForm />}>追加</th>
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