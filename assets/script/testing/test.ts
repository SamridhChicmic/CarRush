import {
  _decorator,
  BoxCollider,
  Component,
  instantiate,
  JsonAsset,
  Node,
  Prefab,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("test")
export class test extends Component {
  @property({ type: JsonAsset })
  JsonFile: JsonAsset = null;
  @property({ type: Prefab })
  power: Prefab = null;
  start() {
    console.log("Length", this.node.children.length);
    this.node.children.forEach((element) => {
      console.log("pos", element.getPosition());
      console.log("rot", element.getRotation());
      console.log("scale", element.getScale());
      console.log("-----------------------------------");
    });

    let n = this.JsonFile.json.length;
    for (let i = 0; i < n; i++) {
      let powerbomb = instantiate(this.power);
      this.node.addChild(powerbomb);
      powerbomb.setPosition(this.JsonFile.json[i].pos as Vec3);
    }
  }

  update(deltaTime: number) {}
}
