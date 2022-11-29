import { $ref } from "puerts";
import * as UE from "ue";

declare module "ue" {
    interface Object {
        /**
         * 添加组件
         */
        CreateDefaultSubobjectGeneric<T extends UE.Object>(
            SubobjectFName: string,
            ReturnType: UE.Class
        ): T;
    }

    interface Actor {
        /**
         * Get child actor in scene
         * @param name Child actor name
         */
        GetChild<T extends UE.Actor>(ActorName: string): T;
        GetAll(): UE.TArray<UE.Actor>;
        SetActorHiddenInGameWithChildren(NewHidden: boolean): void;
    }

    /**
     * 获取组件下的子组件
     */
    interface SceneComponent {
        Get<T extends UE.SceneComponent>(Path: string): T;
    }

    interface World {
        FindActorByName<T extends UE.Actor>(
            ActorName: string,
            ActorClass: UE.Class
        ): T;
    }
}

UE.Object.prototype.CreateDefaultSubobjectGeneric =
    function CreateDefaultSubobjectGeneric<T extends UE.Object>(
        SubobjectFName: string,
        ReturnType: UE.Class
    ): T {
        return this.CreateDefaultSubobject(
            SubobjectFName,
            ReturnType,
            ReturnType,
            /*bIsRequired =*/ true,
            /*bIsAbstract =*/ false,
            /*bTransient =*/ false
        ) as T;
    };

UE.SceneComponent.prototype.Get = function Get<T extends UE.SceneComponent>(
    path: string
): T {
    const nodes = path.split("/").reverse();
    let node = nodes.pop();
    let _rootNode: UE.SceneComponent = this;

    while (node) {
        let _childs = UE.NewArray(UE.SceneComponent); // $ref(new UE.TArray<UE.SceneComponent>());
        _rootNode.GetChildrenComponents(false, $ref(_childs));
        const childNodes = _childs;
        for (let _index = 0; _index < childNodes.Num(); ++_index) {
            const _curNode = childNodes.Get(_index);
            if (_curNode.GetName() == node) {
                _rootNode = _curNode;
                break;
            }
        }
        node = nodes.pop();
    }
    return _rootNode == this ? undefined : (_rootNode as T);
};

UE.Actor.prototype.GetAll = function GetAll(): UE.TArray<UE.Actor> {
    let _childs = UE.NewArray(UE.Actor);
    this.GetAttachedActors($ref(_childs), true);
    return _childs;
};

UE.Actor.prototype.GetChild = function GetChild<T extends UE.Actor>(
    ActorName: string
): T {
    let _childs = UE.NewArray(UE.Actor);
    this.GetAttachedActors($ref(_childs), true);
    for (let _index = 0; _index < _childs.Num(); ++_index) {
        const _actor = _childs.Get(_index);
        const _realName = UE.KismetSystemLibrary.GetDisplayName(_actor);
        if (_realName == ActorName) return _actor as T;
    }
    return undefined;
};

UE.Actor.prototype.SetActorHiddenInGameWithChildren = function (
    NewHidden: boolean
): void {
    this.SetActorHiddenInGame(NewHidden);
    const _children = this.GetAll();
    for (let _idx = 0; _idx < _children.Num(); ++_idx) {
        const _actor = _children.Get(_idx);
        _actor.SetActorHiddenInGame(NewHidden);
    }
};

UE.World.prototype.FindActorByName = function FindActorByName<
    T extends UE.Actor
>(ActorName: string, ActorClass: UE.Class): T {
    let _childs = UE.NewArray(UE.Actor);
    UE.GameplayStatics.GetAllActorsOfClass(this, ActorClass, $ref(_childs));

    for (let _index = 0; _index < _childs.Num(); ++_index) {
        const _actor = _childs.Get(_index);
        const _realName = UE.KismetSystemLibrary.GetDisplayName(_actor);
        if (_realName == ActorName) return _actor as T;
    }
    return undefined;
};
