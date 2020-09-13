import React, { Component } from 'react';

class Input extends Component {

    state = {
        inputValue: '',
        showValue: '',
        showText: true
    }


    handleInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })

    };


    handleButtonClick = () => {
        let { inputValue } = this.state;
        this.setState({
            inputValue: '',
            showValue: inputValue
        });

    }

    
    hideText = () =>{
        this.setState({
            showText:!this.state.showText
        });
    }
    
    render() {

        let {showText} = this.state;

        return (
            <div>
                <input
                    type="text"
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleButtonClick}>Add</button>
                <p>{this.state.showValue}</p>

                <button onClick={this.hideText}>
                    {
                        showText ? 'Hide' : 'Show'
                    }
                </button>
                {
                    showText ?
                        <p> Hello, Im a simple component</p>
                        :
                        null     
                }

            </div>
        );
    }

}


export default Input;

{// class Name extends Component{

    //     render(){
    //         let {data} = this.props;

    //         return (
    //         <p> Name: {data}</p>
    //         )
    //     }
    // }

    // export default Name;
}