import React from 'react';
import './ContentBlock.scss';

export const Success = (props) => {
        return <div className="content-wrapper success-event">
            <div className="block-name success">Success</div>
            <div className="block-name success small">Event has been created</div>
        </div>;
}
