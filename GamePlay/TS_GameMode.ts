import * as UE from "ue";
import ResourceManager from "../Blueprints/ResourceManager";
import UIManager from "../Blueprints/UIManager";
import TS_GameInstance from "./TS_GameInstance";
import TS_UEHperEntry from "./TS_UEHperEntry";
class TS_GameMode extends UE.GameMode {
    private uiManager: UIManager;
    private resManger: ResourceManager;
    private uehperEntry: TS_UEHperEntry;
    Constructor(): void {
        console.log("[uehper]: TS_GameMode:Constructor");
        TS_GameInstance.World = this.GetWorld();

        this.uehperEntry = this.GetWorld().SpawnActor(
            UE.Class.Load(
                "/Game/Blueprints/TypeScript/puerts_uehper/GamePlay/TS_UEHperEntry.TS_UEHperEntry_C"
            ),
            undefined,
            UE.ESpawnActorCollisionHandlingMethod.Undefined,
            undefined,
            undefined
        );

        this.resManger = this.GetWorld().SpawnActor(
            UE.Class.Load(
                "/Game/Blueprints/TypeScript/puerts_uehper/Blueprints/ResourceManager.ResourceManager_C"
            ),
            undefined,
            UE.ESpawnActorCollisionHandlingMethod.Undefined,
            undefined,
            undefined
        ) as ResourceManager;
        this.resManger["initialize"]();

        this.uiManager = this.GetWorld().SpawnActor(
            UE.Class.Load(
                "/Game/Blueprints/TypeScript/puerts_uehper/Blueprints/UIManager.UIManager_C"
            ),
            undefined,
            UE.ESpawnActorCollisionHandlingMethod.Undefined,
            undefined,
            undefined
        ) as UIManager;
        this.uiManager["initialize"]();
    }

    ReceiveBeginPlay(): void {
        console.log("[uehper]: TS_GameMode BeginPlay");
        this.resManger.K2_AttachToActor(
            this.uehperEntry,
            null,
            UE.EAttachmentRule.KeepWorld,
            UE.EAttachmentRule.KeepWorld,
            UE.EAttachmentRule.KeepWorld,
            false
        );
        this.uiManager.K2_AttachToActor(
            this.uehperEntry,
            null,
            UE.EAttachmentRule.KeepWorld,
            UE.EAttachmentRule.KeepWorld,
            UE.EAttachmentRule.KeepWorld,
            false
        );
    }
}
export default TS_GameMode;
