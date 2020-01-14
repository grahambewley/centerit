import Head from 'next/head';
import { Container } from 'semantic-ui-react';
import Header from './Header';
import HeadContent from './HeadContent';

function Layout({ children }) {
 
    return (
        <>
            <Head>
                <HeadContent />
                <link
                    rel="stylesheet"
                    href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
                />
                <title>Center It</title>
                
            </Head>
            {/*
            <Header />
            */}
            <Container>
                { children }
            </Container>
        </>
    )
}

export default Layout;