import {
  _decorator,
  Component,
  instantiate,
  JsonAsset,
  Node,
  Prefab,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("PowerManager")
export class PowerManager extends Component {
  @property({ type: JsonAsset })
  PowerSetterJson: JsonAsset = null;
  @property({ type: Prefab })
  PowerPrefab: Prefab = null;
  start() {
    let GroundElements: any = this.PowerSetterJson.json;
    let ElementLength = GroundElements.length;
    for (let element = 0; element < ElementLength; element++) {
      let powerNode = instantiate(this.PowerPrefab);
      this.node.addChild(powerNode);
      powerNode.setPosition(this.PowerSetterJson.json[element].pos as Vec3);
    }
  }

  update(deltaTime: number) {
    this.node.children.forEach((Element) => {
      let angle = Element.eulerAngles;
      Element.eulerAngles = new Vec3(angle.x, angle.y + 5, angle.z);
    });
  }
}
