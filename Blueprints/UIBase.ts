import * as UE from 'ue';
import TS_GameInstance from '../GamePlay/TS_GameInstance';
import TS_UIBase from './TS_UIBase';
class UIBase extends UE.Object {
    public Show(): UIBase {
        if (this.userWidget == null) {
            console.warn('userWidget is null');
            return this;
        }
        if (this.userWidget.IsInViewport()) return this;
        this.userWidget.AddToViewport();
        (this.userWidget as TS_UIBase).OnShow();
        return this;
    }

    public Hide(): UIBase {
        if (this.userWidget == null) {
            console.warn('userWidget is null');
            return this;
        }
        if (!this.userWidget.IsInViewport()) return this;
        this.userWidget.RemoveFromViewport();
        (this.userWidget as TS_UIBase).OnHide();
        return this;
    }

    public Entity<T>(): T {
        return this.userWidget as any;
    }

    public SetViewZOrder(zOrder: number): UIBase {
        this.userWidget.RemoveFromViewport();
        this.userWidget.AddToViewport(zOrder);
        return this;
    }

    widgetPath: string;
    userWidget: UE.UserWidget;
    // 这里的构造函数应交由UE引擎调用, 否则会被GC
    // Constructor() {
    //     console.warn("UI Constructor");
    // }

    loadUI_UMG(uiPath: string): void {
        this.widgetPath = uiPath;

        const world = TS_GameInstance.World;
        const player = UE.GameplayStatics.GetPlayerController(world, 0);
        this.userWidget = UE.WidgetBlueprintLibrary.Create(world, UE.Class.Load(this.widgetPath), player);
    }
}

export default UIBase;
