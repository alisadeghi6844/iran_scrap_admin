import {
  MediaPlayer,
  MediaProvider,
  type MediaPlayerInstance,
} from "@vidstack/react";

// استایل‌های ضروری
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { useEffect, useRef, useState } from "react";
import { getFileFromDatabase, getFileMetadata } from "../../../DB";
import { useSelector } from "react-redux";
import { selectRunFileDataData } from "../../../redux/slice/chat/socket/socketSlice";
import VideoLoader from "./VideoPlayLoader";
import { useSocket } from "../../../context/SocketContext";

const VideoPlayer = (props: any) => {
  const { openFileModal } = props;

  const player = useRef<MediaPlayerInstance>(null);
  const fileData = useSelector(selectRunFileDataData);

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canPlay, setCanPlay] = useState(false);

  const socket: any = useSocket(); // استفاده از کانتکست سوکت

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        if (fileData?.fileId?.length) {
          const fileMetadata = await getFileMetadata(fileData?.fileId);

          if (fileMetadata?.downloadedPercentage === 100) {
            const blob = await getFileFromDatabase(fileData?.fileId);
            const videoBlob = new Blob([blob], { type: "video/mp4" });
            const url = URL.createObjectURL(videoBlob);
            setVideoUrl(url);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("خطا در دریافت فایل:", error);
        setError("خطا در بارگذاری ویدئو");
        setLoading(false);
      }
    };

    fetchVideo();

    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [fileData?.fileId]);

  useEffect(() => {
    if (!openFileModal) {
      setVideoUrl(null);
    }
  }, [openFileModal]);

  if (loading)
    return (
      <div className="min-w-[600px] min-h-[200px] text-black">
        <VideoLoader />
      </div>
    );

  if (error) return <div className="text-red-500">{error}</div>;
  if (!videoUrl) return <div>ویدئو در دسترس نیست</div>;

  return (
    <div className=" bg-black">
      {videoUrl && (
        <MediaPlayer
          ref={player}
          aspectRatio="16:9"
          viewType="video"
          autoPlay={true}
          streamType="on-demand"
          key={videoUrl}
          src={{
            src: videoUrl,
            type: "video/mp4",
          }}
          logLevel="warn"
          load="viewport"
          controls
          muted
          playsInline
          crossOrigin
          storage="MediaStorage"
          hideControlsOnMouseLeave
          keyDisabled
          canFullscreen
          className="w-full aspect-video bg-black vds-player"
          theme="dark" // یا light
          onProviderChange={(provider: any) => {
            console.log("Provider changed:", provider);
          }}
          onLoadedData={() => {
            console.log("MediaPlayer: Data Loaded");
          }}
          onCanPlay={() => {
            setCanPlay(true);
            setTimeout(() => {
              player.current?.play().catch((error) => {
                setError("برای پخش خودکار، لطفا با صفحه تعامل داشته باشید");
              });
            }, 500);
          }}
          onError={(error) => {
            console.error("MediaPlayer Error:", error);
          }}
        >
          <MediaProvider></MediaProvider>
        </MediaPlayer>
      )}
    </div>
  );
};

export default VideoPlayer;
