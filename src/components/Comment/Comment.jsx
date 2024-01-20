import React, { useState, useEffect, memo } from 'react';
import { getStory } from '../../apis/HackerNewsApis';
import TimeAgo from 'react-timeago';
import { Author, SubItem, Description, SecondaryLink } from '../../styles/story.styles';
import getUserLink from '../../utils/getUserLink';
import { trackPromise } from 'react-promise-tracker';

export const Comment = (function Comment({ commentId, index, isSub }) {
    const [comment, setComment] = useState({});

    useEffect(() => {
        trackPromise(
            getStory(commentId)
                .then(data => {
                    setComment(data);
                })
        );

    }, []);

    return comment && comment.text ? (
        <SubItem id={`${commentId}_${index}`}>
            <Description>
                {'by: '}<SecondaryLink href={getUserLink(comment.by)} rel="nofollow noreferrer noopener" target="_blank">
                    <Author>{comment.by}</Author>
                </SecondaryLink>{' | '}<TimeAgo date={new Date(comment.time * 1000).toISOString()} />
            </Description>
            <div dangerouslySetInnerHTML={{ __html: comment.text }} />

            {!!comment.kids && (
                <div>
                    {comment.kids.map((kid, index) => (
                        <Comment key={kid} commentId={kid} index={index} isSub={true} />
                    ))}
                </div>
            )}
        </SubItem>
    ) : null;
});