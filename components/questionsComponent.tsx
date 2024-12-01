import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "./ui/button";
import { useState } from "react";

interface QuestionProps {
  questionObject: {
    question: string;
    options: string[];
    answer: number;
  };
}

const Questions = ({ questionObject }: QuestionProps) => {
  const [buttonVariants, setButtonVariants] = useState({
    button1: "options",
    button2: "options",
    button3: "options",
    button4: "options",
  });
  const checkAnswer = (selectedOption: number, buttonId: string) => {
    if (selectedOption === questionObject.answer) {
      setButtonVariants((prev) => ({
        ...prev,
        [buttonId]: "correctOption",
      }));
      console.log("Correct Answer");
    } else {
      setButtonVariants((prev) => ({
        ...prev,
        [buttonId]: "wrongOption",
      }));
      console.log("Wrong Answer");
    }
  };
  return (
    <div className='my-10'>
      <Card>
        <CardHeader>{questionObject.question}</CardHeader>
        <CardContent className='flex flex-wrap justify-center gap-4'>
          <Button
            variant={
              buttonVariants.button1 as
                | "options"
                | "correctOption"
                | "wrongOption"
            }
            onClick={() => checkAnswer(0, "button1")}
            className="w-1/3"
          >
            {questionObject.options[0]}
          </Button>
          <Button
            variant={
              buttonVariants.button2 as
                | "options"
                | "correctOption"
                | "wrongOption"
            }
            onClick={() => checkAnswer(1, "button2")}
            className="w-1/3"
          >
            {questionObject.options[1]}
          </Button>
          <Button
            variant={
              buttonVariants.button3 as
                | "options"
                | "correctOption"
                | "wrongOption"
            }
            onClick={() => checkAnswer(2, "button3")}
            className="w-1/3"
          >
            {questionObject.options[2]}
          </Button>
          <Button
            variant={
              buttonVariants.button4 as
                | "options"
                | "correctOption"
                | "wrongOption"
            }
            onClick={() => checkAnswer(3, "button4")}
            className="w-1/3"
          >
            {questionObject.options[3]}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Questions;
