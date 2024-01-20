import React from 'react';
import { ErrorContainer } from '../../styles/comps.styles';

export default function Error() {

    return (
        <ErrorContainer >
            <span style={{ width: '100%', textAlign: 'center' }}>
                Network Error: Please refresh the page and try again.
            </span>
        </ErrorContainer>
    )
}