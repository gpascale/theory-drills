import React, { Component } from 'react';
import _ from 'underscore';
import Checkbox from 'material-ui/Checkbox';

const checkboxStyle = {
  maxWidth: 80,
  display: 'inline-block',
};
const iconStyle = {
  marginRight: 4
};

class CheckboxGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: _.object(this.props.items.map(item => [ item, true ]))
    }
  }

  render() {
    var self = this;
    return (
      <div className="checkboxGroup">
        <a href="" onClick={checkOrUncheckAllHandler(true)}>Check All</a>
        |
        <a href="" onClick={checkOrUncheckAllHandler(false)}>Uncheck All</a>
        <ul>
          {this.props.items.map((item, i) => {
            return <Checkbox key={i} label={item}
                             style={checkboxStyle} iconStyle={iconStyle}
                             checked={self.state.checked[item]}
                             onCheck={(e, isChecked) => {
                               var checked = _.clone(self.state.checked);
                               checked[item] = isChecked;
                               self.setState({ checked: checked }, () => {
                                 self.props.onChange(self.getCheckedSet());
                               });
                             }}
                  />;
          })}
        </ul>
      </div>
    );

    function checkOrUncheckAllHandler(checkTrueOrUncheckFalse) {
      return function(e) {
        var checked = _.object(Object.entries(self.state.checked).map((entry) => [entry[0], checkTrueOrUncheckFalse]));
        self.setState({ checked: checked }, () => {
          self.props.onChange(self.getCheckedSet());
        });
        e.preventDefault();
        return false;
      }
    }
  }

  getCheckedSet() {
    return _.filter(_.keys(this.state.checked), (key) => this.state.checked[key]);
  }
}

CheckboxGroup.defaultProps = {
  items: [ ],
  itemsPerRow: 3,
  onChange: (checkedSet) => { console.log("CheckboxGroup changed - " + JSON.stringify(checkedSet)) }
}

CheckboxGroup.propTypes = {
  items: React.PropTypes.array,
  itemsPerRow: React.PropTypes.number,
  onChange: React.PropTypes.func
}

export default CheckboxGroup;