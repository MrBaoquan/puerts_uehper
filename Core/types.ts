interface ResConfig {
    [sceneName: string]: { type: string; path: string }[];
}

interface UIConfig {
    [sceneName: string]: {
        [uiKey: string]: { name?: string; asset?: string; path?: string };
    };
}

const startSceneName: string = "SceneEntry";

export { startSceneName, ResConfig, UIConfig };
