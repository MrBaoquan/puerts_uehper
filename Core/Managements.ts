import * as UE from 'ue';
import TS_GameInstance from '../GamePlay/TS_GameInstance';
import TS_GameMode from '../GamePlay/TS_GameMode';
import ResourceManager from '../Blueprints/ResourceManager';
import UIManager from '../Blueprints/UIManager';
import TS_UEHperEntry from '../GamePlay/TS_UEHperEntry';
import { catchError, filter, firstValueFrom, interval, lastValueFrom, of, takeWhile } from 'rxjs';

class Managements {
    public static get World(): UE.World {
        return TS_UEHperEntry.Instance.currentWorld;
    }

    public static get Resource(): ResourceManager {
        return TS_UEHperEntry.Instance.resManger;
    }

    public static get UI(): UIManager {
        return TS_UEHperEntry.Instance.uiManager;
    }

    public static PlayerController<T>(): T {
        return UE.GameplayStatics.GetPlayerController(this.World, 0) as unknown as T;
    }

    public static FrameWorkInitializedAsObservable() {
        return firstValueFrom(
            interval(10).pipe(
                filter(() => TS_UEHperEntry.Instance != null && TS_UEHperEntry.Instance.isFrameworkInitialized == true),
                catchError((err) => of(-1))
            )
        );
    }
}
export default Managements;
