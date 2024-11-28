"use client";

import { SendHorizonalIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import React, { useRef, useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Chat = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I am your assistant. How can I help you today?",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);
  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (newMessage.trim() === "") return;
    setMessages((prev) => [...prev, { role: "user", content: newMessage }]);
    setNewMessage("");
  };
  return (
    <section className='py-24 text-zinc-700'>
      <div className='mx-auto mt-3 w-full max-w-lg'>
        <ScrollArea className='mb-2 h-[400px] rounded-md border p-4' ref={ref}>
          {messages.map((m, index) => (
            <div key={index} className='mr-6 whitespace-pre-wrap md:mr-12'>
              {m.role === "user" && (
                <div className='mb-6 flex gap-3'>
                  <Avatar>
                    <AvatarFallback className='text-sm'>U</AvatarFallback>
                  </Avatar>
                  <div className='mt-1.5'>
                    <p className='font-semibold'>You</p>
                    <div className='mt-1.5 text-sm text-zinc-500'>
                      {m.content}
                    </div>
                  </div>
                </div>
              )}
              {m.role === "assistant" && (
                <div className='mb-6 flex gap-3'>
                  <Avatar>
                    <AvatarFallback className='bg-emerald-500 text-white'>
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className='mt-1.5 w-full'>
                    <div className='flex justify-between'>
                      <p className='font-semibold'>Bot</p>
                    </div>
                    <div className='mt-2 text-sm text-zinc-500'>
                      {m.content}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
        <form className='relative'>
          <Input
            name='message'
            placeholder='Ask me anything......'
            className='pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button
            size='icon'
            variant='secondary'
            className='absolute right-1 top-1 h-8 w-10'
            onClick={(event) => sendMessage(event)}
          >
            <SendHorizonalIcon className='h-5 w-5 text-emerald-500' />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Chat;
