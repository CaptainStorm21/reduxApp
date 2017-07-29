import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions'
import {Grid, Row, Button} from 'react-bootstrap';

class BooksList extends React.Component {
  componentDidMount(){
    //dispatch an action
    this.props.getBooks();
  }
  render() {
    const BooksList = this.props.books.map(function(booksArr){
      return(
        <div key={booksArr.id}>
          <h2>{booksArr.title}</h2>
          <h2>{booksArr.description}</h2>
          <h2>{booksArr.price}</h2>
          <Button bsStyle='primary' style={{marginLeft:'10px'}}>Add to Cart</Button>
        </div>
      )
    })
    return(
      <div>
        <h1 style={{margin:'10px', fontStyle: 'italic', fontWeight:'700', textDecoration:'underline'}}>Get Your Books!</h1>
      
        <Grid>
          <Row style={{marginTop:'15px', marginLeft:'20px'}}>
            {BooksList}
          </Row>
        </Grid>  
      </div> 
    )
  }
}

function mapStateToProps(state) {
  return{
    books: state.books.books
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getBooks:getBooks
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
