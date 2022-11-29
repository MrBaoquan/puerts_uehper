import * as UE from "ue";
import TS_GameInstance from "./GamePlay/TS_GameInstance";
class UEHelpers {
    public static DisableScreenMessages() {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
            TS_GameInstance.World,
            "DisableAllScreenMessages"
        );
    }

    public static EnableScreenMessages() {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
            TS_GameInstance.World,
            "EnableAllScreenMessages"
        );
    }
}

export default UEHelpers;
