import { useState, useEffect } from "react";
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
  const [blockedSite, setBlockedSite] = useState("");

  useEffect(() => {
    // Get current tab ID and its blocked URL
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab.id) {
        chrome.storage.local.get([`blocked_url_${tab.id}`], (result) => {
          const blockedUrl = result[`blocked_url_${tab.id}`];
          setBlockedSite(blockedUrl || "");
        });
      }
    });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("input:", inputText);

    // Show loading bar
    setIsLoading(true);

    try {
      const answer = await generateResponse(inputText, blockedSite);
      console.log("output:");
      console.log(answer);

      if (checkValidity(answer)) {
        const isInvalidResponse = checkInvalidOrValid(answer);
        setIsInvalid(isInvalidResponse);

        console.log("Is invalid response:", isInvalidResponse);
        console.log("Blocked site:", blockedSite);

        if (!isInvalidResponse && blockedSite) {
          console.log("Unblocking site:", blockedSite);

          // Store the temporary unblock with expiry time
          const expiryTime = Date.now() + 60 * 60 * 1000; // Current time + 1 hour
          await chrome.storage.local.set({
            [`temp_unblock_${new URL(blockedSite).hostname}`]: expiryTime,
          });

          // Redirect to the original site
          window.location.href = blockedSite;
        }
      }
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: any) => {
    setInputText(e.target.value);
  };

  return (
    <div className="p-4 mx-auto w-[50%] min-w-[320px]">
      {isInvalid ? (
        <div className="text-center text-5xl text-red-600 font-bold">
          Access Denied
        </div>
      ) : (
        <form
          className="relative rounded-lg bg-background p-4 m-2"
          onSubmit={handleSubmit}
        >
          <ChatInput
            placeholder="Why should we unblock this site..."
            className="min-h-12 resize-none rounded-lg bg-background border p-3 shadow-none focus-visible:ring-1"
            value={inputText}
            onChange={handleInputChange}
          />
          {isLoading && (
            <div className="mt-4">
              <Spinner size="small" show={true} />
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
