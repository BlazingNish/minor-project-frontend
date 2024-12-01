"use client"

import InputFields from "@/components/inputFields";
import {useState} from "react"; 
import axios from "axios";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isSet, setIsSet] = useState<boolean>(false);
  const uploadUrl = ()=>{
    const data = axios.post('http://localhost:8000/upload', {video_url: videoUrl});
    data.then((res)=>{
      if(res.status == 200){
        console.log("Uploaded Successfully");
        setIsSet(true);
      }
    })
  }
  return (<div><InputFields addUrl={(url)=>{
    setVideoUrl(url);
    uploadUrl();
  }}/></div>
  );
}
