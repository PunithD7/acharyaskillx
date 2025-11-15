// src/lib/agora.js
import AgoraRTC from "agora-rtc-sdk-ng";

let client;
let localTracks = {
  videoTrack: null,
  audioTrack: null,
};

export async function initAgora(appId, channelName, token, uid, onUserJoined, onUserLeft) {
  client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  await client.join(appId, channelName, token || null, uid || null);

  client.on("user-published", async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    if (mediaType === "video") {
      const remoteContainer = document.getElementById("remote-video");
      const remoteVideo = document.createElement("div");
      remoteVideo.id = user.uid;
      remoteContainer.appendChild(remoteVideo);
      user.videoTrack.play(remoteVideo);
    }
    if (mediaType === "audio") {
      user.audioTrack.play();
    }
    onUserJoined && onUserJoined(user);
  });

  client.on("user-left", (user) => {
    document.getElementById(user.uid)?.remove();
    onUserLeft && onUserLeft(user);
  });

  return client;
}

export async function startLocalTracks() {
  localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();
  const localContainer = document.getElementById("local-video");
  localTracks.videoTrack.play(localContainer);
}

export async function publishTracks() {
  if (client && localTracks.videoTrack && localTracks.audioTrack) {
    await client.publish(Object.values(localTracks));
  }
}

export async function leaveCall() {
  if (localTracks.videoTrack) localTracks.videoTrack.close();
  if (localTracks.audioTrack) localTracks.audioTrack.close();
  if (client) await client.leave();
  document.getElementById("remote-video").innerHTML = "";
}
