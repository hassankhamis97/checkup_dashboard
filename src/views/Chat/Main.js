import React, { Component } from 'react'
// import ReactLoading from 'react-loading'
// import { withRouter } from 'react-router'
import { firestore } from '../../firebase';
import images from 'components/Themes/Images'
import WelcomeBoard from './WelcomeBoard'
import './Main.css'
import ChatBoard from './ChatBoard'
import { AppString } from './Const'
import avatar from "assets/img/noProfilePhoto.png";
import Authentication from 'Authentication';
import ChatList from './ChatList';
import ChatOperations from './ChatOperations';
// window.onbeforeunload = async function () {

//     debugger
    // if (window.location.href === "http://localhost:3000/admin/chat") {
    //     var senderChatStatus = {
    //         currentViewedPerson: ""
    //     }

    //     await firestore
    //         .collection(AppString.NODE_USERCHAT)
    //         .doc(Authentication.loggedUser.uid)
    //         .set(senderChatStatus)
    //         .then(() => {

    //         })
    //         .catch(err => {
    //             // this.props.showToast(0, err.toString())
    //         })
    // }
// };
window.addEventListener("beforeunload", (ev) => {
    debugger
    var chatOperations = new ChatOperations()
    chatOperations.clearCurrentViewedPerson(false)
    ev.preventDefault();
    
  });
export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPeerUser: null,
            index: null,
            isNew: true
        }
        // this.getListUser = this.getListUser.bind(this)
        this.currentUserId = Authentication.loggedUser.uid
        this.currentUserAvatar = Authentication.loggedUser.photoURL
        this.currentUserNickname = Authentication.loggedUser.displayName
        this.chatListRef = null
    }

    // componentDidMount() {
    //     prompt('hello')
    //     // Note that navigating to child routes won't register as leaving this route. In other words,
    //     // navigating to any routes described in this.props.route.childRoutes[] won't trigger the callback.
    //     // this.props.router.setRouteLeaveHook(this.props.route, () => {
    //     //     debugger
    //     //   if (this.state.unsaved)
    //     //     return 'You have unsaved information, are you sure you want to leave this page?'
    //     // })
    //   }
    // componentDidUnmount() {
    //     prompt('hello')
    //     // this.checkLogin()
    //     // this.getListUser(this)
    // }
    componentWillUnmount() {
        var chatOperations = new ChatOperations()
        chatOperations.clearCurrentViewedPerson(true)
        // this.checkLogin()
        // this.getListUser(this)
    }


    // checkLogin = () => {
    //     if (!localStorage.getItem(AppString.ID)) {
    //         this.setState({isLoading: false}, () => {
    //             this.props.history.push('/')
    //         })
    //     } else {
    //         this.getListUser()
    //     }
    // }

    // getListUser = async (self) => {
    //     debugger
    //     // const result = await firestore.collection(AppString.NODE_USERS).orderBy('nickname').startAfter(self.listUser.length > 0 ? self.listUser[self.listUser.length-1] : 0).limit(2).get()
    //     // if (result.docs.length > 0) {
    //     //     self.skip += result.docs.length
    //     //     // self.listUser = [...result.docs]
    //     //     self.listUser.push(...result.docs)
    //     //     self.setState({isLoading: false})
    //     // }
    //     const chatUserResult = await firestore.collection(AppString.NODE_USERCHAT).doc(Authentication.loggedUser.uid).collection(Authentication.loggedUser.uid).orderBy('lastMsgTimeStamp', 'desc').get()
    //     for (let i = 0; i < chatUserResult.docs.length; i++) {
    //         const result = await firestore.collection(AppString.NODE_USERS).doc(chatUserResult.docs[i].id).get()
    //         debugger
    //             console.log(result.docs)
    //             self.listUser.push(result)

    //         //if (result.docs.length > 0) {

    //             // self.skip += result.docs.length
    //             // // self.listUser = [...result.docs]
    //             // self.listUser.push(...result.docs)
    //             // self.setState({ isLoading: false })
    //        // }
    //     }
    //     self.setState({ isLoading: false })
    //     // if (result.docs.length > 0) {
    //     //     debugger
    //     //     console.log(result)
    //     //     // self.skip += result.docs.length
    //     //     // // self.listUser = [...result.docs]
    //     //     // self.listUser.push(...result.docs)
    //     //     // self.setState({isLoading: false})
    //     // }
    // }

    // onLogoutClick = () => {
    //     this.setState({
    //         isOpenDialogConfirmLogout: true
    //     })
    // }
    // updateList = (index) => {
    //     if (this.state.isNew) {
    //         this.state.isNew = false
    //         this.state.index = 0

    //         this.chatListRef.updateList(index)
    //     }
    //     // this.setState({index: 0})
    // }
    // updateIndex = i => {
    //    this.setState({index: i})
    // }
    // doLogout = () => {
    //     this.setState({isLoading: true})
    //     auth
    //         .signOut()
    //         .then(() => {
    //             this.setState({isLoading: false}, () => {
    //                 localStorage.clear()
    //                 this.props.showToast(1, 'Logout success')
    //                 this.props.history.push('/')
    //             })
    //         })
    //         .catch(function (err) {
    //             this.setState({isLoading: false})
    //             this.props.showToast(0, err.message)
    //         })
    // }

    // hideDialogConfirmLogout = () => {
    //     this.setState({
    //         isOpenDialogConfirmLogout: false
    //     })
    // }

    // onProfileClick = () => {
    //     this.props.history.push('/profile')
    // }
    // scrolled = (e) => {
    //     debugger
    //     var myDiv = document.getElementsByClassName('viewListUser')[0];
    //     if (myDiv.offsetHeight + myDiv.scrollTop >= myDiv.scrollHeight) {
    //       scrolledToBottom(e);
    //     }
    //   }
    // handleScroll = (e) => {
    //     const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    //     if (bottom) {
    //         debugger
    //         this.getListUser(this)
    //     }
    // }
    // renderListUser = () => {
    //     if (this.listUser.length > 0) {
    //         let viewListUser = []
    //         this.listUser.forEach((item, index) => {
    //             if (item.data().id !== this.currentUserId) {
    //                 viewListUser.push(
    //                     <button
    //                         key={index}
    //                         className={
    //                             this.state.currentPeerUser &&
    //                                 this.state.currentPeerUser.id === item.data().id
    //                                 ? 'viewWrapItemFocused'
    //                                 : 'viewWrapItem'
    //                         }
    //                         onClick={() => {
    //                             this.setState({ currentPeerUser: item.data() , index: index })
    //                         }}
    //                     >
    //                         <img
    //                             className="viewAvatarItem"
    //                             src={item.data().photoUrl}
    //                             alt="icon avatar"
    //                         />
    //                         <div className="viewWrapContentItem">
    //                             <span className="textItem">{`Nickname: ${
    //                                 item.data().nickname
    //                                 }`}</span>
    //                             <span className="textItem">{`About me: ${
    //                                 item.data().aboutMe ? item.data().aboutMe : 'Not available'
    //                                 }`}</span>
    //                         </div>
    //                     </button>
    //                 )
    //             }
    //         })
    //         return viewListUser
    //     } else {
    //         return null
    //     }
    // }
    handlePearClick = async (currentPeerUser, index, self) => {
        debugger
        this.setState({ currentPeerUser: currentPeerUser, index: index, isNew: true })
        this.chatListRef = self

        // const chatUserResult = await firestore.collection(AppString.NODE_USERCHAT).doc(Authentication.loggedUser.uid).collection(Authentication.loggedUser.uid).doc(currentPeerUser.id).get()
        // if (chatUserResult.data().currentViewedPerson == currentPeerUser.id) {
        // }
        var senderChatStatus = {
            currentViewedPerson: currentPeerUser.id
        }
        var pearedChatStatus = {
            noOfUnReadMessage: 0,
            // currentViewedPerson: ""
        }

        firestore
            .collection(AppString.NODE_USERCHAT)
            .doc(Authentication.loggedUser.uid)
            .set(senderChatStatus)
            .then(() => {

            })
            .catch(err => {
                // this.props.showToast(0, err.toString())
            })
        firestore
            .collection(AppString.NODE_USERCHAT)
            .doc(Authentication.loggedUser.uid)
            .collection(Authentication.loggedUser.uid)
            .doc(currentPeerUser.id)
            .update(pearedChatStatus)
            .then(() => {

            })
            .catch(err => {
                self.props.showToast(0, err.toString())
            })
    }
    render() {
        return (
            <div className="root">
                {/* Body */}
                <div className="body">
                    {/* <div className="viewListUser" onScroll={this.handleScroll.bind(this)}> {this.renderListUser()}</div> */}
                    <ChatList handlePearClick={this.handlePearClick.bind(this)}></ChatList>
                    <div className="viewBoard">
                        {this.state.currentPeerUser ? (
                            <ChatBoard
                                index={this.state.index}
                                // updateList={this.updateList.bind(this)}
                                currentPeerUser={this.state.currentPeerUser}
                            // showToast={this.props.showToast}
                            />
                        ) : (
                                <WelcomeBoard
                                    currentUserNickname={this.currentUserNickname}
                                    currentUserAvatar={this.currentUserAvatar}
                                />
                            )}
                    </div>
                </div>

                {/* Dialog confirm */}
                {this.state.isOpenDialogConfirmLogout ? (
                    <div className="viewCoverScreen">
                        {this.renderDialogConfirmLogout()}
                    </div>
                ) : null}

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

    renderDialogConfirmLogout = () => {
        return (
            <div>
                <div className="viewWrapTextDialogConfirmLogout">
                    <span className="titleDialogConfirmLogout">Are you sure to logout?</span>
                </div>
                <div className="viewWrapButtonDialogConfirmLogout">
                    <button className="btnYes" onClick={this.doLogout}>
                        YES
                    </button>
                    <button className="btnNo" onClick={this.hideDialogConfirmLogout}>
                        CANCEL
                    </button>
                </div>
            </div>
        )
    }
}