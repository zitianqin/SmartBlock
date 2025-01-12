import Chat from "@/components/Chat";

const BlockedSite = () => {
  return (
    <div className="flex flex-col h-[100dvh] justify-center w-full">
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-center m-2">
          <p className="text-6xl font-bold text-black">Blocked.</p>
        </div>
        <Chat />
      </div>
    </div>
  );
};

export default BlockedSite;
