import React, { useState, useContext, useEffect } from 'react';
import { LocaleContext, ThemeContext } from './Context';

export default function App() {
    const name = useFormField('');
    const surname = useFormField('');
    const theme = useContext(ThemeContext);
    const locale = useContext(LocaleContext);
    const width = useWindowWidth();
    useDocumentTitle(`${name.value} ${surname}`);

    return (
      <div>
          <p>Hello {name.value} {surname.value}</p>
          <p>Locale: {locale}</p>
          <p>Window's width: {width}</p>
          <input type="text" {...name}/>
          <br/>
          <input type="text" {...surname}/>
      </div>
    );
}

const useFormField = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    return {
        value,
        onChange: handleValueChange,
    }
}

// custom hook
const useDocumentTitle = (title: string) => {
    useEffect(() => {
        document.title = title;
    });
}

// custom hook
const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleResize = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    });
    return width;
}
