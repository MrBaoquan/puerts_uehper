import * as UE from "ue";

import { $ref } from "puerts";
import resource from "../../resources";
import { ResConfig, startSceneName } from "./types";

class ResourceManager extends UE.Actor {
    //@no-blueprint
    public Get<T extends UE.Object>(name: string, type: UE.Class): T {
        const _resKey = this.generateAssetKey(name, type.GetName());
        return this.assets.Get(_resKey) as T;
    }

    assets: UE.TMap<string, UE.Object>;

    // 资源初始化
    private initialize(): void {
        //   this.assets = UE.NewMap(UE.BuiltinString,)
        console.log("ResourceManager:initialize");
        this.assets = UE.NewMap(UE.BuiltinString, UE.Object);
        let _resConfig: ResConfig = resource;
        //this.assets.Add(startSceneName, UE.NewMap(UE.BuiltinString, UE.Object));
        _resConfig[startSceneName].forEach((_config) => {
            let _assets = UE.NewArray(UE.AssetData);
            const _valid =
                UE.AssetRegistryHelpers.GetAssetRegistry().GetAssetsByPath(
                    _config.path,
                    $ref(_assets)
                );
            if (!_valid) {
                console.error("load asset failed!");
            }
            for (let _idx = 0; _idx < _assets.Num(); ++_idx) {
                const _assetInfo = _assets.Get(_idx);
                if (_assetInfo.AssetClass != _config.type) continue;

                var _texObject = UE.Object.Load(_assetInfo.ObjectPath);
                this.assets.Add(
                    this.generateAssetKey(
                        _assetInfo.AssetName,
                        _assetInfo.AssetClass
                    ),
                    _texObject
                );
            }
        });
    }

    //@no-blueprint
    private generateAssetKey(name: string, type: string): string {
        return name + "_" + type;
    }
}

export default ResourceManager;
