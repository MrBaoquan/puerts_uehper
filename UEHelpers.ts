import * as UE from "ue";
import TS_GameInstance from "./GamePlay/TS_GameInstance";
class UEHelpers {
    public static DisableScreenMessages() {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
            TS_GameInstance.GameInstance.GetWorld(),
            "DisableAllScreenMessages"
        );
    }

    public static EnableScreenMessages() {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
            TS_GameInstance.GameInstance.GetWorld(),
            "EnableAllScreenMessages"
        );
    }
}

export default UEHelpers;
