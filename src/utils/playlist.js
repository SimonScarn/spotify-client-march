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
};

const getRecommendations = (tracks, setRecommendedTracks) => {
  randomizeTracks(tracks);
  let randomPlaylistTracks = tracks
    .sort(() => 0.5 - Math.random())
    .slice(0, 5)
    .map((e) => e.track.id);
  return spotifyAPI
    .getRecommendations({ seed_tracks: randomPlaylistTracks })
    .then((data) => {
      console.log('All rekoms --->', data)
      let randomRecommendedTracks = data.tracks
        .sort(() => 0.5 - Math.random())
  /*       .slice(0, 10); */
      return randomRecommendedTracks;
    });
};

const getPlaylistData = (playlistID) => {
  const pr1 = spotifyAPI.getPlaylist(playlistID).then((data) => {
    return data;
  });
  const pr2 = spotifyAPI.getPlaylistTracks(playlistID).then((data) => {
    return data;
  });

  return Promise.all([pr1, pr2]).then((values) => {
    return {
      playlist: values[0],
      tracks: values[1].items,
    };
  });
};

//! dev
const getPlaylist = (playlistID) => {
  return spotifyAPI.getPlaylist(playlistID).then((data) => {
    return data;
  });
};

const getPlaylistTracks = (playlistID) => {
  return spotifyAPI.getPlaylistTracks(playlistID).then((data) => {
    return data.items;
  });
};

export {
  addToPlaylist,
  getRecommendations,
  getPlaylistData,
  getPlaylist,
  getPlaylistTracks,
};
