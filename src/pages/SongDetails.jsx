import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { Error, RelatedSongs, Loader, DetailsHeader } from "../components";

import {
  useGetSongDetailsQuery,
  useGetRecomndationsSongsQuery,
} from "../redux/services/shazamCore";
const SongDetails = () => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songId });

  const { data: recoData, isFetching: isFetchingRecoSongs } =
    useGetRecomndationsSongsQuery({ songId });

  console.log(recoData);
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrices:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((line, i) => (
              <p className="text-gray-400 text-base my-1">{line}</p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyrics found!
            </p>
          )}
        </div>
      </div>
      <RelatedSongs />
    </div>
  );
};

export default SongDetails;
