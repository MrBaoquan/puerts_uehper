import * as UE from "ue";
import TS_GameInstance from "../GamePlay/TS_GameInstance";
import TS_GameMode from "../GamePlay/TS_GameMode";
import ResourceManager from "./ResourceManager";
import UIManager from "./UIManager";

class Managements {
    public static get Resource(): ResourceManager {
        return (
            UE.GameplayStatics.GetGameMode(TS_GameInstance.World) as TS_GameMode
        )["resManger"];
    }

    public static get UI(): UIManager {
        return (
            UE.GameplayStatics.GetGameMode(TS_GameInstance.World) as TS_GameMode
        )["uiManager"];
    }
}
export default Managements;
