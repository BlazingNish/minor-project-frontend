"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const Summarize = () => {
  const handleClick = () => {
    console.log(context);
    setSummmary(context);
  };
  const [summary, setSummmary] = useState("");
  const [context, setContext] = useState("");
  return (
    <div className='mx-3 flex-col justify-center items-center align-middle text-center'>
      <Textarea
        placeholder='Enter the text here'
        className='my-4'
        rows={10}
        onChange={(e) => setContext(e.target.value)}
      />
      <Button onClick={handleClick}>Summarize Text</Button>
      {summary && (
        <Card className='my-4 pb-10'>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className='flex justify-center p-10'>{summary}</CardContent>
        </Card>
      )}
    </div>
  );
};

export default Summarize;
