import React from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default class PhoneNumber extends React.Component {
    constructor()
    {
        debugger
    }
    render(){
        debugger;
        return(
            <GridContainer md={12} key={this.props.key}>
                    <GridItem xs={12} sm={12} md={9}>
                        <CustomInput
                            type="phone"
                            value={this.props.textValue}
                            // onChange={e => {
                            //     this.setState({
                            //         Employee: {
                            //             ...this.state.Employee,
                            //             userName: e.target.value
                            //         }
                            //     })
                            // }}
                            
                            labelText="Phone"
                            id="phone"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    
                    { this.props.count > 1?
                        
                            <GridItem style={{marginTop: "38px"}} xs={12} sm={12} md={3}>
                            <IconButton style={{color: "red"}} aria-label="upload picture" component="span">
                                <DeleteIcon />
                            </IconButton>
                            </GridItem> : ''
                        }
                    }
                    
                </GridContainer>
        );
    }
}
