// import React, { Component } from 'react';
// import { connect } from 'react-redux';
import React from 'react';
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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// interface Props {
//     open: boolean;
//     categoryId: String;
// }
export default function SimpleModal() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        // aria-labelledby="simple-modal-title"
        // aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">カテゴリーを編集します</h2>
          <p id="simple-modal-description">
            <input type="text">{}</input>
            <button>キャンセル</button>
            <button>編集する</button>
          </p>
        </div>
      </Modal>
    </div>
  );
}

//   class EditModal extends Component {
//     render() {
//         return (
//             <div>
//                 カテゴリー編集
//             </div>
//         )
//     }
// }

// export default connect( ( state ) => state )( EditModal );