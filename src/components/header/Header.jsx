import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AvVolumeOff from 'material-ui/svg-icons/av/volume-off';
import AvVolumeUp from 'material-ui/svg-icons/av/volume-up';

import { toggle_sound } from '../../redux/actions';

class Header extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { }
  }

  render() {
    var soundToggleButton = (
      <IconButton onClick={this._onSoundToggleButtonClick.bind(this)}>
        { (this.props.soundOn) ? <AvVolumeUp/> : <AvVolumeOff/> }
      </IconButton>
    );
    return (
      <AppBar title="Theory Drills" iconElementRight={soundToggleButton} />
    );
  }

  _onSoundToggleButtonClick() {
    toggle_sound(!this.props.soundOn)(this.context.store.dispatch);
  }
}

const mapStateToProps = (state) => {
  return {
    soundOn: state.soundOn
  };
};

Header.contextTypes = {
  store: React.PropTypes.object
};

export default connect(
  mapStateToProps
)(Header);
