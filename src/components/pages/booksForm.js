"use strict"

import React from 'react';
import {Well, Panel, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';

import {postNewBooks} from '../../actions/booksActions';

class BooksForm extends React.Component {

  handleSubmit(){
    const book = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      price: findDOMNode(this.refs.price).value
    }]
    this.props.postNewBooks(book);  
  };

  render(){
    return(
      <Well>
        <Panel>
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl
                type="text"
                placeholder="Enter Title"
                ref="title" />
          </FormGroup>
          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl
                type="text"
                placeholder="Enter Description"
                ref="description" />
          </FormGroup>
          <FormGroup controlId="price">
            <ControlLabel>Price</ControlLabel>
            <FormControl
                type="text"
                placeholder="Enter Price"
                ref="price" />
          </FormGroup>
          <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary" style={{float:'right'}}>Submit Book</Button>
        </Panel>
      </Well>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({postNewBooks}, dispatch)
}

export default connect(null, mapDispatchToProps)(BooksForm);