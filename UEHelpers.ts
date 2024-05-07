import * as UE from 'ue';
import TS_GameInstance from './GamePlay/TS_GameInstance';
import Managements from './Core/Managements';
class UEHelpers {
    public static DisableScreenMessages() {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(Managements.World, 'DisableAllScreenMessages');
    }

    public static EnableScreenMessages() {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(Managements.World, 'EnableAllScreenMessages');
    }

    public static ExecuteConsoleCommand(command: string) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(Managements.World, command);
    }
}

export default UEHelpers;
