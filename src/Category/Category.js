import React, { Component } from 'react';
import { connect } from 'react-redux';
// 各画面のコンポーネント 
import AddForm from './AddForm';
import EditForm from './EditForm';
import DelForm from './DelForm';
import Item from '../Item/Item';

class Category extends Component {
    // スタイルの設定
    th = {
        fontSize: "14px"
    }
    td = {
        fontSize: "12px"
    }

    render() {
        let data = this.props.value
        return (
            <div>
                <table>
                <title>カテゴリーを選択してください</title>
                <p onclick={<AddForm />}>追加</p>
            　      <tr>
                        {data.map((value) => (
                        <th style={this.th}>
                            <td onClick={<Item categoryId={data.categoryId}/>}>{value}</td>
                            <td onclick={<EditForm />}>編集</td>
                            <td onclick={<DelForm />}>削除</td>
                        </th>
                        ))}
                    </tr>
                </table>
            </div>
        )
    }
}

export default connect((state) => state)(Category);