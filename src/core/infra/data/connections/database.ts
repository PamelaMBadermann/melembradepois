import "reflect-metadata"
import AppDataSource from "../../../../data-source";

export default function databaseConnection() {

  AppDataSource.initialize()
    .then(async () => {
      console.log("Data Source has been initialized!")
    })
    .catch((err: any) => {
      console.error("Error during Data Source initialization:", err)
    });
}