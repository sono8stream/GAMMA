import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({ value,sent, increment, decrement,sendValue }) => (
    <div>
        {value}
        <button onClick={() => increment(value)}>+</button>
        <button onClick={() => decrement(value)}>-</button>
        <button onClick={() => sendValue(value)}>send!</button>
        {sent?'sent!':'unsent'}
    </div>
);

Counter.propTypes = {
    value: PropTypes.number.isRequired,
    sent: PropTypes.bool.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    sendValue: PropTypes.func.isRequired,
};

export default Counter;