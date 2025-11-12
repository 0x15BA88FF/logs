import fs from "fs";
import path from "path";
import yaml from "js-yaml";

import type { Experience } from "$lib/types/experiences";


export const importExperience = async (
  slug: string,
  directoryPath: string
): Promise<Experience | null> => {
  const resolvedFilePath: string = path.resolve(directoryPath, `${slug}.yaml`);

  if (!resolvedFilePath) return null;

  try {
    const fileContents: string = fs.readFileSync(resolvedFilePath, "utf8");
    const parsed: unknown = yaml.load(fileContents);
    const data: Record<string, unknown> = (parsed as Record<string, unknown>) ?? {};

    const titleField: string = typeof data.title === "string" ? data.title : "";
    const descriptionField: string = typeof data.description === "string" ? data.description : "";
    const organizationField: string = typeof data.organization === "string" ? data.organization : "";
    const dateStartField: string = typeof data.dateStart === "string" ? data.dateStart : "";
    const dateEndField: string = typeof data.dateEnd === "string" ? data.dateEnd : new Date().toISOString();

    return {
      title: titleField,
      description: descriptionField,
      organization: organizationField,
      dateStart: dateStartField,
      dateEnd: dateEndField,
    };
  } catch {
    return null;
  }
};

export const getAllExperiences = async (): Promise<Experience[]> => {
  let directoryEntries: fs.Dirent[] = [];
  const experiencesDirectory: string = path.resolve("src/lib/content/experiences");

  try {
    directoryEntries = fs.readdirSync(experiencesDirectory, { withFileTypes: true });
  } catch {
    return [];
  }

  const slugs: string[] = directoryEntries
    .filter((entry: fs.Dirent) => entry.isFile())
    .map((entry: fs.Dirent) => entry.name)
    .filter((name: string) => name.endsWith(".yaml"))
    .map((name: string) => name.replace(/\.ya?ml$/, ""));
  const experiencePromises: Promise<Experience | null>[] = slugs.map((slug: string) => importExperience(slug, experiencesDirectory));
  const experiences: (Experience | null)[] = await Promise.all(experiencePromises);
  const validExperiences: Experience[] = experiences.filter((item: Experience | null): item is Experience => item !== null);

  return validExperiences.sort(
    (a: Experience, b: Experience) =>
      new Date(b.dateEnd).getTime() - new Date(a.dateEnd).getTime()
  );
};
