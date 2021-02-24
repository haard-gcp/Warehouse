import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';     // import component
import AppNavbar from './AppNavbar';

// Product's List Page

class Products extends Component {

  constructor(props) {
    super(props);
    this.state = {product: [], productdata: [], articles: [], isLoading: true};       // define variable
  }

  // <!----- Section when page loading
  componentDidMount() {
    this.setState({ isLoading: true});
    let num = 0;

    fetch('api/articles')       // send get articles request(api)
      .then(response => response.json())
      .then(data =>{
        this.setState({articles: data.inventory});        // push response data to array
      });

    fetch('api/getproducts')       // send get products request(api)
      .then(response => response.json())
      .then(data =>{
        const productsarray = data.products;
        productsarray.map((item) =>{
          num = num+1;
          item.id = num;
        })
        this.setState({ isLoading: false, product: productsarray, productdata: data.products})        // push response data to array
      });
  }
  // -----!>

  // <!----- Remove function
  remove(name) {
    fetch(`/api/updateproducts/${name}`, {       // send delete products request(api)
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      }).then(() => {
        window.location.reload();
    });
  }
  // -----!>

  // <!-----Frontend start
  render() {
    const {product, isLoading} = this.state;

    if (isLoading) {      // loading data
      return <p>Loading...</p>;
    }

    product.map((item)=>{     // making useful array
      let contains = "";
      item.contain_articles.map((containitem)=>{
        this.state.articles.map((articleitem)=>{
          if(containitem.art_id == articleitem.art_id)
          {
            containitem.name = articleitem.name;
          }
        })
        contains = contains + containitem.name + " : " + containitem.amount_of + ", ";
      })
      item.contains = contains;   // changing containg articles user friendly
    })
    console.log("product",product)
    const productList = product.map((productitem) => {      // table body

      return <tr key={productitem.id}>
        <td style={{whiteSpace: 'nowrap'}}>{productitem.name}</td>
        <td style={{whiteSpace: 'nowrap'}}>{productitem.number}</td>
        <td style={{whiteSpace: 'nowrap'}}>{productitem.contains}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="danger" onClick={() => this.remove(productitem.name)}>Delete</Button>
          </ButtonGroup>
        </td>
        <td></td>
      </tr>

    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <h3>Products List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="10%">number</th>
                <th width="20%">Contain Articles</th>
                <th width="10%">Actions</th>
                <th width="40%"></th>
              </tr>
            </thead>
            <tbody>
            {productList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
  // Frontend end -----!>

}

export default Products;