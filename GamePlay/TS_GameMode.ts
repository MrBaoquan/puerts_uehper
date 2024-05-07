import * as UE from 'ue';

class TS_GameMode extends UE.GameMode {
    currentWorld: UE.World;

    Initialize(): void {
        this.GetWorld().SpawnActor(
            UE.Class.Load('/Game/Blueprints/TypeScript/puerts_uehper/GamePlay/TS_UEHperEntry.TS_UEHperEntry_C'),
            undefined,
            UE.ESpawnActorCollisionHandlingMethod.Undefined,
            undefined,
            undefined
        );
    }

    ReceiveBeginPlay(): void {
        console.log('[uehper]: TS_GameMode BeginPlay');
        this.GetWorld().SpawnActor(
            UE.Class.Load('/Game/Blueprints/TypeScript/puerts_uehper/GamePlay/TS_UEHperEntry.TS_UEHperEntry_C'),
            undefined,
            UE.ESpawnActorCollisionHandlingMethod.Undefined,
            undefined,
            undefined
        );
    }
}
export default TS_GameMode;
