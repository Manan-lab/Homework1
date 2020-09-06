import React, { Component } from 'react';


class Product extends Component{


    render(){
        let {data} = this.props;
        return(
            <p>Description: {data}</p>
        );
    }
}

export default Product;