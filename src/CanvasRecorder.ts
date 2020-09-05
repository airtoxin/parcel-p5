import download from "downloadjs";

export class CanvasRecorder {
  private recorder: MediaRecorder;
  constructor(private canvas: HTMLCanvasElement) {
    const stream = canvas.captureStream();
    this.recorder = new MediaRecorder(stream);

    const chunks: Blob[] = [];

    const handleDataAvailable = (event: BlobEvent) => {
      if (event.data.size) {
        chunks.push(event.data.slice());
      }
    };
    const handleStop = () => {
      if (chunks.length === 0) return;
      const webmBlob = new Blob(chunks);
      download(webmBlob, `${Math.random().toFixed(5)}.webm`, "video/webm");

      this.recorder.removeEventListener("dataavailable", handleDataAvailable);
      this.recorder.removeEventListener("stop", handleStop);
    };

    this.recorder.addEventListener("dataavailable", handleDataAvailable);
    this.recorder.addEventListener("stop", handleStop);
  }

  start() {
    this.recorder.start();
  }

  stop() {
    if (this.recorder.state !== "inactive") this.recorder.stop();
  }
}
