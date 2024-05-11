import * as React from 'react';

const ICON = `M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-14h-2v2h2zm0 4h-2v6h2zm-4 2H7v2h2zm6 0h-2v2h2zm0 4h-2v2h2zm-4 0H7v-2h2zm0-4H7v-2h2zm4 0h-2v-2h2z`;

const pinStyle = {
    cursor: 'pointer',
    fill: 'blue',
    stroke: 'none'
};

function Pin({ size = 15 }) {
    return (
        <svg height={size} viewBox="0 0 24 24" style={pinStyle}>
            <path d={ICON} />
        </svg>
    );
}

export default React.memo(Pin);