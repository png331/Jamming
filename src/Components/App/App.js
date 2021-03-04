//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify'

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    };
    this.removeTrack = this.removeTrack.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playListTracks: tracks });
  }
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks.filter(savedTrack => {
      if (savedTrack.id === track.id) {
        tracks.splice(savedTrack, 1);
      }
    });

    this.setState({ playListTracks: tracks });
  }
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    });
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
              playListTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />

          </div>
        </div>
      </div>
    );
  }
}
