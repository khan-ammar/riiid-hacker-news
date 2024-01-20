import React, { useEffect, useState } from 'react';
import { Story } from '../components/Story/Story';
import { ListWrapper } from '../styles/view.styles';
import { Tabs, Tab, Box, makeStyles } from '@material-ui/core';
import StaticStoryContainer from './StaticStoryContainer';
import { PAGE_SIZE, MAX_STORIES, CURR_STORIES_VIEWED_KEY, PREV_STORIES_VIEWED_KEY, SCROLL_Y_KEY } from '../constants';
import _ from 'lodash';
import isElementVisible from '../utils/isElementVisible';
import useLocalStorage from '../hooks/useLocalStorage';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        margin: 'auto',
        display: 'flex',
        marginTop: '120px',
        width: '1400px',
        justifyContent: 'center',
        minHeight: '500px',
    },
    tabs: {
        position: 'fixed',
        marginTop: '30px',
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

function StoryContainer(props) {
    const { storyIds } = props;
    //const { count } = useInfiniteScroll();
    const [error, setError] = useState(false);
    const [value, setValue] = useState(0);
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(25);
    const [storiesScrolled, setStoriesScrolled] = useLocalStorage(CURR_STORIES_VIEWED_KEY, PAGE_SIZE);
    const [prevStoriesScrolled, setPrevStoriesScrolled] = useLocalStorage(PREV_STORIES_VIEWED_KEY, PAGE_SIZE);
    const [lastScrollY, setLastScrollY] = useLocalStorage(SCROLL_Y_KEY, 0);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        setValue(0);
    }, []);

    function findLastVisible(elements) {
        if (!elements) {
            return null;
        }

        var switchEngaged = false;
        for (let i = 0; i < elements.length; i++) {
            let status = isElementVisible(elements[i]);

            if (!switchEngaged && status) {
                switchEngaged = true;
            } else if (switchEngaged && !status) {
                return elements[i > 0 ? i - 1 : 0];
            }
        }
        return elements[0];
    }


    const handleScroll = _.debounce(() => {
        const lastVisible = findLastVisible(document.querySelectorAll('#INFINITE_SCROLL_LIST li'));

        // Save in localStorage
        if (!!lastVisible) {
            setStoriesScrolled(lastVisible.id);
            setLastScrollY(window.scrollY);
        }

        if (window.innerHeight + document.documentElement.scrollTop <
            document.documentElement.offsetHeight - 200 ||
            loading
        ) {
            return false;
        }
        setLoading(true);
    }, 500);

    useEffect(() => {
        if (!loading) return;

        if (count + PAGE_SIZE >= MAX_STORIES) {
            setCount(MAX_STORIES);
        } else {
            setCount(count + PAGE_SIZE);
        }
        setLoading(false);
    }, [loading]);

    return (
        <>
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Current" {...a11yProps(0)} onClick={() => window.addEventListener('scroll', handleScroll)} />
                {!!prevStoriesScrolled && prevStoriesScrolled > 0 && (
                    <Tab label="Previous" {...a11yProps(1)} onClick={() => window.removeEventListener('scroll', handleScroll)} />)}

            </Tabs>
            <TabPanel value={value} index={0}>
                <ListWrapper id="INFINITE_SCROLL_LIST">
                    {storyIds.ids.slice(0, count).map((storyId, index) => (
                        <Story key={storyId} storyId={storyId} index={index} />
                    ))}
                </ListWrapper>

            </TabPanel>
            {!!prevStoriesScrolled && prevStoriesScrolled > 0 && (
                <TabPanel value={value} index={1}>
                    <StaticStoryContainer storyIds={storyIds.ids.slice(0, prevStoriesScrolled)} />
                </TabPanel>
            )}
        </>
    );
};

export default StoryContainer;
