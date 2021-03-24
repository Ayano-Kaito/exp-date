import * as React from 'react';

type DeleteModalProps = {
    onClose: () => void
}

export default class DelModal extends React.Component<DeleteModalProps> {
    constructor(props: DeleteModalProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <p onClick={this.props.onClose}>カテゴリー削除</p>
            </div>
        )
    }
}