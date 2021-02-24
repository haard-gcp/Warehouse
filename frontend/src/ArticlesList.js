import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import {Container, Table } from 'reactstrap';     // import component

// Article's List Page

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {articles: [], isLoading: true};       // define variable
  }

  // <!----- Section when page loading
  componentDidMount() {
    this.setState({isLoading: true});
    
    fetch('api/articles')       // send get articles request(api)
      .then(response => response.json())
      .then(data =>{
        this.setState({isLoading: false, articles: data.inventory});        // push response data to array
      });
  }
  // -----!>

  // <!-----Frontend start
  render() {
    const {articles, isLoading} = this.state;

    if (isLoading) {      // loading data
      return <p>Loading...</p>;
    }

    const articleList = articles.map(article => {      // making table body
      return <tr key={article.art_id}>
        <td>{article.name}</td>
        <td>{article.stock}</td>
        <td></td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <h3>Articles List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="20%">Stock</th>
                <th width="60%"></th>
              </tr>
            </thead>
            <tbody>
            {articleList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
  // Frontend end -----!>

}

export default Articles;