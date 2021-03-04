const clientID = '';
const redirectURI = "http://localhost:3000/";
let accessToken;
const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresTokenMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresTokenMatch) {
            accessToken = accessTokenMatch[1];
            const expiresToken = Number(expiresTokenMatch[1]);
            window.setTimeout(() => accessToken = '', expiresToken * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }
        else {
            
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => response.json()
        ).then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            });
    },
    savePlaylist(name, trackURIs) {
        if(!name || !trackURIs){
            return;
        }
        const headers = {
            Authorization: `Bearer ${accessToken}`
        }
        let userID;
        return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => response.json()).then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: 'POST',
                body: JSON.stringify({ name: name}),
                headers: headers
            }).then(response => response.json()).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({uris: trackURIs})
                })
            })
        });
    }
}
export default Spotify;

