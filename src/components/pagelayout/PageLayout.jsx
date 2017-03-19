import React, { Component } from 'react';
import Header from '../header/Header';

class PageLayout extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default PageLayout;
