import fs from "fs";
import path from "path";
import yaml from "js-yaml";

import type { Project } from "$lib/types/projects";


export const importProject = async (
  slug: string,
  directoryPath: string
): Promise<Project | null> => {
  const resolvedFilePath: string = path.resolve(directoryPath, `${slug}.yaml`);

  if (!resolvedFilePath) return null;

  try {
    const fileContents: string = fs.readFileSync(resolvedFilePath, "utf8");
    const parsed: unknown = yaml.load(fileContents);
    const data: Record<string, unknown> = (parsed as Record<string, unknown>) ?? {};

    const nameField: string = typeof data.name === "string" ? data.name : "";
    const descriptionField: string = typeof data.description === "string" ? data.description : "";
    const thumbnailField: string = typeof data.thumbnail === "string" ? data.thumbnail : "";
    const urlField: string = typeof data.url === "string" ? data.url : "";

    return {
      name: nameField,
      description: descriptionField,
      thumbnail: thumbnailField,
      url: urlField,
    };
  } catch {
    return null;
  }
};

export const getAllProjects = async (): Promise<Project[]> => {
  let directoryEntries: fs.Dirent[] = [];
  const projectsDirectory: string = path.resolve("src/lib/content/projects");

  try {
    directoryEntries = fs.readdirSync(projectsDirectory, { withFileTypes: true });
  } catch {
    return [];
  }

  const slugs: string[] = directoryEntries
    .filter((entry: fs.Dirent) => entry.isFile())
    .map((entry: fs.Dirent) => entry.name)
    .filter((name: string) => name.endsWith(".yaml"))
    .map((name: string) => name.replace(/\.ya?ml$/, ""));
  const projectPromises: Promise<Project | null>[] = slugs.map((slug: string) => importProject(slug, projectsDirectory));
  const projects: (Project | null)[] = await Promise.all(projectPromises);
  const validProjects: Project[] = projects.filter((item: Project | null): item is Project => item !== null);

  return validProjects;
};
