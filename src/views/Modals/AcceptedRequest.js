// import React from 'react';
// import { Button, Modal } from 'react-bootstrap';
// import CustomInput from "components/CustomInput/CustomInput.js";

// export default class AcceptedRequest extends React.Component {
//     state = {
//         show: true
//     }

//     mystyle = {

//     };

//     render() {
//         return (
//             <div>
//                 <Modal
//                     dialogClassName="TestReviewModal MyBody AllBtns AcceptBtn"
//                     show={this.state.show}
//                     size="xl"
//                     aria-labelledby="contained-modal-title-vcenter"
//                     centered
//                 >
//                     <Modal.Header closeButton={false}>
//                         <Modal.Title id="contained-modal-title-vcenter">
//                             Accepted Request
//                         </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <span>Enter Total Price : </span> <CustomInput
//                             labelText="Test Cost"
//                             id="username"
//                             formControlProps={{
//                                 fullWidth: false
//                             }}
//                         />

//                         <p>Precautions : </p>
//                         <textarea id="w3mission" rows="4" cols="50"></textarea>
//                         <div>
//                             <label for="cars">Choose Employee</label>

//                             <select id="cars">
//                                 <option value="Ali">Ali</option>
//                                 <option value="Muhamed">Muhamed</option>
//                                 <option value="sara">sara</option>
//                                 <option value="alia">alia</option>
//                             </select>
//                         </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button>Send</Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>
//         );
//     }
// }
