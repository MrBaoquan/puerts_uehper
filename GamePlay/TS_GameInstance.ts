import { GameInstance } from "ue";
import IODeviceController from "../TS_UEHper/IOToolkit/IODeviceController";

class TS_GameInstance extends GameInstance {
    ReceiveInit(): void {}

    ReceiveShutdown(): void {}
}

export default TS_GameInstance;
