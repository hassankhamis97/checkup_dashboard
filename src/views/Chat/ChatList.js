
import moment from 'moment'
import React, { Component } from 'react'
// import ReactLoading from 'react-load'
// import 'react-toastify/dist/ReactToastify.css'
// import {firestore, storage} from '../../Config/MyFirebase'
import { firestore, storage } from '../../firebase';
import './ChatBoard.css'
import { AppString } from './Const'
import Authentication from 'Authentication';
import ChatOperations from './ChatOperations'

export default class ChatList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            isOpenDialogConfirmLogout: false,
            currentPeerUser: null,
            index: null,
            noUnReadTotalMessagesList: []
        }
        // this.getListUser = this.getListUser.bind(this)
        this.currentUserId = Authentication.loggedUser.uid
        this.currentUserAvatar = Authentication.loggedUser.photoURL
        this.currentUserNickname = Authentication.loggedUser.displayName
        this.listUser = []
        this.limit = 2;
        this.skip = 0;
        // var chatOperations = new ChatOperations()
        // chatOperations.getUnReadMessagesForSpecificPearedPerson( ,(number) => { this.setState({noUnReadTotalMessages: number}) })
    }
    // componentWillUnmount() {
    //     debugger
    //     var senderChatStatus = {
    //         currentViewedPerson: ""
    //     }

    // firestore
    //     .collection(AppString.NODE_USERCHAT)
    //     .doc(Authentication.loggedUser.uid)
    //     .set(senderChatStatus)
    //     .then(() => {

    //     })
    //     .catch(err => {
    //         // this.props.showToast(0, err.toString())
    //     })
    //     // this.unblock();
    //  }
    componentDidMount() {
        // this.checkLogin()
        this.getListUser(this)
    }
    getListUser = (self) => {
        debugger
        // const result = await firestore.collection(AppString.NODE_USERS).orderBy('nickname').startAfter(self.listUser.length > 0 ? self.listUser[self.listUser.length-1] : 0).limit(2).get()
        // if (result.docs.length > 0) {
        //     self.skip += result.docs.length
        //     // self.listUser = [...result.docs]
        //     self.listUser.push(...result.docs)
        //     self.setState({isLoading: false})
        // }
        firestore.collection(AppString.NODE_USERCHAT).doc(Authentication.loggedUser.uid).collection(Authentication.loggedUser.uid).orderBy('lastMsgTimeStamp', 'desc').onSnapshot(
            function (chatUserResult) {
                self.state.noUnReadTotalMessagesList = []
                self.listUser = []
                for (let i = 0; i < chatUserResult.docs.length; i++) {
                    debugger
                    self.state.noUnReadTotalMessagesList.push(chatUserResult.docs[i].data().noOfUnReadMessage)
                    const result = firestore.collection(AppString.NODE_USERS).doc(chatUserResult.docs[i].id).get().then(result => {
                        debugger
                        console.log(result.docs)
                        self.listUser.push(result)
                        self.forceUpdate()
                    })
                    //if (result.docs.length > 0) {

                    // self.skip += result.docs.length
                    // // self.listUser = [...result.docs]
                    // self.listUser.push(...result.docs)
                    // self.setState({ isLoading: false })
                    // }
                }

                // self.setState({ isLoading: false })
                // if (result.docs.length > 0) {
                //     debugger
                //     console.log(result)
                //     // self.skip += result.docs.length
                //     // // self.listUser = [...result.docs]
                //     // self.listUser.push(...result.docs)
                //     // self.setState({isLoading: false})
                // }
            })

    }


    // updateList = (index) => {
    //     this.listUser.splice(0, 0, this.listUser.splice(index, 1)[0]);
    //     this.state.index = 0;
    //     this.forceUpdate();
    // }
    handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            debugger
            this.getListUser(this)
        }
    }
    renderListUser = () => {
        if (this.listUser.length > 0) {
            let viewListUser = []
            this.listUser.forEach((item, index) => {
                if (item.data().id !== this.currentUserId) {
                    viewListUser.push(
                        <button
                            key={index}
                            className={
                                this.state.currentPeerUser &&
                                    this.state.currentPeerUser.id === item.data().id
                                    ? 'viewWrapItemFocused'
                                    : 'viewWrapItem'
                            }
                            onClick={() => {
                                this.props.handlePearClick(item.data(), index, this)
                                // this.setState({ currentPeerUser: item.data() , index: index })
                            }}
                        >
                            <img
                                className="viewAvatarItem"
                                src={item.data().photoUrl}
                                alt="icon avatar"
                            />
                            <div className="viewWrapContentItem">
                                <span className="textItem">{`Nickname: ${
                                    item.data().nickname
                                    }`}</span>
                                <span className="textItem">{`About me: ${
                                    item.data().aboutMe ? item.data().aboutMe : 'Not available'
                                    }`}</span>
                            </div>
                            {this.state.noUnReadTotalMessagesList[index] == 0 ? '' : < span class="notificationChat">{this.state.noUnReadTotalMessagesList[index]}</span>}
                        </button>
                    )
                }
            })
            return viewListUser
        } else {
            return null
        }
    }
    render() {
        return (
            <div className="viewListUser" onScroll={this.handleScroll.bind(this)}> {this.renderListUser()}</div>
        );
    }
}