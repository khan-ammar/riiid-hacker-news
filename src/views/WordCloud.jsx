import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import addWordCloudModule from 'highcharts/modules/wordcloud';
import { trackPromise } from 'react-promise-tracker';
import removeStopWords from '../utils/removeStopWords';
import Error from '../components/Error/Error';
import { getStory } from '../apis/HackerNewsApis';
import useLocalStorage from '../hooks/useLocalStorage';
import { CURR_STORIES_VIEWED_KEY, PAGE_SIZE } from '../constants';
//import { TextField, Button } from '@material-ui/core';

addWordCloudModule(Highcharts);


export default function WordCloud(props) {
    const { storyIds, height } = props;
    const [error, setError] = useState(false);
    const [wordsMap, setWordsMap] = useState([]);
    const [storiesViewed, setStoriesViewed] = useLocalStorage(CURR_STORIES_VIEWED_KEY, PAGE_SIZE);
    var AllTheWords = [];

    const options = {
        chart: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            height: height,
        },
        series: [{
            colors: ['rgba(188, 18, 33, 1.0)'],
            rotation: {
                from: 0,
                to: 0,
                orientations: 1
            },
            type: 'wordcloud',
            data: wordsMap,
            allowPointSelect: true,
            cursor: 'pointer',
        }],
        credits: {
            enabled: false,
        },
        title: {
            text: 'Word Cloud of Story Titles'
        },
        tooltip: {
            enabled: true,
            pointFormat: '<span style="color:{point.color}"></span><b>x {point.weight}</b><br/>',

        },
        subtitle: {
            text: 'Click on a word to remove it.'
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: onClick,
                    }
                }
            }
        }
    };

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const resp = await getStory(id);
                AllTheWords.push(...removeStopWords(resp.title));
            } catch (err) {
                setError(true);
            } finally {
                setWordsMap(createWordCountMap(AllTheWords));
            }
        }

        storyIds.ids.slice(0, storiesViewed).forEach(story => {
            trackPromise(fetchData(story));
        })
    }, []);

    function onClick(event) {
        setWordsMap(wordsMap.filter(item => item.name !== event.target.textContent));
    }

    function createWordCountMap(words) {
        let wordMap = new Map();

        words.forEach(word => {
            return wordMap.has(word) ? wordMap.set(word, wordMap.get(word) + 1) : wordMap.set(word, 1);
        })

        var normalized = []
        wordMap.forEach((val, key) => normalized.push({ name: key, weight: val }))

        return normalized;
    }


    return !!wordsMap ? (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    ) : <Error />;








}









