import p5 from "p5";
import {
  cycleByFrame,
  range,
  sineValues,
  slideArray,
  withRepeatRect,
} from "./utils";
import { withSketchRecording } from "./withSketchRecording";

const element = document.getElementById("app")!;

new p5((s: p5) => {
  s.setup = () => {
    s.createCanvas(400, 400);
    s.background(255);
    s.fill(255);
    s.ellipseMode(s.CENTER);
    s.rectMode(s.CENTER);
  };

  const frameCycle = 400;
  const shapeSize = 80;
  const shape = s.createVector(shapeSize, shapeSize);

  s.draw = () => {
    s.fill(255);
    s.strokeWeight(0.5);
    withRepeatRect(s, shape, s.createVector(3, 3), (position) => {
      const rotation = cycleByFrame(
        s.frameCount + position.x + position.y,
        range(frameCycle).map((i) => (i / frameCycle) * 2 * Math.PI),
        frameCycle
      );
      const xOffset = cycleByFrame(
        s.frameCount,
        sineValues(frameCycle, shapeSize),
        frameCycle / (s.frameCount % 2)
      );
      const yOffset = cycleByFrame(
        s.frameCount,
        slideArray(sineValues(frameCycle, shapeSize), frameCycle / 2),
        frameCycle / (s.frameCount % 2)
      );
      s.translate(shape.copy().div(2));
      s.rotate(rotation);
      s.translate(shape.copy().mult(-2));
      s.ellipse(
        shapeSize / 2 + xOffset,
        shapeSize / 2 + yOffset,
        shapeSize / 2,
        shapeSize / 2
      );
    });
  };

  withSketchRecording(s, element, frameCycle * 3 + 1, frameCycle * 2);
}, element);
