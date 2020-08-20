import React from 'react';

function JobSettings(props) {
    if (props.allowOverlap) {
        var overlapString = 'Allow overlapping runs';
    } else if (props.queueing) {
        overlapString = 'Queue overlapping runs';
    } else {
        overlapString = 'Cancel overlapping runs';
    }

    return (
        <ul class='list-group'>
          <li class='list-group-item'>{overlapString}</li>
          {props.allNodes && <li class='list-group-item'>Runs on all nodes</li>}
        </ul>
    );
}

export default JobSettings;
