import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class PageLayout extends Component {
  render() {
    return (
      <div className="container">
        <AppBar title="Theory Drills"/>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default PageLayout;
