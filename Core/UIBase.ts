import * as UE from "ue";
import TS_GameInstance from "../GamePlay/TS_GameInstance";
import TS_UIBase from "./TS_UIBase";
class UIBase extends UE.Object {
    public Show(): void {
        if (this.userWidget == null) {
            console.warn("userWidget is null");
        }
        if (this.userWidget.IsInViewport()) return;
        this.userWidget.AddToViewport();
        (this.userWidget as TS_UIBase).OnShow();
    }

    public Hide(): void {
        if (!this.userWidget.IsInViewport()) return;
        this.userWidget.RemoveFromViewport();
        (this.userWidget as TS_UIBase).OnHide();
    }

    widgetPath: string;
    userWidget: UE.UserWidget;
    Constructor() {
        console.warn("UI Constructor");
    }

    loadUI_UMG(uiPath: string): void {
        this.widgetPath = uiPath;

        const world = TS_GameInstance.World;
        const player = UE.GameplayStatics.GetPlayerController(world, 0);
        this.userWidget = UE.WidgetBlueprintLibrary.Create(
            world,
            UE.Class.Load(this.widgetPath),
            player
        );
    }
}

export default UIBase;
