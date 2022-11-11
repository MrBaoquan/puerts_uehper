import { $ref } from "puerts";
import * as UE from "ue";
import ResourceManager from "../Core/ResourceManager";

import "../PuertsUEHper";
class TS_GameInstance extends UE.GameInstance {
    //@no-blueprint
    static GameInstance: TS_GameInstance;
    ReceiveInit(): void {
        new ResourceManager()["initialize"]();
        TS_GameInstance.GameInstance = this;
        console.warn(this.GetWorld().GetName());
        //ResourceManager.Initialize();
        // let _assets = UE.NewArray(UE.AssetData);
        // const _valid =
        //     UE.AssetRegistryHelpers.GetAssetRegistry().GetAssetsByPath(
        //         "/Game/ArtAssets",
        //         $ref(_assets)
        //     );
        // if (!_valid) {
        //     console.error("load asset failed!");
        // }

        // for (let _idx = 0; _idx < _assets.Num(); ++_idx) {
        //     console.log(_assets.Get(_idx).ObjectPath);
        //     console.log(_assets.Get(_idx).AssetClass);
        //     console.log(_assets.Get(_idx).AssetName);
        //     console.log(_assets.Get(_idx).PackageName);
        //     console.log(_assets.Get(_idx).PackagePath);
        //     console.warn("--------------");
        // }
        console.log("----------- UEHper Started -------------");
    }
    ReceiveShutdown(): void {}
}

export default TS_GameInstance;
