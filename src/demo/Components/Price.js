import React, { Component } from 'react';


class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: props.data,
            rate : 478
        }
    }

    changeCurrency = () => {
        let {price,rate} = this.state;
        let sign = price [price.length-1];
        if (sign === "$"){
           price = parseFloat(price)* rate + "֏"
        }else if (sign === "֏"){
            price = parseFloat(price) / rate + "$"
        }
        this.setState({
            price:price
        })
    }

    render() {
        let { price } = this.state;
        return (
            <p>
                Price: {price}
                <button
                onClick = {this.changeCurrency}
                >
                    AMD/USD
                </button>
            </p>

        );
    }
}

export default Product;