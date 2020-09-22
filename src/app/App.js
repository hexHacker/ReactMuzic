
import React, { Component } from "react";

import { ArtistInfo } from "../components/Artist/ArtistInfo";
import { ArtistTags } from "../components/Artist/ArtistTags";
import { ArtistSearch } from "../components/Artist/ArtistSearch";
import { SimilarTags } from "../components/Tags/SimilarTags";
import { TagSimilarArtists } from "../components/Tags/TagSimilarArtists";
import { TagTopArtists } from "../components/Tags/TagTopArtists";
import { Favorites } from "../components/Favorites/Favorites";

import "./css/App.css";

let scrollToElement = require("scroll-to-element");

class App extends Component {
    state = {
        favorites: [],
        artistInfo: null,
        topTracks: null,
        artistTags: null,
        tagTopArtists: null,
        artist: null,
        loading: true,
        artistUpdating: true,
        error: null,
    };

    // Initial call to get some data
    componentDidMount() {
        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener("beforeunload", this.saveFavotires.bind(this));
        this.setRandomTopArtist();
        this.loadFavotires();
    }

    componentWillUnmount() {
        // clean up event listener here
        window.removeEventListener("beforeunload", this.saveFavotires.bind(this));
        this.saveFavotires();
    }

    loadFavotires() {
        if (localStorage.hasOwnProperty("favorites")) {
            // get the key's value from localStorage
            let value = localStorage.getItem("favorites");

            // parse the localStorage string and setState
            try {
                value = JSON.parse(value);
                this.setState({ favorites: value });
            } catch (e) {
                // handle empty string
                this.setState({ favorites: value });
            }
        }
    }

    saveFavotires() {
        localStorage.setItem("favorites", JSON.stringify(this.state.favorites));
    }

    getData(method, data) {
        const apiKey = "b45f5ae52253733e2fac6dbd622f14b4";
        const apiBase = `https://ws.audioscrobbler.com/2.0/?api_key=${apiKey}&format=json`;
        let apiURL = apiBase;
        data = encodeURIComponent(data);

        this.setState({
            loading: true,
        });

        switch (method) {
            case "charts": {
                const endpoint = "chart.getTopArtists";
                apiURL += `&method=${endpoint}`;
                break;
            }
            case "artist": {
                const endpoint = "artist.getInfo";
                apiURL += `&method=${endpoint}&artist=${data}`;
                break;
            }
            case "tagTopArtists": {
                const endpoint = "tag.getTopArtists";
                apiURL += `&method=${endpoint}&tag=${data}`;
                break;
            }
            case "topArtistTracks": {
                const endpoint = "artist.getTopTracks";
                apiURL += `&method=${endpoint}&artist=${data}`;
                break;
            }
            case "artistTopTags": {
                const endpoint = "artist.getTopTags";
                apiURL += `&method=${endpoint}&artist=${data}`;
                break;
            }
            case "similarTags": {
                const endpoint = "tag.getSimilar";
                apiURL += `&method=${endpoint}&tag=${data}`;
                break;
            }
            default:
                apiURL = null;
        }

        return fetch(apiURL).then((response) => response.json());
    }

    getArtistInfo(artist) {
        this.setState({
            artistUpdating: true,
        });

        this.getData("artist", artist)
            .then((response) => {
                if (response.error) {
                    response.message = "Nothing found - try again!";
                    this.setState({
                        artistUpdating: false,
                        error: response.message,
                    });
                } else {
                    this.setState({
                        artist,
                        artistInfo: response.artist,
                        error: null,
                    });
                    this.getTopArtistTracks(artist);
                    scrollToElement("body");
                }
            })
            .finally(() => {
                this.setState({
                    //artistUpdating: false,
                    loading: false,
                });
            })
            .catch((error) => {
                console.log("!catch error:", error);
                this.setState({
                    loading: false,
                    artistUpdating: false,
                    error: error.message,
                });
            });
    }

    setRandomTopArtist() {
        this.setState({ artistUpdating: true });
        const request = this.getData("charts");

        request.then((data) => {
            if (data.error) {
                this.setState({
                    loading: false,
                    artistUpdating: false,
                    error: `Oh no! There was a problem finding that artist :/`
                });
            }
            else {
                const artists = data.artists.artist;
                const randomArtist = artists[Math.floor(Math.random() * artists.length)];
                this.getArtistInfo(randomArtist.name);
            }
        });
    }

    // called after artist info is updated to get the artist top tracks
    getTopArtistTracks(artist) {
        const request = this.getData("topArtistTracks", artist);
        request.then((data) => {
            // grab the first ten top tracks here
            const topTracks = data.toptracks.track.slice(0, 10);
            // console.log(topTracks)
            this.setState({ topTracks });

            // delay the fade in after tracks are updated
            setTimeout(() => {
                this.setState({ artistUpdating: false });
            }, 300);
        });
    }

    getArtistTags(tag) {
        const request = this.getData("artistTopTags", tag);
        request.then((data) => {
            //console.log('Artist tags', data.toptags)
            this.setState({
                artistTags: data.toptags,
                //loading: false
            });
        });
    }

    // called after artist info is
    getTagTopArtists(tag) {
        const request = this.getData("tagTopArtists", tag);
        request.then((data) => {
            //console.log('tag top artists', data)

            this.setState({
                tagTopArtists: data.topartists,
            });

            setTimeout(() => {
                this.setState({ loading: false });
            }, 300);
        });
    }

    // prop event handlers

    handleSumbit = (e) => {
        e.preventDefault();
        const artist = e.target.elements.artistname.value.trim();
        this.getArtistInfo(artist);
    };

    handleRandomArtist = (e) => {
        e.preventDefault();
        this.setRandomTopArtist();
    };

    handleArtistTags = (e) => {
        const artistTag = e.target.textContent;
        this.getArtistTags(artistTag);
    };

    handleTagTopArtists = (e) => {
        const tag = e.target.textContent;
        this.getTagTopArtists(tag);
    };

    handleSimularArtists = (e) => {
        const artist = e.target.textContent;
        this.getArtistInfo(artist);
    };

    handleAddFavoriteTrack = (e, track) => {
        e.preventDefault();
        const favorites = this.state.favorites;
        const fav = {
            artist: track.artist.name,
            track: track.name,
            url: track.url,
        };
        const res = favorites.findIndex(
            (f) => f.track === fav.track && f.artist === fav.artist
        );

        if (res === -1) {
            favorites.push(fav);
            this.setState({ favorites });
        }
    };

    handleRemoveFavoriteTrack = (e, index) => {
        e.preventDefault();
        const favorites = this.state.favorites;
        favorites.splice(index, 1);
        this.setState({ favorites });
    };

    render() {
        const {
            error,
            loading,
            favorites,
            artistUpdating,
            artist,
            artistInfo,
            topTracks,
            artistTags,
            tagTopArtists,
        } = this.state;

        return (
            <div className="pt-2 mx-auto fadefx in">
                <div className="container">
                    <Favorites
                        favorites={favorites}
                        onRemoveFavoriteTrack={this.handleRemoveFavoriteTrack}
                    />
                    <p className="text-danger">{error}</p>
                </div>

                {/* <FavoriteState topTracks={topTracks} ></FavoriteState> */}

                <ArtistSearch
                    doSubmit={this.handleSumbit}
                    setRandomTopArtist={this.handleRandomArtist}
                />

                <div className={!artistUpdating ? "fadefx in" : "fadefx"}>
                    <ArtistInfo
                        artist={artist}
                        artistInfo={artistInfo}
                        topTracks={topTracks}
                        onAddTrack={this.handleAddFavoriteTrack}
                        onArtistsTagsClick={this.handleArtistTags}
                        artistUpdating={artistUpdating}
                    />
                </div>

                <div
                    className={
                        "related-info container p-3 mt-2 " +
                        (loading || artistUpdating ? "fadefx" : "fadefx in")
                    }
                >
                    {(loading || artistUpdating) && <div className="overlay" />}

                    <div className="row">
                        <div className="col-md-6">
                            <ArtistTags
                                artistInfo={artistInfo}
                                onTagTopArtistsClick={this.handleTagTopArtists}
                                onArtistsTagsClick={this.handleArtistTags}
                            />
                        </div>

                        <div className="col-md-6">
                            <SimilarTags
                                artistInfo={artistInfo}
                                onSimilarArtistsClick={this.handleSimularArtists}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 pt-4">
                            <TagSimilarArtists
                                artistTags={artistTags}
                                onTopTagsClick={this.handleTagTopArtists}
                            />
                        </div>

                        <div className="col-md-6 pt-4">
                            <TagTopArtists
                                topArtists={tagTopArtists}
                                onArtistsClick={this.handleSimularArtists}
                            />
                        </div>
                    </div>

                    <p className="mt-4 text-danger">{error}</p>
                </div>
            </div>
        );
    }
}

export default App;
