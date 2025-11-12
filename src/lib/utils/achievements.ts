import fs from "fs";
import path from "path";
import yaml from "js-yaml";

import type { Achievement } from "$lib/types/achievements";


export const importAchievement = async (
  slug: string,
  directoryPath: string
): Promise<Achievement | null> => {
  const resolvedFilePath: string = path.resolve(directoryPath, `${slug}.yaml`);

  if (!resolvedFilePath) return null;

  try {
    const fileContents: string = fs.readFileSync(resolvedFilePath, "utf8");
    const parsed: unknown = yaml.load(fileContents);
    const data: Record<string, unknown> = (parsed as Record<string, unknown>) ?? {};

    const titleField: string = typeof data.title === "string" ? data.title : "";
    const descriptionField: string = typeof data.description === "string" ? data.description : "";
    const dateField: string = typeof data.date === "string" ? data.date : "";
    const urlField: string | undefined = typeof data.url === "string" ? data.url : undefined;

    return {
      title: titleField,
      description: descriptionField,
      date: dateField,
      url: urlField,
    };
  } catch {
    return null;
  }
};

export const getAllAchievements = async (): Promise<Achievement[]> => {
  let directoryEntries: fs.Dirent[] = [];
  const achievementsDirectory: string = path.resolve("src/lib/content/achievements");

  try {
    directoryEntries = fs.readdirSync(achievementsDirectory, { withFileTypes: true });
  } catch {
    return [];
  }

  const slugs: string[] = directoryEntries
    .filter((entry: fs.Dirent) => entry.isFile())
    .map((entry: fs.Dirent) => entry.name)
    .filter((name: string) => name.endsWith(".yaml"))
    .map((name: string) => name.replace(/\.ya?ml$/, ""));

  const achievementPromises: Promise<Achievement | null>[] = slugs.map((slug: string) => importAchievement(slug, achievementsDirectory));
  const achievements: (Achievement | null)[] = await Promise.all(achievementPromises);
  const validAchievements: Achievement[] = achievements.filter((item: Achievement | null): item is Achievement => item !== null);

  return validAchievements.sort((a: Achievement, b: Achievement) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
