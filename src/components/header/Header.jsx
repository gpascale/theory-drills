import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import AvVolumeOff from 'material-ui/svg-icons/av/volume-off';
import AvVolumeUp from 'material-ui/svg-icons/av/volume-up';

import { toggle_sound } from '../../redux/actions';

class Header extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      sidebarVisible: false
    }
  }

  render() {
    var foo = "bar";
    var soundToggleButton = (
      <IconButton onClick={this._onSoundToggleButtonClick.bind(this)}>
        { (this.props.soundOn) ? <AvVolumeUp/> : <AvVolumeOff/> }
      </IconButton>
    );
    return (
      <AppBar title="Theory Drills" iconElementRight={soundToggleButton}
              onLeftIconButtonTouchTap={() => this.setState({ sidebarVisible: true })} >
        <Popover ref="sidebar" className="sidebar"
                 open={this.state.sidebarVisible}
                 anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                 targetOrigin={{horizontal: 'left', vertical: 'top'}}
                 onRequestClose={() => this.setState({ sidebarVisible: false })}>
          <AppBar />
          <div className="sidebarContent">
            <div className="sidebarCategory">New Quiz</div>
            <div className="sidebarLink"><Link to="/degrees">Degrees Quiz</Link></div>
            <div className="sidebarLink"><Link to="/chords">Chords Quiz</Link></div>
          </div>
        </Popover>
      </AppBar>
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

Header.propTypes = {
  sidebarVisible: React.PropTypes.bool
};

export default connect(
  mapStateToProps
)(Header);
