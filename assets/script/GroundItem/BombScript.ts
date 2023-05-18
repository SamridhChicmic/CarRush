import { _decorator, BoxCollider, Component, Node, RigidBody } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BombScript")
export class BombScript extends Component {
  BombCollider: BoxCollider;
  start() {
    this.BombCollider = this.node.getComponent(BoxCollider);

    setTimeout(() => {
      this.node.destroy();
    }, 5000);
  }

  update(deltaTime: number) {}
}
