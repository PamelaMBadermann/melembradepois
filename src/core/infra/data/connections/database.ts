import "reflect-metadata"
import { AppDataSource } from "../../../../data-source";

export default function Connection() {

  AppDataSource.initialize()
    .then(async () => {
      console.log("Data Source has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err)
    });
}