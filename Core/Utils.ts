import { timer, lastValueFrom } from 'rxjs';
import * as UE from 'ue';
import Managements from './Managements';

const delayTime = async (duration: number): Promise<0> => {
    return lastValueFrom(timer(duration));
};

const toJSArray = <T>(array: UE.TArray<T>) => {
    let _array = [];
    for (let _index = 0; _index < array.Num(); ++_index) {
        _array.push(array.Get(_index));
    }
    return _array as Array<T>;
};

const toJSMap = <T>(map: UE.TMap<string, T>) => {
    let _map = new Map<string, T>();
    for (let _index = 0; _index < map.Num(); ++_index) {
        const _key = map.GetKey(_index);
        const _value = map.Get(_key);
        _map.set(_key, _value);
    }
    return _map;
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

const info = (message: string) => {
    UE.KismetSystemLibrary.PrintString(null, message, true, true, new UE.LinearColor(1, 1, 1, 1), 5.0);
};

export { delayTime, toJSArray, toJSMap, toUEArray, info };
