import { World } from "ue";
import ResourceManager from "./ResourceManager";

class Managements {
    public static get Resource(): ResourceManager {
        return new ResourceManager();
    }
}
export default Managements;
