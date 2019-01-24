import { Injectable } from "@angular/core";
import cmd from "node-cmd";
@Injectable({
  providedIn: "root"
})
export class CommandRunnerService {
  constructor() {}

  run(command) {
    cmd.get(
      `${command}`,
      function(err, data, stderr) {
        if (!err) {
          console.log(
            "Data:\n\n",
            data
          );
        } else {
          console.log("error", err);
        }
      }
    );
  }
}
