import uis from "../../uis";
import { startSceneName, UIConfig } from "./types";
import UIBase from "./UIBase";
import * as UE from "ue";

class UIManager extends UE.Actor {
    //@no-blueprint
    public Show<T extends UE.UserWidget>(uiKey: string): T {
        this.allUIs.Get(uiKey).Show();
        return this.allUIs.Get(uiKey).userWidget as T;
    }

    //@no-blueprint
    public Hide(uiKey: string): void {
        this.allUIs.Get(uiKey).Hide();
    }

    //@no-blueprint
    public Get<T extends UE.UserWidget>(uiKey: string): T {
        const _uiObject = this.allUIs.Get(uiKey);
        if (_uiObject == null) {
            console.warn(`UI ${uiKey} not exists`);
            return;
        }
        return _uiObject.userWidget as T;
    }

    private allUIs: UE.TMap<string, UIBase>;

    private initialize(): void {
        this.allUIs = UE.NewMap(UE.BuiltinString, UIBase);
        const _uiConfig: UIConfig = uis;
        const _sceneUIs = _uiConfig[startSceneName];

        Object.keys(_sceneUIs).forEach((_uiKey) => {
            const _newUIObject: UIBase = UE.NewObject(
                UE.Class.Load(
                    `/Game/Blueprints/TypeScript/puerts_uehper/Core/UIBase.UIBase_C`
                )
            ) as UIBase;

            _newUIObject.loadUI_UMG(
                `/Game/Blueprints/UI/${_uiKey}.${_uiKey}_C`
            );
            this.allUIs.Add(_uiKey, _newUIObject);
        });
    }

    Constructor() {
        console.log("UIManager:constructor");
    }

    ReceiveBeginPlay(): void {}

    spawnUI(): void {}
}

export default UIManager;
