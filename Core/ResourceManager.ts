import * as UE from "ue";

import { singleton } from "ts-singleton";
import { $ref } from "puerts";

interface ResConfig {
    [sceneName: string]: { type: string; path: string }[];
}
const startSceneName: string = "SceneEntry";

@singleton
class ResourceManager {
    public Get<T extends UE.Object>(name: string, type: UE.Class): T {
        const _resKey = this.generateAssetKey(name, type.GetName());
        const _sceneAssets = this.assets.get(startSceneName);
        if (!_sceneAssets.has(_resKey)) {
            console.warn("there is no asset named " + _resKey);
            return null;
        }
        return _sceneAssets.get(_resKey) as T;
    }

    private assets: Map<string, Map<string, UE.Object>>;
    private initialize(): void {
        this.assets = new Map<string, Map<string, UE.Object>>();

        var _resConfig: ResConfig = JSON.parse(
            UE.UEHper_BPF.LoadFileToString(
                UE.KismetSystemLibrary.GetProjectContentDirectory() +
                    "UEHper/resource.json"
            )
        );
        this.assets.set(startSceneName, new Map<string, UE.Object>());
        _resConfig[startSceneName].forEach((_config) => {
            console.log(_config.path);
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

                var _texObject = UE.UEHper_BPF.LoadObjectByPath(
                    UE.UEHper_BPF.LoadClassByName(_assetInfo.AssetClass),
                    _assetInfo.ObjectPath
                );
                this.assets
                    .get("SceneEntry")
                    .set(
                        this.generateAssetKey(
                            _assetInfo.AssetName,
                            _assetInfo.AssetClass
                        ),
                        _texObject
                    );
            }
        });
        console.log("ResourceManager initialized...");
    }

    private generateAssetKey(name: string, type: string): string {
        return name + "_" + type;
    }
}

export default ResourceManager;
