import React, { memo } from 'react';
import { AppBar, Toolbar, Typography, Tab, Tabs, Fab, Switch, FormControlLabel, makeStyles } from '@material-ui/core';
import { BubbleChart as BubbleChartIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
    },
    toolbarLight: {
        backgroundColor: 'gray',
    },
    toolbarDark: {
        backgroundColor: 'black'
    },
    switch: {
        alignContent: 'right',
    }
}));

function AppHeader(props) {
    const { storyType, useDark, wordCloudDisplayed, onChangeStoryType, onShowWordCloud, onChangeTheme } = props;
    const styles = useStyles();

    return (
        <AppBar position="sticky">
            <Toolbar className={useDark ? styles.toolbarDark : styles.toolbarLight}>
                <Typography variant="h3" color="inherit">
                    {'Riiid | News'}
                </Typography>

                <Tabs
                    value={storyType}
                    indicatorColor="secondary"
                    textColor="inherit"
                    onChange={onChangeStoryType}
                    aria-label="riiid news tabbar"
                >
                    <Tab label="New" className={styles.button} />
                    <Tab label="Top" />
                    <Tab label="Best" />
                    <Tab label="Jobs" />
                </Tabs>
                {'|'}
                <Fab color={wordCloudDisplayed ? "secondary" : "default"} variant="extended" className={styles.button} onClick={onShowWordCloud}>
                    <BubbleChartIcon />
                    Word Map
                </Fab>
                {'|'}
                <FormControlLabel
                    className={styles.switch}
                    control={<Switch checked={useDark} onChange={onChangeTheme} />}
                    label='Switch Theme'
                    labelPlacement='start'
                />
            </Toolbar>
        </AppBar>
    );
}

export default (memo(AppHeader));


