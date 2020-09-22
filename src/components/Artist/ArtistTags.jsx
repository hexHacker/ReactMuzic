
import React from 'react';

export const ArtistTags = React.memo((props) => {
    const { artistInfo, onTagTopArtistsClick, onArtistsTagsClick } = props;
    const tagClick = function (event) {
        onTagTopArtistsClick(event);
        onArtistsTagsClick(event);
    };
    return (
        <div className="artistTags tags py-2">
            <p>Tags for <span className="lead text-capitalize">{artistInfo && artistInfo.name.toLowerCase()}</span></p>
            {artistInfo && artistInfo.tags.tag.length !== 0
                ? artistInfo.tags.tag.map((t, index) =>
                    <label key={index} onClick={tagClick} className='badge badge-pill badge-primary m-1 p-2'>
                        {t.name}
                    </label>)
                : <label className='badge badge-pill badge-secondary m-1 p-2'>No Tags</label>}
        </div>);
});