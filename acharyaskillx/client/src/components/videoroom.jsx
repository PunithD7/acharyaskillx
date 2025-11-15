// src/pages/VideoRoom.jsx
import React, { useEffect, useState } from "react";
import { initAgora, startLocalTracks, publishTracks, leaveCall } from "@/lib/agora";
import { Button } from "@/components/ui/button";

export default function VideoRoom({ appId, channelName, token, onEnd }) {
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const joinAgora = async () => {
      await initAgora(appId, channelName, token, null);
      await startLocalTracks();
      await publishTracks();
      setJoined(true);
    };
    joinAgora();

    return () => {
      leaveCall();
    };
  }, []);

  return (
    <div className="w-full h-[80vh] flex flex-col bg-gray-900 text-white rounded-lg overflow-hidden">
      <div className="flex-1 flex relative">
        <div id="local-video" className="w-1/2 h-full border-r border-gray-700"></div>
        <div id="remote-video" className="w-1/2 h-full"></div>
      </div>
      <div className="flex justify-center space-x-4 p-4 bg-gray-800">
        <Button variant="destructive" onClick={onEnd}>
          Leave Interview
        </Button>
      </div>
    </div>
  );
}
