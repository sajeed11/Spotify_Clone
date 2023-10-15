import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import "swiper/css";
import "swiper/css/free-mode";

const TopChartsCard = ({ data, song, index, isPlaying, activeSong, i }) => {
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    console.log("STRIIIIIIIIIIIIING");
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
    console.log("STRIIIIIIIIIIIIING");
  };
  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
        activeSong?.title === song?.title ? "bg-[#4c426e]" : "bg-transparent"
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}
    >
      <h3 className="font-bold text-white text-base mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          src={song.images.coverart}
          alt={song.title}
          className="w-20 h-20 rounded-lg"
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.key}`}>
            <p className="text-xl font-bold text-white">{song.title}</p>
          </Link>
          <Link to={`/artists/${song.artists[0].adamid}`}>
            <p className="mt-1 text-base text-gray-300">{song.subtitle}</p>
          </Link>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();

  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {data?.tracks.slice(0, 5).map((song, i) => (
            <TopChartsCard
              song={song}
              i={i}
              index={song}
              key={song.key}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          centeredSlides
          centeredSlidesBounds
          spaceBetween={15}
          modules={[FreeMode]}
          freeMode
          className="mt-4"
        >
          {data?.tracks.slice(0, 5).map((index) => (
            <SwiperSlide
              key={index.key}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${index.artists[0].adamid}`}>
                <img
                  className="rounded-full w-full object-cover"
                  src={index.images.background}
                  alt="name"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
