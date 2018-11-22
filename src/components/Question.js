import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'
import Answer from "./Answer";

class Question extends PureComponent {
  render() {
    return (
      <div>
        <div>{this.props.question.question}</div>
        <hr/>
        {this.props.question.answers.map((answer, index) => (
          <Answer
            key={index}
            questionKey={this.props.question.key}
            index={index}
            processAnswerClick={this.props.processAnswerClick}
            answer={answer.value}
          />
        ))}
        <div>
          <button onClick={this.props.onNextClick}>Next</button>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    key: PropTypes.number,
    question: PropTypes.string,
    answers: PropTypes.array
  }),
  onNextClick: PropTypes.func,
  processAnswerClick: PropTypes.func,
};

export default Question;