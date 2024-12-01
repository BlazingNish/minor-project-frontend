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

// const questions = [
//   {
//     id: 1,
//     question:
//       "Which sublayer of the Data Link Layer is responsible for managing communication between upper and lower layers?",
//     options: [
//       "Network Layer",
//       "Logical Link Control (LLC)",
//       "Media Access Control (MAC)",
//       "Physical Layer",
//     ],
//     answer: 1,
//   },
//   {
//     id: 2,
//     question: "What is a primary function of the MAC sublayer?",
//     options: [
//       "Flow Control",
//       "Data Encapsulation",
//       "Packet Disassembly",
//       "Error Detection at the Application Layer",
//     ],
//     answer: 1,
//   },
//   {
//     id: 3,
//     question:
//       "Which component is directly responsible for managing flow control within the Data Link Layer?",
//     options: [
//       "MAC Sublayer",
//       "LLC Sublayer",
//       "Network Layer",
//       "Physical Layer",
//     ],
//     answer: 1,
//   },
//   {
//     id: 4,
//     question:
//       "What does the MAC sublayer add to the data received from the Network Layer to create frames?",
//     options: [
//       "Flow Control and Encryption",
//       "Network Layer Protocols",
//       "Header and Trailer",
//       "Logical Link Control",
//     ],
//     answer: 2,
//   },
//   {
//     id: 5,
//     question:
//       "In which scenario does the MAC sublayer remove frames from the physical medium?",
//     options: [
//       "When transmitting data from sender to receiver",
//       "When communicating with the Network Layer",
//       "During frame reception on the receiver’s side",
//       "When adding control information",
//     ],
//     answer: 2,
//   },
// ];

const GenerateQuestions = () => {
  const [videoUrl, setVideoUrl] = useState(
    ""
  );
  const [questions, setQuestions] = useState<Array<{answer: number, question:string, options:Array<string>}>>([]);
  const [isSet, setIsSet] = useState(false);
  const [summary, setSummary] = useState("")
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  function extractVideoID(url: string): string|null{
    try {
      const urlObj = new URL(url);
      const siParam = urlObj.searchParams.get('si');
      const vParam = urlObj.searchParams.get('v');
      return siParam?siParam:vParam;
    } catch (err) {
      console.error("Invalid URL:", err);
      return null;
    }
  }

  const getContent = async(url: string|null)=>{
    const data = await axios.post("http://localhost:8000/upload",{video_url: url});
    const content = data.data.content;
    console.log("Uploaded URL Successfully")
    console.log(content);
    return content;
  }
  const uploadLink = async (url: string) => {
    const truncatedUrl = extractVideoID(url);
    setVideoUrl(url);
    console.log(truncatedUrl);
    setIsLoading(true);
    const content = getContent(truncatedUrl)
    const mcqResponse = axios.post('http://localhost:8000/mcqs',{content: content})

    mcqResponse.then((res)=>{
      console.log(res);
      setQuestions(res.data.questions);
      setSummary(res.data.summary);

      setTimeout(()=>{
        setIsLoading(false)
        setIsSet(true);
      }, 2000)
    })
  };
  return (
    <div className='mx-3 flex-col justify-center items-center align-middle text-center'>
      <InputFields
        addUrl={(url: string) => {
          uploadLink(url);
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
              {questions.map((question, index) => {
                return (
                  <Questions key={index} questionObject={question} />
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
                {summary}
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
