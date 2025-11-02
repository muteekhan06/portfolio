/**
 * Data fetching utilities
 */

const DATA_BASE_URL = "/data";

export async function fetchJSON<T>(filename: string): Promise<T> {
  try {
    const response = await fetch(`${DATA_BASE_URL}/${filename}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}: ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error);
    throw error;
  }
}

export async function fetchProfile() {
  return fetchJSON("profile.json");
}

export async function fetchProjects() {
  return fetchJSON("projects.json");
}

export async function fetchExperience() {
  return fetchJSON("experience.json");
}

export async function fetchSkills() {
  return fetchJSON("skills.json");
}

export async function fetchAwards() {
  return fetchJSON("awards.json");
}

export async function fetchTranslations(locale: string = "en") {
  return fetchJSON(`i18n/${locale}.json`);
}

/**
 * Prefetch all data
 */
export async function prefetchAllData() {
  return Promise.all([
    fetchProfile(),
    fetchProjects(),
    fetchExperience(),
    fetchSkills(),
    fetchAwards(),
    fetchTranslations("en"),
  ]);
}
