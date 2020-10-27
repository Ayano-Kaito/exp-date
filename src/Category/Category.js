import React, { Component } from 'react';
import { connect } from 'react-redux';
// 各画面のコンポーネント 
import AddForm from './AddForm';
import EditCategory from './EditForm';
import DelCategory from './DelForm';
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
                <title>カテゴリーを選択してください</title>
                <p onclick={<AddForm />}>追加</p>
            　      <tr>
                        <th style={this.th}>{ data.map((value) => (
                            <td onClick={<Item categryId={data.categryId}/>}>{value}</td>
                            <td onclick={<EditForm />}>編集</td>
                            <td onclick={<DelForm />}>削除</td>
                        ))}</th>
                    </tr>
            </div>
        )
    }
}

export default connect((state) => state)(Category);