"use client";
import InputFields from "@/components/inputFields";
import Questions from "@/components/questionsComponent";
import VideoPlayer from "@/components/videoPlayer";
import axios from "axios";
import { useEffect, useState } from "react";
const questions = [
  {
    id: 1,
    question:
      "Which sublayer of the Data Link Layer is responsible for managing communication between upper and lower layers?",
    options: [
      "Network Layer",
      "Logical Link Control (LLC)",
      "Media Access Control (MAC)",
      "Physical Layer",
    ],
    answer: 1,
  },
  {
    id: 2,
    question: "What is a primary function of the MAC sublayer?",
    options: [
      "Flow Control",
      "Data Encapsulation",
      "Packet Disassembly",
      "Error Detection at the Application Layer",
    ],
    answer: 1,
  },
  {
    id: 3,
    question:
      "Which component is directly responsible for managing flow control within the Data Link Layer?",
    options: [
      "MAC Sublayer",
      "LLC Sublayer",
      "Network Layer",
      "Physical Layer",
    ],
    answer: 1,
  },
  {
    id: 4,
    question:
      "What does the MAC sublayer add to the data received from the Network Layer to create frames?",
    options: [
      "Flow Control and Encryption",
      "Network Layer Protocols",
      "Header and Trailer",
      "Logical Link Control",
    ],
    answer: 2,
  },
  {
    id: 5,
    question:
      "In which scenario does the MAC sublayer remove frames from the physical medium?",
    options: [
      "When transmitting data from sender to receiver",
      "When communicating with the Network Layer",
      "During frame reception on the receiver’s side",
      "When adding control information",
    ],
    answer: 2,
  },
];

const GenerateQuestions = () => {
  const [videoUrl, setVideoUrl] = useState(
    "https://youtu.be/fhzKLBZJC3w?si=G5KdN0GF0ZBxzfGF"
  );
  const [isSet, setIsSet] = useState(false);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  function extractVideoID(url: string, param: string): string | null {
    try {
      const urlObj = new URL(url);
      return urlObj.searchParams.get(param);
    } catch (err) {
      console.error("Invalid URL:", err);
      return null;
    }
  }
  const uploadLink = (url: string) => {
    const truncatedUrl = extractVideoID(url, "si");
    const data = axios.post("http://localhost:8000/upload", {
      video_url: truncatedUrl,
    });
    data.then((res) => {
      if (res.status == 200 || res.status == 210) {
        console.log("Uploaded Successfully");
      }
    });
    console.log(data);
  };
  return (
    <div className='mx-3 flex-col justify-center items-center align-middle text-center'>
      <InputFields
        addUrl={(url: string) => {
          setVideoUrl(url);
          uploadLink(url);
        }}
      />
      {isSet && (
        <div>
          <div className='flex justify-center items-center my-10'>
            {isClient && <VideoPlayer url={videoUrl} isPlaying={false} />}
          </div>
          <div>
            {questions.map((question) => {
              return <Questions key={question.id} questionObject={question} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateQuestions;
