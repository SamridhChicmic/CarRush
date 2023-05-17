import { _decorator, BoxCollider, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("MissileScript")
export class MissileScript extends Component {
  MissileCollider: BoxCollider = null;
  start() {
    this.MissileCollider = this.node.getComponent(BoxCollider);
    this.MissileCollider.on(
      "onCollisionEnter",
      (EventType) => {
        this.node.destroy();
      },
      this
    );
  }

  update(deltaTime: number) {}
}
