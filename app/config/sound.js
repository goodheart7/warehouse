import Sound from "react-native-sound";
import beep from "../assets/beep.mp3";

// Prepare the beep sound
Sound.setCategory("Playback");

export default new Sound(beep);
