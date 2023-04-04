import { IExtension } from "./IExtension";
import ITile from "./ITile";

export default interface IFile extends ITile {
    uploadTime: Date;
    extension: IExtension;
}