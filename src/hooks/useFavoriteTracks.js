import {useEffect, useState} from 'react'
import {spotifyAPI} from '../spotify'


export default function useFavoriteTracks(offset) {
    const [loading, setLoading] = useState(true)
    const [favoritesTracks, setFavoritesTracks] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setLoading(true);
        spotifyAPI.getMySavedTracks({offset})
            .then(res => {
                setFavoritesTracks(prev => [...prev, ...res.items])
                setLoading(false)
            })
            .catch(err => console.error(err))
    }, [offset, spotifyAPI, reload]);


    useEffect(() => {
        console.log('setting favorites tracks', favoritesTracks.length)

    }, [favoritesTracks, reload])


    return { favoritesTracks, loading, setReload };
}
