import uis from '../../uis';
import { startSceneName, UIConfig } from '../Core/types';
import UIBase from './UIBase';
import * as UE from 'ue';
import { info } from '../Core/Utils';

/**
 * UI设计思想:
 * 1. UIBase作为UI的载体, 其用于兼容UMG及后续其他的UI框架
 * 2. UIManager作为UI的管理器
 */

class UIManager extends UE.Actor {
    //@no-blueprint
    public Show<T extends UIBase>(uiKey: string): T {
        let _uiObject = this.allUIs.Get(uiKey);
        if (_uiObject == null) {
            console.warn(`UI ${uiKey} not exists`);
            return;
        }
        _uiObject.Show();
        return _uiObject as T;
    }

    //@no-blueprint
    public Hide(uiKey: string): void {
        let _uiObject = this.allUIs.Get(uiKey);
        if (_uiObject == null) {
            console.warn(`UI ${uiKey} not exists`);
            return;
        }
        _uiObject.Hide();
    }

    //@no-blueprint
    public Get<T extends UIBase>(uiKey: string): T {
        const _uiObject = this.allUIs.Get(uiKey);
        if (_uiObject == null) {
            console.warn(`UI ${uiKey} not exists`);
            return;
        }
        return _uiObject as T;
    }

    //@no-blueprint
    // public GetUMGWidget<T extends UE.UserWidget>(uiKey: string): T {
    //     const _uiObject = this.allUIs.Get(uiKey);
    //     if (_uiObject == null) {
    //         console.warn(`UI ${uiKey} not exists`);
    //         return;
    //     }
    //     return _uiObject.userWidget as T;
    // }

    public allUIs: UE.TMap<string, UIBase>;
    // TODO: 上述TMap经测试好像不能维持UI对象的引用，一段时间后会被GC，用TArray好像没有这个问题，等待后续测试
    public allUIList: UE.TArray<UIBase>;

    private initialize(): void {
        this.allUIs = UE.NewMap(UE.BuiltinString, UIBase);
        this.allUIList = UE.NewArray(UIBase);

        const _uiConfig: UIConfig = uis;
        const _sceneUIs = _uiConfig[startSceneName];

        Object.keys(_sceneUIs).forEach((_uiKey) => {
            const _newUIObject: UIBase = UE.NewObject(
                UE.Class.Load(`/Game/Blueprints/TypeScript/puerts_uehper/Blueprints/UIBase.UIBase_C`)
            ) as UIBase;

            _newUIObject.loadUI_UMG(`/Game/Blueprints/UI/${_uiKey}.${_uiKey}_C`);

            this.allUIs.Add(_uiKey, _newUIObject);
            this.allUIList.Add(_newUIObject);
        });
    }

    ReceiveBeginPlay(): void {}

    ReceiveTick(DeltaSeconds: number): void {
        // info(this.allUIs.Get('GameUI').GetName());
        // info(this.allUIArray[0].GetName());
    }

    spawnUI(): void {}
}

export default UIManager;
