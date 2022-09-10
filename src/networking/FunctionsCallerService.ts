import { FirebaseConfig } from "../app/AppConfigContext";
import { FIREBASE_FUNCTION } from "./functions/FirebaseFunctions";
import { ResponseData } from "./NetworkResponse";
import { NetworkService } from "./NetworkService";

export default class FunctionsCallerService {
  networkService: NetworkService;
  projectId: string;

  constructor(firebaseConfig: FirebaseConfig) {
    this.networkService = NetworkService.getInstance(
      firebaseConfig.options,
      firebaseConfig.settings
    );
    this.projectId = firebaseConfig.options.projectId || "NO PROJECT ID";
  }
  /**
   *
   * @param time time in any fragment of hh:mm:ss
   * @returns time padded out to full hh:mm:ss format
   */
  formatTimeString(time: string): string {
    let mutableTime = time;
    if (mutableTime.length < 8) {
      if (mutableTime.length == 4) {
        mutableTime = mutableTime.padStart(5, "0");
      } else if (mutableTime.length == 5) {
        mutableTime = mutableTime.padStart(6, ":");
      } else {
        mutableTime = mutableTime.padStart(8, "0");
      }
      return this.formatTimeString(mutableTime);
    }
    return mutableTime;
  }

  async getClip(
    start: string,
    end: string,
    eventId: string,
    sessionId: string,
    format: string
  ): Promise<string> {
    console.log(`Message received: event ${eventId} clip from ${start}-${end} in ${format}`);
    const formatStart = this.formatTimeString(start);
    const formatEnd = this.formatTimeString(end);
    // return Promise.resolve("https://www.google.com/")
    const generateClip = this.networkService.getFunction(FIREBASE_FUNCTION.DOWNLOAD_VIDEO_CLIP);
    return generateClip({
      start: formatStart,
      end: formatEnd,
      eventId,
      sessionId,
      format,
      projectId: this.projectId,
    })
      .then((result) => {
        // Read result of the Cloud Function.
        /** @type {any} */
        const data = result.data as ResponseData;
        const clipUrl = data.clipUrl as string;
        return Promise.resolve(clipUrl);
      })
      .catch((error) => {
        // Getting the Error details.
        const code = error.code;
        const message = error.message;

        console.log(`ERROR: ${code}, ${message}`);
        return Promise.reject(error);
      });
  }
}
