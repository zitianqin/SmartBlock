import { BlockElement } from "./components/blockElement";

function Settings() {
  return (
    <div className="flex flex-col h-[100dvh] w-full">
      <div className="flex flex-row justify-center text-4xl font-bold text-black m-4">
        Block List
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <BlockElement websiteName="Random Website Name 1" />
          <BlockElement websiteName="Random Website Name 2" />
        </div>
      </div>
    </div>
  );
}

export default Settings;
