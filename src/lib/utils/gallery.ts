import fs from "fs";
import path from "path";
import yaml from "js-yaml";

import type { GalleryImage } from "$lib/types/gallery";


export const importGalleryImage = async (
  slug: string,
  directoryPath: string
): Promise<GalleryImage | null> => {
  const resolvedFilePath: string = path.resolve(directoryPath, `${slug}.yaml`);

  if (!resolvedFilePath) return null;

  try {
    const fileContents: string = fs.readFileSync(resolvedFilePath, "utf8");
    const parsed: unknown = yaml.load(fileContents);
    const documentObject: Record<string, unknown> = (parsed as Record<string, unknown>) ?? {};

    const urlField: string = typeof documentObject.url === "string" ? documentObject.url : "";
    const altField: string = typeof documentObject.alt === "string" ? documentObject.alt : "";
    const createdField: string = typeof documentObject.created === "string" ? documentObject.created : "";

    return {
      url: urlField,
      alt: altField,
      created: createdField,
    };
  } catch (error) {
    return null;
  }
};

export const getAllGalleryImages = async (): Promise<GalleryImage[]> => {
  let directoryEntries: fs.Dirent[] = [];
  const galleryDirectory: string = path.resolve("src/lib/content/gallery");

  try {
    directoryEntries = fs.readdirSync(galleryDirectory, { withFileTypes: true });
  } catch (error) {
    return [];
  }

  const yamlFileSlugs: string[] = directoryEntries
    .filter((directoryEntry: fs.Dirent) => directoryEntry.isFile())
    .map((directoryEntry: fs.Dirent) => directoryEntry.name)
    .filter((fileName: string) => fileName.endsWith(".yaml"))
    .map((fileName: string) => fileName.replace(/\.ya?ml$/, ""));
  const galleryImagePromises: Promise<GalleryImage | null>[] = yamlFileSlugs.map(
    (fileSlug: string) => importGalleryImage(fileSlug, galleryDirectory)
  );
  const galleryImageResults: (GalleryImage | null)[] = await Promise.all(galleryImagePromises);
  const validGalleryImages: GalleryImage[] = galleryImageResults.filter(
    (possibleImage: GalleryImage | null): possibleImage is GalleryImage => possibleImage !== null
  );

  return validGalleryImages;
};
