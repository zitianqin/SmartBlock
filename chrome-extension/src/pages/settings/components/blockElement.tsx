import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

interface BlockElementProps {
  websiteName: string; // Pass website name as a prop
}

export const BlockElement = ({ websiteName }: BlockElementProps) => {
  return (
    <div className="flex flex-row items-center justify-between p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-50 w-[300px] my-2">
      {/* Website Name */}
      <div
        className="text-base font-medium text-gray-800 mx-5 truncate w-[200px]"
        title={websiteName} // Show full name on hover
      >
        {websiteName}
      </div>

      {/* Trash Button */}
      <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
        <Trash2 />
      </Button>
    </div>
  );
};
