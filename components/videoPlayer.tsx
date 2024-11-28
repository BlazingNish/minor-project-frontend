import ReactPlayer from "react-player";

interface VideoPlayerProps {
    url: string;
    isPlaying: boolean;
}

const VideoPlayer = ({url, isPlaying}: VideoPlayerProps) => {
    return ( <ReactPlayer url={url} playing={isPlaying}/> );
}
 
export default VideoPlayer;