import * as UE from 'ue';
import '../PuertsUEHper';
class TS_GameInstance extends UE.GameInstance {
    // @no-blueprint
    //static World: UE.World;

    ReceiveInit(): void {
        console.log('[uehper]: TS_GameInstance Init');
    }
    ReceiveShutdown(): void {
        console.log('[uehper]: TS_GameInstance Shutdown');
    }
}

export default TS_GameInstance;
