"use client";
import InputFields from "@/components/inputFields";
import Questions from "@/components/questionsComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/videoPlayer";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circles } from "react-loader-spinner";
import "react-loader-spinner/dist/main";

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
    "https://youtu.be/tRwHpyOq4P4?si=JVGu_UCQ7ZZlxQ0H"
  );
  const [isSet, setIsSet] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  const uploadLink = async () => {
    const truncatedUrl = await extractVideoID(videoUrl, "si");
    setIsLoading(true);
    // const data = axios.post("http://localhost:8000/upload", {
    //   video_url: truncatedUrl,
    // });
    // data.then((res) => {
    //   if (res.status == 200 || res.status == 210) {
    //     console.log("Uploaded Successfully");
    //   }
    // });
    console.log(truncatedUrl);
  };
  return (
    <div className='mx-3 flex-col justify-center items-center align-middle text-center'>
      <InputFields
        addUrl={(url: string) => {
          setVideoUrl(url);
          uploadLink();
        }}
      />
      {isLoading && (
        <div className='flex justify-center items-center my-10 h-screen'>
          <Circles height='80' width='80' color='#10b981' />
        </div>
      )}
      <div className='flex justify-center items-center my-10'>
        {isSet && isClient && <VideoPlayer url={videoUrl} isPlaying={false} />}
      </div>
      {isSet && (
        <Tabs defaultValue='MCQ' className='mt-20'>
          <TabsList className='px-10 py-5 gap-40'>
            <TabsTrigger value='MCQ'>Multiple Choice Question</TabsTrigger>
            <TabsTrigger value='Summary'>Summary</TabsTrigger>
          </TabsList>
          <TabsContent value='MCQ'>
            <div>
              {questions.map((question) => {
                return (
                  <Questions key={question.id} questionObject={question} />
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value='Summary'>
            <Card className='my-4 pb-10'>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className='flex justify-center p-10'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                laborum praesentium iste veniam aut cum aperiam dolore sapiente
                numquam rerum, sed quia quas qui, laboriosam consequatur.
                Perferendis a eos perspiciatis et eius expedita vel, in quis
                molestiae repellendus numquam sequi similique vero corrupti
                delectus inventore! Provident ipsa labore ea inventore libero
                ipsam expedita dolores, porro rem totam quod doloribus, officia
                mollitia aspernatur amet odio. Fugiat laboriosam reiciendis
                nesciunt explicabo perspiciatis consequuntur similique soluta
                vitae accusantium? Quo, ducimus. Sapiente, autem. Asperiores
                tenetur provident qui reiciendis nesciunt veritatis possimus,
                cum aliquam. Voluptatibus reprehenderit provident dolor eos
                quasi. Corrupti amet placeat cum, iure alias sapiente maxime
                facilis reiciendis, at aspernatur beatae veniam, nihil
                molestiae? Quasi, natus. Distinctio sunt dignissimos unde.
                Molestias veniam accusantium, repudiandae totam laboriosam sint,
                doloribus ipsam necessitatibus ullam hic dolores aliquam vitae
                modi magni commodi mollitia sunt unde distinctio. Aspernatur
                vitae rem cumque, quos debitis quod, aut ex deserunt est
                doloremque illo eum ipsa nemo tenetur doloribus vero qui at
                nulla id recusandae. Sequi dicta earum nobis quasi aspernatur
                sed soluta voluptatum atque corporis qui fugit placeat inventore
                obcaecati ab dolorem eveniet, minus esse expedita dolore nisi
                quaerat! Enim fugiat unde, aliquam dolore maiores ratione
                officia non ex earum, perferendis laboriosam, ut rem doloremque
                eaque at quam animi perspiciatis quae molestiae amet sit
                excepturi voluptatem quos. Blanditiis sed, a temporibus sapiente
                rerum aliquid pariatur eos, aperiam veritatis assumenda
                molestiae voluptas molestias labore. Eum illo numquam veniam
                quibusdam eligendi delectus facere sapiente. Debitis distinctio
                in quae totam ipsa. Doloribus, exercitationem quos!
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        // <div>
        //   <div className='flex justify-center items-center my-10'>
        //     {isClient && <VideoPlayer url={videoUrl} isPlaying={false} />}
        //   </div>
        //   <div>
        //     {questions.map((question) => {
        //       return <Questions key={question.id} questionObject={question} />;
        //     })}
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default GenerateQuestions;
