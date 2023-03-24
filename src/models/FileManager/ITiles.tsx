import IFile from "./IFile";
import IFolder from "./IFolder";

export default interface ITiles {
    folders: IFolder[];
    files: IFile[];
}