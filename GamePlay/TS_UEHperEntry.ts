import * as UE from 'ue';
import UIManager from '../Blueprints/UIManager';
import ResourceManager from '../Blueprints/ResourceManager';
import { interval, lastValueFrom, takeWhile } from 'rxjs';

class TS_UEHperEntry extends UE.Actor {
    // @no-blueprint
    static Instance: TS_UEHperEntry;

    public uiManager: UIManager;
    public resManger: ResourceManager;
    public uehperEntry: TS_UEHperEntry;
    public currentWorld: UE.World;

    public isFrameworkInitialized: boolean;

    // @no-blueprint
    public WaitUntilFrameworkInitialized(): Promise<Number | void> {
        return lastValueFrom(interval(10).pipe(takeWhile(() => this.isFrameworkInitialized != true)));
    }

    private initialize(): void {
        this.currentWorld = this.GetWorld();

        this.resManger = this.GetWorld().SpawnActor(
            UE.Class.Load('/Game/Blueprints/TypeScript/puerts_uehper/Blueprints/ResourceManager.ResourceManager_C'),
            undefined,
            UE.ESpawnActorCollisionHandlingMethod.Undefined,
            undefined,
            undefined
        ) as ResourceManager;
        this.resManger['initialize']();

        this.uiManager = this.GetWorld().SpawnActor(
            UE.Class.Load('/Game/Blueprints/TypeScript/puerts_uehper/Blueprints/UIManager.UIManager_C'),
            undefined,
            UE.ESpawnActorCollisionHandlingMethod.Undefined,
            undefined,
            undefined
        ) as UIManager;
        this.uiManager['initialize']();
    }

    ReceiveBeginPlay(): void {
        console.log('[uehper]: UEHperEntry BeginPlay');

        TS_UEHperEntry.Instance = this;

        this.initialize();
        this.resManger.K2_AttachToActor(
            this.uehperEntry,
            null,
            UE.EAttachmentRule.KeepWorld,
            UE.EAttachmentRule.KeepWorld,
            UE.EAttachmentRule.KeepWorld,
            false
        );
        this.uiManager.K2_AttachToActor(
            this,
            null,
            UE.EAttachmentRule.KeepWorld,
            UE.EAttachmentRule.KeepWorld,
            UE.EAttachmentRule.KeepWorld,
            false
        );

        this.isFrameworkInitialized = true;
    }
}

export default TS_UEHperEntry;
