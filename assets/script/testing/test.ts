import { _decorator, BoxCollider, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("test")
export class test extends Component {
  start() {
    console.log("Box Colliders");
    let Collider = this.node.getComponents(BoxCollider);
    console.log("-------ARRAY", Collider);
  }

  update(deltaTime: number) {}
}
