import React, { Component } from 'react';


class Product extends Component{


    render(){
        let {data} = this.props;
        return(
            <p>Name: {data}</p>
        );
    }
}

export default Product;