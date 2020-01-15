import React from 'react';
import { Tab, Segment, Header, Icon, Grid, Label} from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

const ResultCode = ({ query }) => {
    const [loading, setLoading] = React.useState(false);
    const [resultAvailable, setResultAvailable] = React.useState();
    const [panes, setPanes] = React.useState([]);

    React.useEffect(() => {
        // If both child and parent are set, and either horizontal or vertical is selected query for results
        if(query.child && query.parent && (query.horizontally || query.vertically)) {
            queryForResult();
        }
    }, [query]);
    
    /*
    let panes = [
        {
            menuItem: 'Method 1',
            render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>,
        }
    ]
    */

    async function queryForResult() {
        try {
            setLoading(true);
            const { child, parent, horizontally, vertically } = query;
            const url =  `${baseUrl}/api/result`;
            const payload = { params: { child, parent, horizontally, vertically } };
            const response = await axios.get(url, payload);
            console.log(response.data);
            console.log(typeof response.data);
            
            // Make tab panes
            const tabPanes = response.data.map((child, index) => {
                console.log("Method " + (index + 1));
                console.log(child.html);
                console.log(child.css);
                return (
                    {
                        menuItem: 'Method ' + (index + 1),
                        render: () => (
                            <Tab.Pane attached={false}>
                                <Grid columns={2}>
                                    <Grid.Column>
                                        <Segment size="small" inverted>
                                            <Label size="tiny" color="black" attached='top'>HTML</Label>
                                            <div>
                                                <code>{ child.html }</code>
                                            </div>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment size="small" inverted>
                                            <Label size="tiny" color="black" attached='top'>CSS</Label>
                                            <pre><code>{ child.css }</code></pre>
                                        </Segment>
                                    </Grid.Column>
                                </Grid>
                            </Tab.Pane>
                        )
                    }
                );
            });
            console.log("Panes!", tabPanes);
            setPanes(tabPanes);

            // setResultAvailable to true
            setResultAvailable(true);
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return ( <>
        {/* If results are available, show tab pane, otherwise show placeholder segment */}
        { resultAvailable 
            ? <>
            <Tab menu={{ secondary: true }} panes={panes}/> 
            <span>Something wrong? Please <a href=''>contact me</a> and let me know.</span>
            
            </> : 
            <Segment loading={loading} textAlign="center" secondary placeholder>
                <Header icon>
                <Icon name='code' />
                Select elements to display code.
                </Header>
            </Segment>
        }

        <style jsx>{`
        
        
        `}</style>
        
    </>);
}

export default ResultCode;