"use client"

import InputFields from "@/components/inputFields";
import {useState} from "react"; 
import axios from "axios";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isSet, setIsSet] = useState<boolean>(false);
  function extractVideoID(url: string, param: string):string | null{
    try{

      const urlObj = new URL(url);
      return urlObj.searchParams.get(param) 
    }catch(err){
      console.error("Invalid URL:", err);
      return null;
    }
  }
  const uploadUrl = async()=>{
    const truncatedUrl = await extractVideoID(videoUrl, "si")
    const data = axios.post('http://localhost:8000/upload', {video_url: truncatedUrl});
    data.then((res)=>{
      if(res.status == 200){
        console.log("Uploaded Successfully");
        
        setIsSet(true);
      }
      console.log(res)
    })
    console.log(truncatedUrl);
  }
  return (<div><InputFields addUrl={(url)=>{
    setVideoUrl(url);
    uploadUrl();
  }}/></div>
  );
}
