import React, { useState, useEffect } from 'react';

const useCounter = (initialState) => {
    const [ count, setCount ] = useState(initialState);
    const increment = () => setCount(count + 1);
    return {count, increment};
};

const Counter = () => {
    const {count, increment} = useCounter(0);
    return <button onClick={increment}>{count}</button>
};


export default Counter;