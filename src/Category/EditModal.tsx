import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 270,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

interface Props {
  isOpen: Boolean;
  category: string;
  onClose: () => void;
}

export default class SimpleModal extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: true,
      category: this.props.category
    };
  }
  const classes = useStyles();
  // const modalStyle: React.useState(getModalStyle);
  const modalStyle = getModalStyle();

  // const open, setOpen = React.useState(true);
  // this.props.isOpen = true;
  // console.log(this.props.isOpen);

  handleClose () {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.isOpen}
        onClose={this.handleClose}
      >
        <div style={this.modalStyle} className={this.classes.paper}>
          <h2 id="simple-modal-title">カテゴリーを編集します</h2>
          <p id="simple-modal-description">
            <input type="text">{}</input>
            <button onClick={this.handleClose}>キャンセル</button>
            <button>編集する</button>
          </p>
        </div>
      </Modal>
    );
  }
}