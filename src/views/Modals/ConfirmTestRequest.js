// import React from 'react';
// import { Button, Modal } from 'react-bootstrap';

// export default class ConfirmTestRequest extends React.Component {

//     state = {
//         show: true
//     }
//     close = () => {
//         this.setState({ show: false });
//     }
//     open() {
//         this.setState({ show: true });
//     }

//     render() {
//         return (
//             <div>

//                 <Modal show={this.state.show}
//                     dialogClassName="Confirmation AllBtns AcceptBtn"
//                     onHide={this.close}
//                     aria-labelledby="contained-modal-title-vcenter"
//                     centered
//                 >
//                     <Modal.Header closeButton={false}>Request Test Review</Modal.Header>
//                     <Modal.Body>
//                         Are you sure you took sample from patient ?
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button>Yes</Button>
//                         <Button onClick={this.close}>No</Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>
//         );
//     }
// }