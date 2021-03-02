import * as React from 'react';

type AddModalProps = {
    onClose: () => void
}

export default class AddModal extends React.Component<AddModalProps> {
    constructor(props: AddModalProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <p onClick={this.props.onClose}>カテゴリー追加</p>
            </div>
        )
    }
}