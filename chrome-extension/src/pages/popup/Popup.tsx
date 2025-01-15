import { useState } from "react";
import { Button } from "./components/ui/button";
import icon from "../../../public/images/extensions-page/icon.png";

function Popup() {
  // State to track if the page is blocked or not
  const [isBlocked, setIsBlocked] = useState(false);

  // Toggle function to change the button text and action
  const handleButtonClick = () => {
    setIsBlocked(!isBlocked); // Toggle the state between blocked and unblocked
  };

  // Handler to navigate to the Settings page
  const handleEditBlockList = () => {
    const settingsUrl = chrome.runtime.getURL("src/pages/settings/index.html");
    chrome.tabs.create({ url: settingsUrl });
  };

  return (
    <div className="w-[300px] h-[500px] flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center mb-5">
        <img src={icon} alt="logo" className="w-10 h-10" />
        <p className="text-2xl font-bold mx-2">SmartBlock</p>
      </div>

      {/* Button text changes based on isBlocked state */}
      <Button
        className="m-4"
        variant={isBlocked ? "outline" : "destructive"} // Changes the button variant
        onClick={handleButtonClick}
      >
        {isBlocked ? "Unblock this page" : "Block this page"} {/* Button text */}
      </Button>

      <Button className="m-4" variant="outline" onClick={handleEditBlockList}>
        Edit blocked list
      </Button>
    </div>
  );
}

export default Popup;
