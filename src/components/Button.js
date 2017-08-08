import React from 'react';
import PropTypes from 'prop-types';

export class Button extends React.Component {
  render() {
    return (
      <button>
        {this.props.title}
      </button>
    );
  }
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
};

