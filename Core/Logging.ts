import * as UE from "ue";
class Logger {
    public static Info(message: string) {
        UE.KismetSystemLibrary.PrintString(
            null,
            message,
            true,
            true,
            new UE.LinearColor(1, 1, 1, 1),
            5.0
        );
    }

    public static Warning(message: string) {
        UE.KismetSystemLibrary.PrintString(
            null,
            message,
            true,
            true,
            new UE.LinearColor(1, 1, 0, 1)
        );
    }

    public static Error(message: string) {
        UE.KismetSystemLibrary.PrintString(
            null,
            message,
            true,
            true,
            new UE.LinearColor(1, 0, 0, 1)
        );
    }
}

export default Logger;
