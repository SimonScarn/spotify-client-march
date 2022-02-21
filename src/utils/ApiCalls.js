import { spotifyAPI } from "../spotify";

export function getAlbums(query) {
  return spotifyAPI
    .searchAlbums(query)
    .then((data) => {
      return data.albums.items;
    })
    .catch((err) => console.error(err));
}

export function getArtists(query) {
  return spotifyAPI.searchArtists(query).then((data) => {
    return data.artists.items;
  });
}

export function getPlaylists(query) {
  return spotifyAPI.searchPlaylists(query).then((data) => {
    return data.playlists.items;
  });
}

export function getShows(query) {
  return spotifyAPI.searchShows(query).then((data) => {
    return data.shows.items;
  });
}

export function getEpisodes(query) {
  return spotifyAPI.searchEpisodes(query).then((data) => {
    return data.episodes.items;
  });
}

export function getTracks(query) {
  return spotifyAPI.searchTracks(query).then((data) => {
    return data.tracks.items;
  });
}

export async function getUserPlaylists() {
  let playlists = [];
  const body = await spotifyAPI.getUserPlaylists();
  if (body.total > 20) {
    for (let i = 0; i < Math.ceil(body.total / 20); i++) {
      const add = await spotifyAPI.getUserPlaylists({ offset: 20 * i });
      playlists = [...playlists, ...add.items];
    }
  }
  return playlists;
}

