import React, { Component } from 'react';
import Slider from 'material-ui/Slider';

require ('./delayselector.scss');

export class DelaySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: Math.min(Math.max(this.props.minDelay, this.props.defaultDelay), this.props.maxDelay)
    };
  }

  render() {
    var self = this;
    return (
      <div className={"delaySelector " + this.props.className}>
        {/* Optional Title */}
        { this.props.title && <p className="delaySelectorTitle">{this.props.title}</p> }
        {/* The slider */}
        <Slider style={{width: 250, display: 'inline-block'}}
                sliderStyle={{ display: 'inline-block', width: 250, marginTop: 0, marginBottom: 0 }}
                min={this.props.minDelay} max={this.props.maxDelay} value={this.state.delay} step={0.5}
                onChange={(e, newVal) => {
                  self.setState({ delay: newVal }, () => self.props.onChange(self.state.delay));
                }} />
        {/* The label showing the slider's value*/}                
        <span>{this.state.delay + 's'}</span>
      </div>
    );
  }
}

DelaySelector.propTypes = {
  className: React.PropTypes.string,
  defaultDelay: React.PropTypes.number,
  minDelay: React.PropTypes.number,
  maxDelay: React.PropTypes.number,
  onChange: React.PropTypes.func,
  title: React.PropTypes.string,
};

DelaySelector.defaultProps = {
  defaultDelay: 3.0,
  minDelay: 0.5,
  maxDelay: 10.0,
  onChange: (newVal) => { console.log("Delay value changed - " + newVal); }
};

export default DelaySelector;



