import { BindAction, IOToolkit_BPF, World } from "ue";
import IODevice from "./IODevice";

class IODeviceController {
    public static Load(): void {
        IOToolkit_BPF.IO_Load();
    }

    public static Update(): void {
        IOToolkit_BPF.IO_Update();
    }

    public static Unload() {
        IOToolkit_BPF.IO_Unload();
    }

    public static GetIODevice(deviceName: string): IODevice {
        return new IODevice(deviceName);
    }
}

export default IODeviceController;
