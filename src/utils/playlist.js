import { spotifyAPI } from "../spotify";

const addToPlaylist = (playlistId, songArr, setIsAdded) => {
  spotifyAPI
    .addTracksToPlaylist(playlistId, songArr)
    .then(() => setIsAdded(true))
    .catch((err) => console.error(err));
};

const randomizeTracks = (tracks) => {

  if (tracks.length < 5) return tracks;
  let arr = [];
  while (arr.length < 5) {
    let randomNumber = Math.floor(Math.random() * tracks.length);
    let randomItem = tracks[randomNumber];
    if (!arr.includes(randomItem)) {
      arr.push(randomItem);
    }
  }

  return arr;
}

const getRecommendations = (tracks, setRecommendedTracks) => {
  randomizeTracks(tracks);
  let randomPlaylistTracks = tracks
    .sort(() => 0.5 - Math.random())
    .slice(0, 5)
    .map((e) => e.track.id);
  spotifyAPI
    .getRecommendations({ seed_tracks: randomPlaylistTracks })
    .then((data) => {
      let randomRecommendedTracks = data.tracks
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
        setRecommendedTracks(randomRecommendedTracks)
    });
};

export { addToPlaylist, getRecommendations };
