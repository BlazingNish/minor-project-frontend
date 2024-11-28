"use client"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";

type Props={
    addUrl:(url:string)=>void;
}

const InputFields = ({addUrl}: Props) => {
    const[tempUrl, setTempUrl] = useState('');
    const handleClick = ()=>{
        function isValidUrl(string:string){
            const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            return (res !== null)
        }
        if(isValidUrl(tempUrl)){
            const checkUrl = new URL(tempUrl);
            if (checkUrl.hostname == "www.youtube.com" || checkUrl.hostname == "youtube.com" || checkUrl.hostname == "youtu.be"||checkUrl.hostname == "m.youtube.com"){
                addUrl(tempUrl);
            }
            else{
                alert("Please enter a valid Youtube URL");
            }
        }
        else{
            alert("Please enter a valid URL");
        }
    }
  return (
    <div className='mx-3 flex-col justify-center items-center align-middle text-center'>
      <Input
        type='url'
        placeholder='Enter the Youtube Link'
        className='w-1/2 self-center text-center mx-auto mb-4'
        value={tempUrl}
        onChange={(e) => setTempUrl(e.target.value)}
      />
      <Button type='submit' onClick={handleClick}>
        Generate Questions
      </Button>
    </div>
  );
};

export default InputFields;
