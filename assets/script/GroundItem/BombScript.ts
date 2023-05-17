import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BombScript")
export class BombScript extends Component {
  start() {
    setTimeout(() => {
      this.node.destroy();
    }, 5000);
  }

  update(deltaTime: number) {}
}
