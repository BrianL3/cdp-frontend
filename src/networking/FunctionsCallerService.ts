import { FirebaseConfig } from "../app/AppConfigContext";
import { FIREBASE_FUNCTION } from "./functions/FirebaseFunctions";
import { ResponseData } from "./NetworkResponse";
import { NetworkService } from "./NetworkService";

export default class FunctionsCallerService {
  networkService: NetworkService;

  constructor(firebaseConfig: FirebaseConfig) {
    this.networkService = NetworkService.getInstance(
      firebaseConfig.options,
      firebaseConfig.settings
    );
  }

  async getClip(start: string, end: string, eventId: string, format: string): Promise<string> {
    console.log(`Message received: event ${eventId} clip from ${start}-${end} in ${format}`);
    return Promise.resolve("https://www.google.com/");
    // const generateClip = this.networkService.getFunction(FIREBASE_FUNCTION.DOWNLOAD_VIDEO_CLIP)
    // return generateClip({ start, end, eventId, format })
    // .then((result) => {
    //   // Read result of the Cloud Function.
    //   /** @type {any} */
    //   const data = result.data as ResponseData;
    //   const clipUrl = data.clipUrl as string;
    //   return Promise.resolve(clipUrl);
    // })
    // .catch((error) => {
    //   // Getting the Error details.
    //   const code = error.code;
    //   const message = error.message;

    //   console.log(`ERROR: ${code}, ${message}`)
    //   return Promise.reject(error)
    // });
  }
}
