import React from 'react';
import {Image, Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cartActions';


class BookItem extends React.Component {

  handleCart() {
    const book = [...this.props.cart, {
      _id: this.props._id,
      title: this.props.title,
      description: this.props.description,
      images: this.props.images,
      price: this.props.price,
      quantity: 1
    }];

    // check if cart is not empty
    if (this.props.cart.length > 0) {
      let _id = this.props._id;
      let cartIndex = this.props.cart.findIndex(function(cart) {
        // check if that id is already i the cart
        return cart._id === _id;
      })

        // if we return -1 then the cart doens't have that id yet
      if (cartIndex === -1) {
        // add the book
        this.props.addToCart(book);
      } else {
        // else the book is already in the cart
        // so we update quantity by calling updateCart function
        this.props.updateCart(_id, 1, this.props.cart);
      }

    } else {
      // cart is empty, add the bok
      this.props.addToCart(book);
    }
  }

  render() {
    return(
      <Well>
        <Row>
          <Col xs={12} sm={4}>
            <Image src={this.props.images} responsive/> 
          </Col>
          <Col>
            <h6>{this.props.title}</h6>
            <p>{this.props.description}</p>
            <h6>{this.props.price}</h6>
            <Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Add To Cart</Button>
          </Col>
        </Row>
      </Well>  
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addToCart: addToCart,
    updateCart: updateCart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);