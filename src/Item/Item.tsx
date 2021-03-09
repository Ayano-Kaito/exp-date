import * as React from 'react';

type ItemProps = {
    onClose: () => void
}

export default class Item extends React.Component<ItemProps> {
    constructor(props: ItemProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <p onClick={this.props.onClose}>アイテム一覧</p>
            </div>
        )
    }
}