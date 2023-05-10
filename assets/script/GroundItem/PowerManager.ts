import {
  _decorator,
  Component,
  instantiate,
  JsonAsset,
  Node,
  Prefab,
  Vec3,
} from "cc";
import { PowerBox } from "./PowerBox";
import { PowerBoxManager } from "../Managers/PowerBoxManager";
const { ccclass, property } = _decorator;

@ccclass("PowerManager")
export class PowerManager extends Component {
  @property({ type: JsonAsset })
  PowerSetterJson: JsonAsset = null;
  @property({ type: Prefab })
  PowerPrefab: Prefab = null;
  PowerBoxMng: PowerBoxManager = null;
  start() {
    this.PowerBoxMng = PowerBoxManager.getInstance();
    let GroundElements: any = this.PowerSetterJson.json;
    let ElementLength = GroundElements.length;
    for (let element = 0; element < ElementLength; element++) {
      this.PowerBoxMng.JsonPositionArray.push(
        this.PowerSetterJson.json[element]
      );
      this.PowerBoxMng.JsonPositionArray[element].placed = true;
      let powerNode = instantiate(this.PowerPrefab);
      powerNode.getComponent(PowerBox).PositionTrack = element;
      this.node.addChild(powerNode);
      powerNode.setPosition(this.PowerSetterJson.json[element].pos as Vec3);
    }
  }
  retrivePowerBox() {
    for (
      let element = 0;
      element < this.PowerBoxMng.JsonPositionArray.length;
      element++
    ) {
      if (this.PowerBoxMng.JsonPositionArray[element].placed == false) {
        this.PowerBoxMng.JsonPositionArray[element].placed = true;
        setTimeout(() => {
          let powerNode = instantiate(this.PowerPrefab);
          powerNode.getComponent(PowerBox).PositionTrack = element;
          this.node.addChild(powerNode);
          powerNode.setPosition(
            this.PowerBoxMng.JsonPositionArray[element].pos as Vec3
          );
        }, 6000);
      }
    }
  }
  update(deltaTime: number) {
    this.node.children.forEach((Element) => {
      let angle = Element.eulerAngles;
      Element.eulerAngles = new Vec3(angle.x, angle.y + 5, angle.z);
    });
    this.retrivePowerBox();
  }
}
