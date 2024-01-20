import React from 'react';
import { Story } from '../components/Story/Story';
import { ListWrapper } from '../styles/view.styles';

function StaticStoryContainer(props) {
    const { storyIds } = props;

    return (
        <ListWrapper id="STATIC_STORY_CONTAINER">
            {storyIds.map((storyId, index) => (
                <Story key={storyId} storyId={storyId} index={index} />
            ))}
        </ListWrapper>


    );
};

export default StaticStoryContainer;
