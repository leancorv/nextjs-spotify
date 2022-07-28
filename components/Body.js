import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Poster from "./Poster";
import Search from "./Search"

function Body({ spotifyApi }) {
  const {data: session} = useSession();
  const { accessToken } = session;
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Searching...

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res) => {
      setSearchResults(
        res.body.tracks.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });
  }, [search, accessToken]);

  // New Releases...

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getNewReleases().then((res) => {
      setNewReleases(
        res.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });
  }, [accessToken]);


  return (
    <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch} />
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
        {searchResults.length === 0 ? newReleases.slice(0,4).map((track) => (
          <Poster 
            key={track.id} 
            track={track} 
            // chooseTrack={chooseTrack}
          />
        )) : searchResults.slice(0,4).map((track) => (
          <Poster
            key={track.id} 
            track={track} 
            // chooseTrack={chooseTrack}
          />
        ))}
      </div>
    </section>
  )
}

export default Body