import React from 'react';
import './Switch.css'

const noop = () => {};

interface IProps {
  on: boolean;
  className: string;
  onClick: () => void;
}

export default function Switch(props: IProps) {
  const {on, className, onClick} = props;
  const btnClassName = [
    className,
    'toggle-btn',
    on ? 'toggle-btn-on' : 'toggle-btn-off',
  ].filter(Boolean).join(' ');

  return (
    <label style={{display: 'block'}}></label>
  );
}
