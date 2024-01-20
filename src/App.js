import React, { useState, useEffect, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import StoryContainer from './views/StoryContainer';
import AppHeader from './components/AppHeader/AppHeader';
import { trackPromise } from 'react-promise-tracker';
import { getStoryIds } from './apis/HackerNewsApis';
import Error from './components/Error/Error';
import useLocalStorage from './hooks/useLocalStorage';

import { Link, Route, BrowserRouter } from 'react-router-dom';
import WordCloud from './views/WordCloud';
import { WordCloudContainer } from './styles/comps.styles';
import { STORY_TYPES, STORY_TYPE_KEY, CURR_STORIES_VIEWED_KEY, CURRENT_THEME_KEY, PAGE_SIZE } from './constants';



function App(classes) {
  const [storyType, setStoryType] = useLocalStorage(STORY_TYPE_KEY, STORY_TYPES[0]);
  const [wordCloudDisplayed, setWordCloudDisplayed] = useState(false);
  const [useDark, setUseDark] = useLocalStorage(CURRENT_THEME_KEY, false);
  const [storyIds, setStoryIds] = useState({ count: 0, ids: [] });
  const [error, setError] = useState(false);

  function updateStoryType(event, type) {
    setStoryType(STORY_TYPES[type]);
  }

  // Side effect when theme is switched
  useEffect(() => {
    if (!useDark) {
      document.body.style = `background-color: ${lightTheme.background};`;
    } else {
      document.body.style = `background-color: ${darkTheme.background};`;
    }
  }, [useDark]);

  // Side effect for change in story types
  useEffect(() => {
    localStorage.removeItem(CURR_STORIES_VIEWED_KEY);

    trackPromise(
      getStoryIds(storyType)
        .then(data => setStoryIds({ count: data.length, ids: data }))
        .catch(err => {
          setError(true);
        })
    );
  }, [storyType]);


  return error ? <Error /> : (
    <ThemeProvider theme={useDark ? darkTheme : lightTheme}>
      <Fragment>
        <AppHeader
          storyType={STORY_TYPES.indexOf(storyType)}
          useDark={useDark}
          wordCloudDisplayed={wordCloudDisplayed}
          onChangeStoryType={updateStoryType}
          onShowWordCloud={() => setWordCloudDisplayed(!wordCloudDisplayed)}
          onChangeTheme={() => setUseDark(!useDark)}
        />

        {wordCloudDisplayed ? storyIds.ids.length > 0 && (
          <WordCloudContainer>
            <WordCloud storyIds={storyIds} height={600} />
          </WordCloudContainer>
        ) : (
            <StoryContainer storyIds={storyIds} />
          )}
      </Fragment>
    </ThemeProvider >
  );
};

export default App;