export abstract class FileManagerBaseService<T> {
    constructor() {}
    abstract export(content: T, subExension: string): void;
    abstract import(file: File): Promise<T>;
}
