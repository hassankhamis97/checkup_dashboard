/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.js";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import ChatOperations from 'views/Chat/ChatOperations'
import Authentication from 'Authentication'
const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  // useEffect(callbackFunction, [dependentProps]) => cleanupFunction
const [noUnReadTotalMessages,setUnReadTotalMessages] = React.useState(0)
const [noOfNewUpcomingRequests,setNoOfNewUpcomingRequests] = React.useState(0)
  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  
  if(noUnReadTotalMessages == 0){
    var chatOperations = new ChatOperations()
    chatOperations.getUnReadTotalMessages((number)=>{setUnReadTotalMessages(number)})
  }
  if(noOfNewUpcomingRequests == 0){
    
    var authentication = new Authentication()
    authentication.getNoOfNewUpcomingRequests((number)=>{setNoOfNewUpcomingRequests(number)})
  }
  // function getTotalNoOfUnReadMessgages() {
  //   
   
  // }
  const { color, logo, image, logoText, routes } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        if (prop.path === "/upgrade-to-pro") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true
          });
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path)
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive
                    })}
                  />
                )}
              <ListItemText
                primary={props.rtlActive ? prop.rtlName : prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive
                })}
                disableTypography={true}
              />
              {prop.name == "Chat" && noUnReadTotalMessages > 0 ?
                < span class="notificationTotalChat">{noUnReadTotalMessages}</span> : ''
              }
              {prop.name == "Upcoming Request" && noOfNewUpcomingRequests > 0 ?
                < span class="notificationTotalChat">{noOfNewUpcomingRequests}</span> : ''
              }
            </ListItem>
          </NavLink>
  );
})}
    </List >
  );
var brand = (
  <div className={classes.logo}>
    <a
      href="#"
      className={classNames(classes.logoLink, {
        [classes.logoLinkRTL]: props.rtlActive
      })}
      target="_blank"
    >
      <div className={classes.logoImage}>
        <img src="https://firebasestorage.googleapis.com/v0/b/checkup-23ffe.appspot.com/o/Labs%2FlogoCheckupnew3.png?alt=media&token=4d93adb2-c777-4389-a4b4-b463d3d0a443" alt="logo" className={classes.img} />
      </div>
      {logoText}
    </a>
  </div>
);
return (
  <div>
    <Hidden mdUp implementation="css">
      <Drawer
        variant="temporary"
        anchor={props.rtlActive ? "left" : "right"}
        open={props.open}
        classes={{
          paper: classNames(classes.drawerPaper, {
            [classes.drawerPaperRTL]: props.rtlActive
          })
        }}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        {brand}
        <div className={classes.sidebarWrapper}>
          {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
          {links}
        </div>
        {image !== undefined ? (
          <div
            className={classes.background}
            style={{ backgroundImage: "url(" + image + ")" }}
          />
        ) : null}
      </Drawer>
    </Hidden>
    <Hidden smDown implementation="css">
      <Drawer
        anchor={props.rtlActive ? "right" : "left"}
        variant="permanent"
        open
        classes={{
          paper: classNames(classes.drawerPaper, {
            [classes.drawerPaperRTL]: props.rtlActive
          })
        }}
      >
        {brand}
        <div className={classes.sidebarWrapper}>{links}</div>
        {image !== undefined ? (
          <div
            className={classes.background}
            style={{ backgroundImage: "url(" + image + ")" }}
          />
        ) : null}
      </Drawer>
    </Hidden>
  </div>
);
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
