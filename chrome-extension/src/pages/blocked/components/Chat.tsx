import { useState } from 'react';
import { ChatInput } from "./ui/chat/chat-input";
import { Button } from "./ui/button";
import { CornerDownLeft } from "lucide-react";
import { generateResponse } from '../../../ai/ai';


function checkValidity(response: string): boolean {
  // Convert the response string to lowercase and remove any trailing full stop (period)
  const lowerCaseResponse = response.toLowerCase().replace(/\.$/, "");

  // Define a regular expression to check for 'valid' or 'invalid' in the string
  const regex = /\b(valid|invalid)\b/;

  // Test if the string contains either 'valid' or 'invalid'
  return regex.test(lowerCaseResponse);
}

function checkInvalidOrValid(response: string): boolean {
  // Convert the response string to lowercase and remove any trailing full stop (period)
  const lowerCaseResponse = response.toLowerCase().replace(/\.$/, "");

  // Define a regular expression to check for 'invalid'
  const regex = /\binvalid\b/;

  // Test if the string contains the word 'invalid', return true if it does
  return regex.test(lowerCaseResponse);
}

const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  console.log(response);
  const [isInvalid, setIsInvalid] = useState(false); // Track if the response is invalid

  const handleInputChange = (e: any) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("input:");
    console.log(inputText);

    try {
      const answer = await generateResponse(inputText);
      setResponse(answer);
      console.log("output:");
      console.log(answer);

      // Check if the response contains 'valid' or 'invalid'
      console.log(checkValidity(answer));
      if (checkValidity(answer)) {
        // If the response is valid, check if it is invalid
        console.log(checkInvalidOrValid(answer));
        setIsInvalid(checkInvalidOrValid(answer));
      }
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };

  return (
    <div className="p-4 mx-auto w-[50%] min-w-[320px]">
      {isInvalid ? (
        // If invalid, display the "Access Denied" message and hide the input box
        <div className="flex items-center justify-center h-full w-full text-5xl text-red-600 font-bold">
          Access Denied
        </div>
      ) : (
        // Otherwise, show the chat input box
        <form className="relative rounded-lg bg-background p-4 m-2" onSubmit={handleSubmit}>
          <ChatInput
            placeholder="Why should we unblock this site..."
            className="min-h-12 resize-none rounded-lg bg-background border p-3 shadow-none focus-visible:ring-1"
            value={inputText}
            onChange={handleInputChange}
          />
          <div className="flex items-center p-3 pt-0 mt-4">
            <Button size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Chat;
