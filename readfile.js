import { readFileSync  } from "fs"

export function readTXTContent(path){
    const content = readFileSync(path, "utf-8")
    return content
}
