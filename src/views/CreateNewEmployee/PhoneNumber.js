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
        super()
        
    }
    deletePhone = () =>{
        this.props.deletePhone(this.props.index)
    }
    changeText = e => {
        debugger
        // this.setState({
        //     Employee: {
        //         ...this.state.Employee,
        //         userName: e.target.value
        //     }
        // })
        this.props.changeText(this.props.index,e.target.value)
    }
    render(){
        debugger;
        var count = this.props.index+1 
        return(
            // <span>sdsd</span>
            <GridContainer md={12} key={this.props.key}>
                    <GridItem xs={12} sm={12} md={9}>
                        <CustomInput
                            type="phone"
                            value={this.props.textValue}
                            onChange={this.changeText.bind(this)}
                            
                            labelText={"Phone " + count}
                            id="phone"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    
                    { this.props.count > 1?
                        
                            <GridItem style={{marginTop: "38px"}} xs={12} sm={12} md={3}>
                            <IconButton style={{color: "red"}} onClick={this.deletePhone} aria-label="upload picture" component="span">
                                <DeleteIcon />
                            </IconButton>
                            </GridItem> : ''
                        }
                    
                    
                </GridContainer>
        );
    }
}
