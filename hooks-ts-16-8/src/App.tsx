import React, { useState } from 'react';

export default function App() {
    const [name, setState] = useState('');
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
    };
    return (
      <div>
          <p>Hello {name}</p>
          <input type="text" value={name} onChange={handleNameChange}/>
      </div>
    );
}
