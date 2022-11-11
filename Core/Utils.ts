import { timer, lastValueFrom } from "rxjs";
import * as UE from "ue";

const delayTime = async (duration: number): Promise<0> => {
    return lastValueFrom(timer(duration));
};

const toJSArray = <T>(array: UE.TArray<T>) => {
    let _array = [];
    for (let _index = 0; _index < array.Num(); ++_index) {
        _array.push(array.Get(_index));
    }
    return _array;
};

const toUEArray = <T extends UE.SupportedContainerKVType>(
    array: Array<UE.ContainerKVType<T>>,
    type: UE.ContainerKVType<T>
): UE.TArray<UE.ContainerKVType<T>> => {
    var _array = UE.NewArray(type);
    array.forEach((_item) => {
        _array.Add(_item);
    });
    return _array;
};

export { delayTime, toJSArray, toUEArray };
