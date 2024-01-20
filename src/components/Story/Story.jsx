import React, { useState, useEffect, memo } from 'react';
import { getStory } from '../../apis/HackerNewsApis';
import getSourceSiteName from '../../utils/getSourceSiteName';
import getUserLink from '../../utils/getUserLink';
import TimeAgo from 'react-timeago';
import { Item, Title, Author, Host, ExternalLink, Description, SecondaryLink, LinkButton } from '../../styles/story.styles';
import { Comment } from '../Comment/Comment';
import { trackPromise } from 'react-promise-tracker';
import Error from '../Error/Error';

export const Story = memo(function Story({ storyId, index }) {
    const [story, setStory] = useState({});
    const [showComments, setShowComments] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        trackPromise(
            getStory(storyId)
                .then(data => {
                    setStory(data);
                }).catch(err => {
                    setError(true);
                })
        );
    }, []);
    return error ? (<Error />) : story && story.url ? (
        <Item id={index}>
            <ExternalLink href={story.url} rel="nofollow noreferrer noopener" target="_blank">
                <Title>
                    {story.title} <Host>[{getSourceSiteName(story.url)}]</Host>
                </Title>
            </ExternalLink>

            <Description>
                {'by: '}<SecondaryLink href={getUserLink(story.by)} rel="nofollow noreferrer noopener" target="_blank">
                    <Author>{story.by}</Author>
                </SecondaryLink>{' | '}<TimeAgo date={new Date(story.time * 1000).toISOString()} />{' | '}
                {story.kids ? (
                    <LinkButton onClick={() => setShowComments(!showComments)}>{story.descendants}{' Comments'}</LinkButton>
                ) : <span>{'0 Comments'}</span>
                }
            </Description>

            {showComments && (
                <div>
                    {story.kids.map((kid, index) => (
                        <Comment key={kid} commentId={kid} index={index} />
                    ))}

                </div>
            )}
        </Item>
    ) : (null);
});
