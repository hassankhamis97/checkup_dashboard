import moment from 'moment'
import React, { Component } from 'react'
// import ReactLoading from 'react-load'
// import 'react-toastify/dist/ReactToastify.css'
// import {firestore, storage} from '../../Config/MyFirebase'
import { firestore, storage } from '../../firebase';
import images from 'components/Themes/Images'
import './ChatBoard.css'
import { AppString } from './Const'
import Authentication from 'Authentication';

export default class ChatBoard extends Component {
    constructor(props) {
        debugger
        super(props)
        this.state = {
            isLoading: false,
            isShowSticker: false,
            inputValue: ''
        }
        // this.currentUserId = localStorage.getItem(AppString.ID)
        // this.currentUserAvatar = localStorage.getItem(AppString.PHOTO_URL)
        this.currentUserAvatar = Authentication.loggedUser.photoURL
        // this.currentUserNickname = localStorage.getItem(AppString.NICKNAME)
        this.currentUserNickname = Authentication.loggedUser.displayName
        this.listMessage = []
        // this.currentPeerUser = this.props.currentPeerUser
        this.currentUserId = Authentication.loggedUser.uid
        // this.currentPeerUser = {
        //     aboutMe: "",
        //     id: "QPhRlT1qzMcoRyBVu4S8KDguUzw1",
        //     nickname: "Checkup Team",
        //     photoUrl: "https://lh6.googleusercontent.com/-q13rucyz5to/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJMPlPNoECDirvf7kqGeGnB-WK-DEw/photo.jpg"
        // }
        this.currentPeerUser = this.props.currentPeerUser
        this.groupChatId = null
        this.removeListener = null
        this.currentPhotoFile = null
        this.onSendMessage = this.onSendMessage.bind(this)
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    componentDidMount() {
        // For first render, it's not go through componentWillReceiveProps
        this.getListHistory()
    }

    componentWillUnmount() {
        if (this.removeListener) {
            this.removeListener()
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.currentPeerUser) {
            this.currentPeerUser = newProps.currentPeerUser
            this.getListHistory()
        }
    }

    getListHistory = () => {
        debugger
        if (this.removeListener) {
            this.removeListener()
        }
        this.listMessage.length = 0
        this.setState({ isLoading: true })
        debugger
        if (
            this.hashString(this.currentUserId) <=
            this.hashString(this.currentPeerUser.id)
        ) {
            debugger
            this.groupChatId = `${this.currentUserId}-${this.currentPeerUser.id}`
        } else {
            debugger
            this.groupChatId = `${this.currentPeerUser.id}-${this.currentUserId}`
        }

        // Get history and listen new data added
        debugger
        this.removeListener = firestore
            .collection(AppString.NODE_MESSAGES)
            .doc(this.groupChatId)
            .collection(this.groupChatId)
            .onSnapshot(
                snapshot => {
                    snapshot.docChanges().forEach(change => {
                        if (change.type === AppString.DOC_ADDED) {
                            this.listMessage.push(change.doc.data())
                        }
                    })
                    this.setState({ isLoading: false })
                },
                err => {
                    // this.props.showToast(0, err.toString())
                }
            )
    }

    openListSticker = () => {
        this.setState({ isShowSticker: !this.state.isShowSticker })
    }

    onSendMessage = async (content, type,self) => {
        debugger
        if (self.state.isShowSticker && type === 2) {
            self.setState({ isShowSticker: false })
        }

        if (content.trim() === '') {
            return
        }

        const timestamp = moment()
            .valueOf()
            .toString()

        const itemMessage = {
            idFrom: self.currentUserId,
            idTo: self.currentPeerUser.id,
            timestamp: timestamp,
            content: content.trim(),
            type: type
        }
        debugger
        firestore
            .collection(AppString.NODE_MESSAGES)
            .doc(self.groupChatId)
            .collection(self.groupChatId)
            .doc(timestamp)
            .set(itemMessage)
            .then(() => {
                self.setState({ inputValue: '' })
            })
            .catch(err => {
                // self.props.showToast(0, err.toString())
            })
        const chatUserResult = await firestore.collection(AppString.NODE_USERCHAT).doc(self.currentPeerUser.id).get()
        if (chatUserResult.data().currentViewedPerson == Authentication.loggedUser.uid) {
            var pearedChatStatus = {
                lastMsgTimeStamp: timestamp,
                noOfUnReadMessage: 0,
                // currentViewedPerson: ""
            }
        }
        else{
            debugger;
             
            var pearObj = await firestore.collection(AppString.NODE_USERCHAT).doc(self.currentPeerUser.id).collection(self.currentPeerUser.id).doc(Authentication.loggedUser.uid).get()
            var noOfRM = pearObj.data().noOfUnReadMessage
            var pearedChatStatus = {
                lastMsgTimeStamp: timestamp,
                noOfUnReadMessage: parseInt(noOfRM) + 1,
                // currentViewedPerson: ""
            }
        }
        var senderChatStatus = {
            lastMsgTimeStamp: timestamp,
            noOfUnReadMessage: 0,
            // currentViewedPerson: ""
        }
        
        firestore
            .collection(AppString.NODE_USERCHAT)
            .doc(Authentication.loggedUser.uid)
            .collection(Authentication.loggedUser.uid)
            .doc(self.currentPeerUser.id)
            .set(senderChatStatus)
            .then(() => {

            })
            .catch(err => {
                // self.props.showToast(0, err.toString())
            })
        firestore
            .collection(AppString.NODE_USERCHAT)
            .doc(self.currentPeerUser.id)
            .collection(self.currentPeerUser.id)
            .doc(Authentication.loggedUser.uid)
            .set(pearedChatStatus)
            .then(() => {

            })
            .catch(err => {
                self.props.showToast(0, err.toString())
            })
        // self.props.updateList(self.props.index)

    }

    onChoosePhoto = event => {
        debugger
        if (event.target.files && event.target.files[0]) {
            this.setState({ isLoading: true })
            this.currentPhotoFile = event.target.files[0]
            // Check this file is an image?
            const prefixFiletype = event.target.files[0].type.toString()
            if (prefixFiletype.indexOf(AppString.PREFIX_IMAGE) === 0) {
                this.uploadPhoto()
            } else {
                this.setState({ isLoading: false })
                this.props.showToast(0, 'This file is not an image')
            }
        } else {
            this.setState({ isLoading: false })
        }
    }

    uploadPhoto = () => {
        debugger
        if (this.currentPhotoFile) {
            const timestamp = moment()
                .valueOf()
                .toString()

            const uploadTask = storage
                .ref()
                .child(timestamp)
                .put(this.currentPhotoFile)

            uploadTask.on(
                AppString.UPLOAD_CHANGED,
                null,
                err => {
                    this.setState({ isLoading: false })
                    this.props.showToast(0, err.message)
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        this.setState({ isLoading: false })
                        this.onSendMessage(downloadURL, 1)
                    })
                }
            )
        } else {
            this.setState({ isLoading: false })
            this.props.showToast(0, 'File is null')
        }
    }

    onKeyboardPress = event => {
        if (event.key === 'Enter') {
            this.onSendMessage(this.state.inputValue, 0,this)
        }
    }

    scrollToBottom = () => {
        if (this.messagesEnd) {
            this.messagesEnd.scrollIntoView({})
        }
    }

    render() {
        return (
            <div className="viewChatBoard">
                {/* Header */}
                <div className="headerChatBoard">
                    <img
                        className="viewAvatarItem"
                        src={this.currentPeerUser.photoUrl}
                        alt="icon avatar"
                    />
                    <span className="textHeaderChatBoard">
                        {this.currentPeerUser.nickname}
                    </span>
                </div>

                {/* List message */}
                <div className="viewListContentChat">
                    {this.renderListMessage()}
                    <div
                        style={{ float: 'left', clear: 'both' }}
                        ref={el => {
                            this.messagesEnd = el
                        }}
                    />
                </div>

                {/* Stickers */}
                {this.state.isShowSticker ? this.renderStickers() : null}

                {/* View bottom */}
                <div className="viewBottom">
                    <img
                        className="icOpenGallery"
                        src={images.ic_photo}
                        alt="icon open gallery"
                        onClick={() => this.refInput.click()}
                    />
                    <input
                        ref={el => {
                            this.refInput = el
                        }}
                        accept="image/*"
                        className="viewInputGallery"
                        type="file"
                        onChange={this.onChoosePhoto}
                    />

                    <img
                        className="icOpenSticker"
                        src={images.ic_sticker}
                        alt="icon open sticker"
                        onClick={this.openListSticker}
                    />

                    <input
                        className="viewInput"
                        placeholder="Type your message..."
                        value={this.state.inputValue}
                        onChange={event => {
                            this.setState({ inputValue: event.target.value })
                        }}
                        onKeyPress={this.onKeyboardPress}
                    />
                    <img
                        className="icSend"
                        src={images.ic_send}
                        alt="icon send"
                        onClick={() => this.onSendMessage(this.state.inputValue, 0)}
                    />
                </div>

                {/* Loading */}
                {this.state.isLoading ? (
                    <div className="viewLoading">
                        {/* <ReactLoading
                            type={'spin'}
                            color={'#203152'}
                            height={'3%'}
                            width={'3%'}
                        /> */}
                    </div>
                ) : null}
            </div>
        )
    }

    renderListMessage = () => {
        debugger
        if (this.listMessage.length > 0) {
            let viewListMessage = []
            this.listMessage.forEach((item, index) => {
                if (item.idFrom === this.currentUserId) {
                    // Item right (my message)
                    if (item.type === 0) {
                        viewListMessage.push(
                            <div className="viewItemRight" key={item.timestamp}>
                                <span className="textContentItem">{item.content}</span>
                            </div>
                        )
                    } else if (item.type === 1) {
                        viewListMessage.push(
                            <div className="viewItemRight2" key={item.timestamp}>
                                <img
                                    className="imgItemRight"
                                    src={item.content}
                                    alt="content message"
                                />
                            </div>
                        )
                    } else {
                        viewListMessage.push(
                            <div className="viewItemRight3" key={item.timestamp}>
                                <img
                                    className="imgItemRight"
                                    src={this.getGifImage(item.content)}
                                    alt="content message"
                                />
                            </div>
                        )
                    }
                } else {
                    // Item left (peer message)
                    if (item.type === 0) {
                        viewListMessage.push(
                            <div className="viewWrapItemLeft" key={item.timestamp}>
                                <div className="viewWrapItemLeft3">
                                    {this.isLastMessageLeft(index) ? (
                                        <img
                                            src={this.currentPeerUser.photoUrl}
                                            alt="avatar"
                                            className="peerAvatarLeft"
                                        />
                                    ) : (
                                            <div className="viewPaddingLeft" />
                                        )}
                                    <div className="viewItemLeft">
                                        <span className="textContentItem">{item.content}</span>
                                    </div>
                                </div>
                                {this.isLastMessageLeft(index) ? (
                                    <span className="textTimeLeft">
                                        {moment(Number(item.timestamp)).format('ll')}
                                    </span>
                                ) : null}
                            </div>
                        )
                    } else if (item.type === 1) {
                        viewListMessage.push(
                            <div className="viewWrapItemLeft2" key={item.timestamp}>
                                <div className="viewWrapItemLeft3">
                                    {this.isLastMessageLeft(index) ? (
                                        <img
                                            src={this.currentPeerUser.photoUrl}
                                            alt="avatar"
                                            className="peerAvatarLeft"
                                        />
                                    ) : (
                                            <div className="viewPaddingLeft" />
                                        )}
                                    <div className="viewItemLeft2">
                                        <img
                                            className="imgItemLeft"
                                            src={item.content}
                                            alt="content message"
                                        />
                                    </div>
                                </div>
                                {this.isLastMessageLeft(index) ? (
                                    <span className="textTimeLeft">
                                        {moment(Number(item.timestamp)).format('ll')}
                                    </span>
                                ) : null}
                            </div>
                        )
                    } else {
                        viewListMessage.push(
                            <div className="viewWrapItemLeft2" key={item.timestamp}>
                                <div className="viewWrapItemLeft3">
                                    {this.isLastMessageLeft(index) ? (
                                        <img
                                            src={this.currentPeerUser.photoUrl}
                                            alt="avatar"
                                            className="peerAvatarLeft"
                                        />
                                    ) : (
                                            <div className="viewPaddingLeft" />
                                        )}
                                    <div className="viewItemLeft3" key={item.timestamp}>
                                        <img
                                            className="imgItemLeft"
                                            src={this.getGifImage(item.content)}
                                            alt="content message"
                                        />
                                    </div>
                                </div>
                                {this.isLastMessageLeft(index) ? (
                                    <span className="textTimeLeft">
                                        {moment(Number(item.timestamp)).format('ll')}
                                    </span>
                                ) : null}
                            </div>
                        )
                    }
                }
            })
            return viewListMessage
        } else {
            return (
                <div className="viewWrapSayHi">
                    <span className="textSayHi">Start Chat With Client</span>
                </div>
            )
        }
    }

    renderStickers = () => {
        return (
            <div className="viewStickers">
                <img
                    className="imgSticker"
                    src={images.mimi1}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi1', 2)}
                />
                <img
                    className="imgSticker"
                    src={images.mimi2}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi2', 2)}
                />
                <img
                    className="imgSticker"
                    src={images.mimi3}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi3', 2)}
                />
                <img
                    className="imgSticker"
                    src={images.mimi4}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi4', 2)}
                />
                <img
                    className="imgSticker"
                    src={images.mimi5}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi5', 2)}
                />
                <img
                    className="imgSticker"
                    src={images.mimi6}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi6', 2)}
                />
                <img
                    className="imgSticker"
                    src={images.mimi7}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi7', 2)}
                />
                <img
                    className="imgSticker"
                    src={images.mimi8}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi8', 2)}
                />
                <img
                    className="imgSticker"
                    src={images.mimi9}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi9', 2)}
                />
            </div>
        )
    }

    hashString = str => {
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            hash += Math.pow(str.charCodeAt(i) * 31, str.length - i)
            hash = hash & hash // Convert to 32bit integer
        }
        return hash
    }

    getGifImage = value => {
        switch (value) {
            case 'mimi1':
                return images.mimi1
            case 'mimi2':
                return images.mimi2
            case 'mimi3':
                return images.mimi3
            case 'mimi4':
                return images.mimi4
            case 'mimi5':
                return images.mimi5
            case 'mimi6':
                return images.mimi6
            case 'mimi7':
                return images.mimi7
            case 'mimi8':
                return images.mimi8
            case 'mimi9':
                return images.mimi9
            default:
                return null
        }
    }

    isLastMessageLeft(index) {
        if (
            (index + 1 < this.listMessage.length &&
                this.listMessage[index + 1].idFrom === this.currentUserId) ||
            index === this.listMessage.length - 1
        ) {
            return true
        } else {
            return false
        }
    }

    isLastMessageRight(index) {
        debugger
        if (
            (index + 1 < this.listMessage.length &&
                this.listMessage[index + 1].idFrom !== this.currentUserId) ||
            index === this.listMessage.length - 1
        ) {
            return true
        } else {
            return false
        }
    }
}
