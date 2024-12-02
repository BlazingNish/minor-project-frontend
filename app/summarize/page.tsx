"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import { Circles } from "react-loader-spinner";

const Summarize = () => {
  const [summary, setSummmary] = useState("");
  const [context, setContext] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    const data = await axios.post("http://localhost:8000/summarize", { content: context })
    setSummmary(data.data)
    console.log(data.data)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)

  };
  return (
    <div className='mx-3 flex-col justify-center items-center align-middle text-center'>
      <Textarea
        placeholder='Enter the text here'
        className='my-4'
        rows={10}
        onChange={(e) => setContext(e.target.value)}
      />
      <Button onClick={handleClick}>Summarize Text</Button>
      {/* {isLoading && <div className="flex justify-center items-center my-10 h-screen">
        
        <Circles height='80' width='80' color='#10b981'/>
        </div>
        }
      {isLoading! && (
        <Card className='my-4 pb-10'>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className='flex justify-center p-10'>{summary}</CardContent>
        </Card>
      )} */}
      {isLoading ? (<div className="flex justify-center items-center my-10 h-screen">
        <Circles height='80' width='80' color='#10b981' />
      </div>) : summary.length != 0 && <Card className='my-4 pb-10'>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className='flex justify-center p-10'>{summary}</CardContent>
      </Card>}
    </div>
  );
};

export default Summarize;
