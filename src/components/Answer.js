import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class Answer extends PureComponent {
  render() {
    return <div
      key={`${this.props.questionKey}_${this.props.index}`}
    >
      <input
        type='checkbox'
        onChange={this.props.processAnswerClick.bind(this, this.props.questionKey, this.props.index)}/> {this.props.answer}
    </div>;
  }
}

Answer.propTypes = {
  questionKey: PropTypes.number,
  index: PropTypes.number,
  processAnswerClick: PropTypes.func,
  answer: PropTypes.string,
};

export default Answer;