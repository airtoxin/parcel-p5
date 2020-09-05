import download from "downloadjs";

export class CanvasRecorder {
  private recorder: MediaRecorder;
  constructor(
    private canvas: HTMLCanvasElement,
    private bitPerSecond: number = 25000000
  ) {
    const stream = canvas.captureStream();
    this.recorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
      videoBitsPerSecond: bitPerSecond,
    });

    this.recorder.addEventListener("dataavailable", (event: BlobEvent) => {
      download(event.data, `${Math.random().toFixed(5)}.webm`, "video/webm");
    });
  }

  start() {
    this.recorder.start();
  }

  stop() {
    if (this.recorder.state !== "inactive") this.recorder.stop();
  }
}
