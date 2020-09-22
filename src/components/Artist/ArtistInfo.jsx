import React from "react";
import { Image3D } from "../Image3D/Image3D";
import { TopTracks } from "./TopTracks";

export const ArtistInfo = React.memo((props) => {
  const { artist, artistInfo, topTracks, onAddTrack, artistUpdating } = props;

  const defaultImage = "/images/record.jpg";
  let artistImage = "";

  if (artistInfo)
    if (artistInfo.image[3]["#text"])
      artistImage = artistInfo.image[3]["#text"];
    else artistImage = defaultImage;
  else artistImage = defaultImage;

  // remove html
  const regex = /(<([^>]+)>)/gi;
  let bio = "...";
  if (artistInfo && artistInfo.bio.content.length > 0)
    bio = artistInfo.bio.content.replace(regex, "");

  return (
    <div className="artist-info card border-light p-3">
      <div className="container">
        {artistUpdating ? <div className="fadefx overlay" /> : null}

        <h3 className="text-warning text-capitalize pb-2">
          {artist && artist.toLowerCase()}
        </h3>

        <div className="row">
          <div className="col-xs-12 col-md-6">
            {/* <img className="img-fluid" src={artistImage} alt="artist_logo" /> */}
            <Image3D artistImage={artistImage} />
          </div>

          <div className="col-xs-12 col-md-6">
            <div className="d-block d-md-none pt-3"></div>
            <TopTracks
              topTracks={topTracks}
              onAddTrack={onAddTrack}
            ></TopTracks>
          </div>
        </div>

        <div className="biography py-4">
          <h5 className="text-warning">Biography</h5>
          <p>{bio}</p>
        </div>
      </div>
    </div>
  );
});
