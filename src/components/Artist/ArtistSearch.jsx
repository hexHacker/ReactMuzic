import React from 'react';

export const ArtistSearch = React.memo((props) => {
    const { doSubmit, setRandomTopArtist} = props;
    return (
        <form className="container input-group p-3" name="artistForm" action="" onSubmit={doSubmit}>
            <input className="form-control" type="text" name="artistname" placeholder="Enter an artist.." required="required" />
            <button className="btn btn-primary" type="submit">search</button>
            <a className="btn btn-secondary" onClick={setRandomTopArtist}>random!</a>
        </form>
    );
});