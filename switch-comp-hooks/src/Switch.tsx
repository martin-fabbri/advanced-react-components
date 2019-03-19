import React from 'react';
import './Switch.css'

const noop = () => {};

interface IProps {
  on: boolean;
  onClick: () => void;
  className?: string;
}

export default function Switch(props: IProps) {
  const {on, className, onClick} = props;
  console.log('Switch on', on);

  const btnClassName = [
    className,
    'toggle-btn',
    on ? 'toggle-btn-on' : 'toggle-btn-off',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label style={{display: 'block'}}>
      <input
        className="toggle-input"
        type="checkbox"
        defaultChecked={on}
        onChange={noop}
        onClick={onClick}
        data-testid="toggle-input"
      />
      <span className={btnClassName}/>
    </label>
  );
}
