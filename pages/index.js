import React from 'react';
import ElementSelector from '../components/Index/ElementSelector';
import ResultCode from '../components/Index/ResultCode';
import Logo from '../components/Index/Logo';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';

const Index = ({ childOptions }) => {
    const INITIAL_QUERY = {
        child: '',
        parent: '',
        horizontally: false,
        vertically: false
    }
    const [query, setQuery] = React.useState(INITIAL_QUERY);

    return(   
        <>
            <Logo />
            <ElementSelector childOptions={childOptions} query={query} setQuery={setQuery} />
            <ResultCode query={query}/>
        </>
    );
};

// Get children from database to populate child selector
Index.getInitialProps = async () => {
    const url = `${baseUrl}/api/children`;
    const response = await axios.get(url);
    // Map this into a thing that can be sent into the element selector
    const childOptions = response.data.map((child => {
        return (
            {
                key: child.childElement, 
                value: child.childElement, 
                text: child.childElement    
            }
        )
    }));

    return {childOptions};
}  

export default Index;
  