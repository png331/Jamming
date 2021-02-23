//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from '../Playlist/Playlist';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        name: 'Paul',
        artist: 'Dumber',
        album: "Asmeralda",
        id: '1'
      },
      {
        name: 'Chiki',
        artist: 'Dumber',
        album: "Asmeralda",
        id: '2'
      }],

      playlistName: {
        name: 'HardCore'
      },
      playlistTracks: [{
        name: 'Ran-D',
        artist: 'dunno',
        album: "get wrecked",
        id: '50305'
      }]
    }
    this.addTrack = this.addTrack.bind(this);
  }
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if(tracks.find(currTrack => currTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
      this.setState({
        playListTracks: tracks
      });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/*<!-- Add a SearchBar component --> */}
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            {/* <!-- Add a SearchResults component -->*/}
            {/*<!-- Add a Playlist component -->*/}
            <Playlist playListName={this.state.playlistName} playListTracks={this.state.playlistTracks} />

          </div>
        </div>
      </div>
    );
  }
}
