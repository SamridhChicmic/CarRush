import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PowerBox")
export class PowerBox extends Component {
  PositionTrack: number = null;
  start() {}

  update(deltaTime: number) {}
}
