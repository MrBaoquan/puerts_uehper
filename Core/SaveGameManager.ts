import { Class, GameplayStatics, SaveGame } from "ue";

class SaveGameManager {
    public static CreateSaveGameObject(saveGameClass: Class): Class {
        return GameplayStatics.CreateSaveGameObject(
            saveGameClass
        ) as unknown as Class;
    }

    public static DoesSaveGameExists(
        slotName: string,
        userIndex: number = 0
    ): boolean {
        return GameplayStatics.DoesSaveGameExist(slotName, userIndex);
    }

    public static LoadGame<T extends SaveGame>(
        slotName: string,
        userIndex = 0
    ): T {
        return GameplayStatics.LoadGameFromSlot(slotName, userIndex) as T;
    }

    public static SaveGame(
        saveGameObject: SaveGame,
        slotName: string,
        userIndex: number = 0
    ): boolean {
        return GameplayStatics.SaveGameToSlot(
            saveGameObject,
            slotName,
            userIndex
        );
    }
}

export default SaveGameManager;
