"use client";

import { SendHorizonalIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import React, { useRef, useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "../public/chat-animation.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Chat = () => {
  const endRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I am your assistant. How can I help you today?",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);

    // Add the user's message to the chat
    setMessages((prev) => [...prev, { role: "user", content: newMessage }]);

    try {
      const { data } = await axios.post("http://localhost:8000/chat", {
        query: newMessage,
      });

      // Add the assistant's response to the chat
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response.text },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setNewMessage("");
      setIsLoading(false);
    }
  };

  return (
    <section className='py-24 text-zinc-700'>
      <div className='mx-auto mt-3 max-w-lg'>
        <ScrollArea className='mb-2 h-[400px] rounded-md border p-4 overflow-auto'>
          {messages.map((m, index) => (
            <div key={index} className='mr-6 whitespace-pre-wrap md:mr-12'>
              {m.role === "user" ? (
                <div className='mb-6 flex gap-3'>
                  <Avatar>
                    <AvatarFallback className='text-sm'>U</AvatarFallback>
                  </Avatar>
                  <div className='mt-1.5'>
                    <p className='font-semibold'>You</p>
                    <div className='mt-1.5 text-sm text-zinc-500 break-words text-clip w-[23rem]'>
                      <p className='text-balance'>{m.content}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='mb-6 flex gap-3'>
                  <Avatar>
                    <AvatarFallback className='bg-emerald-500 text-white'>
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className='mt-1.5'>
                    <p className='font-semibold'>Bot</p>
                    <div className='mt-2 text-sm text-zinc-500 break-words text-clip w-[23rem]'>
                      <p className='text-balance'>{m.content}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={endRef}></div>
          {isLoading && (
            <div className='flex justify-center items-center mt-4'>
              <Lottie options={defaultOptions} height={100} width={100} />
            </div>
          )}
        </ScrollArea>
        <form className='relative' onSubmit={sendMessage}>
          <Input
            name='message'
            placeholder='Ask me anything...'
            className='pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isLoading}
          />
          <Button
            size='icon'
            variant='secondary'
            className='absolute right-1 top-1 h-8 w-10'
            type='submit'
            disabled={isLoading}
          >
            <SendHorizonalIcon className='h-5 w-5 text-emerald-500' />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Chat;
