import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../../assets/css/modal-style.css'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

export default class ConfirmTestRequest extends React.Component {
    state = {
        show: true
    }

    zoomImage = () => {

    }
    render() {
        return (
            <div>
                <Modal
                    scrollable={true}
                    dialogClassName="TestReviewModal MyBody AllBtns AcceptBtn"
                    show={this.state.show}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton={false}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Test Review
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="TestData">
                                <span>Name : </span><p className="TestDataObject">Ali</p><br></br>
                                <span>Date : </span><p className="TestDataObject">20-20-2020</p><br></br>
                                <span>Time : </span><p className="TestDataObject">5:30</p><br></br>
                                <span>From Home : </span><p className="TestDataObject">yes</p><br></br>
                                <span>Address : </span><p className="TestDataObject">Cairo</p><br></br>
                                <span>Phone : </span><p className="TestDataObject">+201023548432</p><br></br>
                                <span>Age : </span><p className="TestDataObject">50</p><br></br>
                            </div>
                            <div className="TestPic">
                                <AwesomeSlider>
                                    <div>
                                        <img className="ImgTestPic"
                                            src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                                            alt="new"
                                        />
                                    </div>
                                    <div>
                                        <img className="ImgTestPic"
                                            src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                                            alt="new"
                                        />
                                    </div>
                                    <div>
                                        <img className="ImgTestPic"
                                            src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                                            alt="new"
                                        />
                                    </div>
                                </AwesomeSlider>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button dialogClassName="AcceptBtn">Accept</Button>
                        <Button>Chat</Button>
                        <Button>Refuse</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
