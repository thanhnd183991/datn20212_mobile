import { Audio } from "expo-av";

export const startRecording = async (setRecording) => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    console.log("Starting recording..");
    const { recording } = await Audio.Recording.createAsync(
      Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
    );
    setRecording(recording);
    console.log("Recording started");
  } catch (err) {
    console.error("Failed to start recording", err);
  }
};

export const stopRecording = async (setRecording, setSoundURI) => {
  console.log("Stopping recording..");
  if (!recording) {
    return;
  }

  setRecording(null);
  await recording.stopAndUnloadAsync();
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
  });

  const uri = recording.getURI();
  console.log("Recording stopped and stored at", uri);
  if (!uri) {
    return;
  }
  setSoundURI(uri);
};
