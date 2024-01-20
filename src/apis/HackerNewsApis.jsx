import axios from 'axios';

export const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
export const storyUrl = `${baseUrl}item/`;


export const getStoryIds = async (type = 'new') => {
    const url = baseUrl + type + 'stories.json';
    const result = await axios.get(url);
    return result.data;
};

export const getStory = async (storyId) => {
    const result = await axios.get(`${storyUrl + storyId}.json`);
    return result.data;
};

