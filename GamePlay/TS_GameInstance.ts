import * as UE from "ue";
import "../PuertsUEHper";
class TS_GameInstance extends UE.GameInstance {
    // @no-blueprint
    static World: UE.World;

    //@no-blueprint
    public static get PlayerController(): UE.PlayerController {
        return UE.GameplayStatics.GetPlayerController(this.World, 0);
    }

    ReceiveInit(): void {
        console.log("[uehper]: TS_GameInstance Init");
    }
    ReceiveShutdown(): void {
        console.log("[uehper]: TS_GameInstance Shutdown");
    }
}

export default TS_GameInstance;
