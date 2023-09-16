import * as UE from 'ue';

import { $ref } from 'puerts';
import resource from '../../resources';
import { ResConfig, startSceneName } from '../Core/types';
import { join } from 'path';
import { replace } from 'lodash';

class ResourceManager extends UE.Actor {
    //@no-blueprint
    public Get<T extends UE.Object>(name: string, type: UE.Class): T {
        const _resKey = this.generateAssetKey(name, type.GetName());
        const _resObj = this.assets.Get(_resKey);

        if (_resObj == null) {
            console.warn(`cannot find asset ${name}, resKey: ${_resKey}`);
            return null;
        }
        return _resObj as T;
    }

    assets: UE.TMap<string, UE.Object>;

    // 资源初始化
    private initialize(): void {
        // this.assets = UE.NewMap(UE.BuiltinString,)
        console.log('[uehper]: ResourceManager initialize');
        this.assets = UE.NewMap(UE.BuiltinString, UE.Object);

        let _resConfig: ResConfig = resource;
        //this.assets.Add(startSceneName, UE.NewMap(UE.BuiltinString, UE.Object));
        _resConfig[startSceneName].forEach((_config) => {
            let _assets = UE.NewArray(UE.AssetData);
            const _valid = UE.AssetRegistryHelpers.GetAssetRegistry().GetAssetsByPath(_config.path, $ref(_assets));
            if (!_valid) {
                console.error('load asset failed!');
            }
            for (let _idx = 0; _idx < _assets.Num(); ++_idx) {
                const _assetInfo = _assets.Get(_idx);

                let _assetClass = _assetInfo.AssetClass;
                if (_assetClass == 'None') {
                    _assetClass = _assetInfo.AssetClassPath.AssetName;
                }
                if (_assetClass != _config.type) continue;

                /**
                 * NOTE: _assetInfo.ObjectPath  UE5.2.1 打包后的值为undefined
                 *
                 * let _objectPath = _assetInfo.ObjectPath;
                 */
                let _objectPath = _assetInfo.PackagePath + '/' + _assetInfo.AssetName + '.' + _assetInfo.AssetName;
                var _texObject = UE.Object.Load(_objectPath);
                const _resKey = this.generateAssetKey(_assetInfo.AssetName, _assetClass);
                // console.warn(`add asset ${_resKey}`);
                this.assets.Add(_resKey, _texObject);
            }
        });
    }

    //@no-blueprint
    private generateAssetKey(name: string, type: string): string {
        return name + '_' + type;
    }

    ReceiveBeginPlay(): void {}

    ReceiveTick(DeltaSeconds: number): void {}
}

export default ResourceManager;
