﻿export declare module tk {
    export module io {
        export class FileSystemEntity {
            public readonly: boolean;
            public lastModified: Date;
            /**
              * Gets the name of the entity.
              */
            public name: string;
            /**
              * Gets the fully-qualified path (including the extension for a File) of the entity.
              */
            public path: string;
            /**
              * Gets the Folder object representing the parent of this entity. Will be null for a root folder like Documents or Temporary.
              */
            public getParent(onSuccess: (folder: Folder) => any, onError?: (error: any) => any);
            /**
              * Deletes the current Entity from the file system.
              */
            public delete(onSuccess?: () => any, onError?: (error: any) => any);
            /**
              * Renames the current entity using the specified name.
              */
            public rename(newName: string, onSuccess?: Function, onError?: Function);
        }

        export class File extends FileSystemEntity {
            /**
              * Gets the extension of the file.
              */
            public extension: string;
            /**
              * Gets a value indicating whether the file is currently locked, meaning a background operation associated with this file is running.
              */
            public isLocked: boolean;
            /**
              * Gets or creates a File entity at the specified path.
              */
            public static fromPath(path: string, onSuccess: (file: File) => any, onError?: (error: any) => any);
            /**
              * Checks whether a File with the specified path already exists.
              */
            public static exists(path: string): boolean;
            /**
              * Creates a FileReader object over this file and locks the file until the reader is released.
              */
            public openRead(): FileReader;
            /**
              * Creates a FileWriter object over this file and locks the file until the writer is released.
              */
            public openWrite(): FileWriter;
        }

        export class Folder extends FileSystemEntity {
            /**
              * Determines whether this instance is a KnownFolder (accessed through the KnownFolders object).
              */
            public isKnown: boolean;

            /**
              * Gets or creates a Folder entity at the specified path.
              */
            public static fromPath(path: string, onSuccess: (folder: Folder) => any, onError?: (error: any) => any);
            /**
              * Checks whether a Folder with the specified path already exists.
              */
            public static exists(path: string): boolean;
            /**
              * Checks whether this Folder contains a file with the specified name.
              */
            public containsFile(name: string): boolean;
            /**
              * Deletes all the files and folders (recursively), contained within this Folder.
              */
            public empty(onSuccess?: () => any, onError?: (error: any) => any);
            /**
              * Gets or creates a File entity with the specified name within this Folder.
              */
            public getFile(name: string, onSuccess: (file: File) => any, onError?: (error: any) => any);
            /**
              * Gets or creates a Folder entity with the specified name within this Folder.
              */
            public getFolder(name: string, onSuccess: (folder: Folder) => any, onError?: (error: any) => any);
            /**
              * Gets all the top-level files residing within this Folder.
              */
            public enumFiles(onSuccess: (files: Array<File>) => any, onError?: (error: any) => any);
        }

        /**
          * Provides access to the top-level Folders instances that are accessible from the application. Use these as entry points to access the FileSystem.
          */
        export class KnownFolders {
            /**
              * Gets the Documents folder available for the current application. This Folder is private for the application and not accessible from Users/External apps.
              */
            public static Documents(): Folder;

            /**
              * Gets the Temporary (Caches) folder available for the current application. This Folder is private for the application and not accessible from Users/External apps.
              */
            public static Temporary(): Folder;
        }

        /**
          * Base class for FileReader and FileWriter APIs.
          */
        export class FileAccess {
            constructor(file: File);
            /**
              * Unlocks the file and allows other operations over it.
              */
            public release();
            /**
              * Gets the underlying File instance.
              */
            file: File;
        }

        /**
          * Enables reading the content of a File entity.
          */
        export class FileReader extends FileAccess {
            /**
              * Reads the content of the underlying File as a UTF8 encoded string.
              */
            public readText(onSuccess: (content: string) => any, onError?: (error: any) => any);
        }

        /**
          * Enables saving data to a File entity.
          */
        export class FileWriter extends FileAccess {
            public writeText(content: string, onSuccess?: () => any, onError?: (error: any) => any);
        }
    }
}