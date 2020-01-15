import React from 'react';
import { Segment, Dropdown, Checkbox, Grid, Label } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

const ElementSelector = ({ childOptions, query, setQuery }) => {

    // De-structure query for use in UI
    const { child, parent, horizontally, vertically } = query;

    const [parentDisabled, setParentDisabled] = React.useState(true);
    const [parentLoading, setParentLoading] = React.useState(false);
    const [parentOptions, setParentOptions] = React.useState([]);

    React.useEffect(() => {
        const { child } = query;
        // If child is selected
        if(child) {
            getParentElements();
        }
    }, [child]);

    async function getParentElements() {
        const { child } = query;
        try {
            // Trigger loading spinner
            setParentLoading(true);
            const url = `${baseUrl}/api/parents`;
            const payload = { params: { child } };
            const response = await axios.get(url, payload);

            setParentOptions(response.data.map((parent => (
                {
                    key: parent.element,
                    value: parent.element,
                    text: parent.element
                }
            ))));
            // Turn off loading spinner
            setParentDisabled(false);
        } catch(error) {
            alert(error);
        } finally {
            setParentLoading(false);
        }
    }

    function handleDropdownUpdate (e, { name, value }) {
        setQuery(prevState => ({ ...prevState, [name]: value }));
    };
    function handleCheckboxUpdate (e, { name, checked }) {
        setQuery(prevState => ({ ...prevState, [name]: checked }));
    }

    return (
        <>
        <Segment.Group>
        <Segment >
        <div className="dropdown-container">
            <span className="selectorSpan">Center </span>
            <Dropdown
                className="elementDropdown"
                placeholder='Child Element'
                search
                selection
                name="child"
                options={childOptions}
                onChange={handleDropdownUpdate}
            />
            <span className="selectorSpan"> in </span>
            <Dropdown
                placeholder='Parent Element'
                search
                selection
                disabled={parentDisabled}
                loading={parentLoading}
                name="parent"
                options={parentOptions}
                onChange={handleDropdownUpdate}
            />
        </div>
        </Segment>
        <Segment textAlign="center" basic>
            {/* <Grid columns={2} stackable>
            <Grid.Column textAlign="center">  */}
            {/* TODO: Highlight check-boxes if both dropdowns are filled */}
            <Label>
            <Checkbox 
                label="Vertically"
                name="vertically"
                onChange={handleCheckboxUpdate}
            />
            </Label>
            {/* </Grid.Column> 
            <Grid.Column textAlign="center"> */}
            <Label >
            <Checkbox 
                label="Horizontally"
                name="horizontally"
                onChange={handleCheckboxUpdate}
            />
            </Label>
            {/* </Grid.Column>
            </Grid> */}
        </Segment>
            <style jsx>{`
                .selectorSpan {
                    display: inline-block;
                    font-size: 2rem;
                    line-height: 1;
                }

                .dropdown-container {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .dropdown-container > span {
                    margin: 0 1rem;
                }

                @media(max-width: 768px) {
                    .dropdown-container {
                        flex-direction: column;
                    }
                    .dropdown-container > span {
                        margin: 1rem 0;
                    }
                }

                .checkbox-container {
                    display: flex;
                    flex-direction: row; 
                    width: fit-content;
                    margin: 0 auto;
                }
                
            `}</style>
        </Segment.Group>
        </>
    );
}

export default ElementSelector;