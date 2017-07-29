"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label, Modal} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteFromCart, updateCart} from '../../actions/cartActions'

class Cart extends React.Component{

  onDelete(_id) {
    const currentBookToDelete = this.props.cart;
    // Determine which index in cart array to delete
    const indexToDelete = currentBookToDelete.findIndex(
      function(cart) {
        return cart._id === _id;
      }
    )

    let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete),
    ...currentBookToDelete.slice(indexToDelete + 1)];

    this.props.deleteFromCart(cartAfterDelete);
  }

  onDecrement(_id, quantity) {
    if(quantity > 1) {
      this.props.updateCart(_id, -1);
    } else {
      return;
    }
  }

  onIncrement(_id) {
    this.props.updateCart(_id, 1);
  }

  constructor() {
    super();
    this.state = {
      showModal: false
    }
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  render() {
    if(this.props.cart[0]) {
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }

  }

  renderEmpty() {
    return(<div></div>)
  }

  renderCart() {
    const cartItemsList = this.props.cart.map(function(cartArr) {
      return(
        <Panel key={cartArr._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{cartArr.title}</h6><span>    </span>
            </Col>
            <Col xs={12} sm={2}>
              <h6>$ {cartArr.price}</h6><span>    </span>
            </Col>
            <Col xs={12} sm={2}>
              <h6>qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6><span>    </span>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonGroup style={{minWidth: '300px'}}>
                <Button onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)} bsStyle="default" bsSize="small">-</Button>
                <Button onClick={this.onIncrement.bind(this, cartArr._id)} bsStyle="default" bsSize="small">+</Button>
                <span>     </span>
                <Button onClick={this.onDelete.bind(this, cartArr._id)} bsStyle="danger" bsSize="small">Delete</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      )
    }, this)
    return (
      <Panel header="Cart" bsStyle="primary">
        {cartItemsList}
        <Row>
          <Col xs={12}>
            <h6>Total amount:</h6>
            <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
              PROCEED TO CHECKOUT
            </Button>
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>CHECKOUT</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h6>Current Items: </h6>
              </Modal.Body>
              <Modal.Footer>
                <Row>
                  <Col xs={6}>
                    Total: $
                  </Col>
                  <Button onClick={this.close.bind(this)}>
                    Close
                  </Button>
                  <Button bsStyle="success" style={{marginRight:'14px'}}>
                    BUY
                  </Button>
                </Row>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return{
    cart: state.cart.cart,
    totalAmount: state.cart.cart.totalAmount
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    deleteFromCart: deleteFromCart,
    updateCart: updateCart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);