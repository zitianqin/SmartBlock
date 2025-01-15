import { useState } from "react";
import { ChatInput } from "./ui/chat/chat-input";
import { Button } from "./ui/button";
import { CornerDownLeft } from "lucide-react";
import { generateResponse } from "../ai/ai";
import { Spinner } from "./ui/spinner";

function checkValidity(response: string): boolean {
  const lowerCaseResponse = response.toLowerCase().replace(/\.$/, "");
  const regex = /\b(valid|invalid)\b/;
  return regex.test(lowerCaseResponse);
}

function checkInvalidOrValid(response: string): boolean {
  const lowerCaseResponse = response.toLowerCase().replace(/\.$/, "");
  const regex = /\binvalid\b/;
  return regex.test(lowerCaseResponse);
}

const Chat = () => {
  const [inputText, setInputText] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleInputChange = (e: any) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("input:", inputText);

    // Show loading bar
    setIsLoading(true);

    try {
      const answer = await generateResponse(inputText);
      console.log("output:");
      console.log(answer);

      if (checkValidity(answer)) {
        setIsInvalid(checkInvalidOrValid(answer));
      }
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      // Hide loading bar after response
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 mx-auto w-[50%] min-w-[320px]">
      {isInvalid ? (
        <div className="text-center text-5xl text-red-600 font-bold">
          Access Denied
        </div>
      ) : (
        <form className="relative rounded-lg bg-background p-4 m-2" onSubmit={handleSubmit}>
          <ChatInput
            placeholder="Why should we unblock this site..."
            className="min-h-12 resize-none rounded-lg bg-background border p-3 shadow-none focus-visible:ring-1"
            value={inputText}
            onChange={handleInputChange}
          />
          {isLoading && (
            <div className="mt-4">
              <Spinner size="small" show={true}/>
            </div>
          )}
          <div className="flex items-center p-3 pt-0 mt-4">
            <Button size="sm" className="ml-auto gap-1.5" disabled={isLoading}>
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
