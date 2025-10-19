/**
 * GitHub Content Fetcher
 * Fetches markdown and other content from GitHub raw URLs
 */

import { GITHUB_REPO, GITHUB_BRANCH } from '@/data/bmadPhases';

export interface FetchContentResult {
  content: string;
  error?: string;
}

/**
 * Fetches raw content from GitHub repository
 * @param githubPath - Relative path in the repository (e.g., 'docs/brainstorming-session-results.md')
 * @returns Promise with content or error
 */
export async function fetchGitHubContent(
  githubPath: string
): Promise<FetchContentResult> {
  try {
    // Construct GitHub raw content URL
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${githubPath}`;

    const response = await fetch(rawUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const content = await response.text();

    return { content };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`Failed to fetch ${githubPath}:`, errorMessage);

    return {
      content: '',
      error: `Failed to load document: ${errorMessage}`,
    };
  }
}

/**
 * Cache for loaded documents to avoid refetching
 */
const contentCache = new Map<string, FetchContentResult>();

/**
 * Fetches content with caching
 * @param githubPath - Relative path in the repository
 * @returns Promise with cached or fetched content
 */
export async function fetchGitHubContentCached(
  githubPath: string
): Promise<FetchContentResult> {
  // Check cache first
  if (contentCache.has(githubPath)) {
    return contentCache.get(githubPath)!;
  }

  // Fetch and cache
  const result = await fetchGitHubContent(githubPath);
  contentCache.set(githubPath, result);

  return result;
}

/**
 * Clear the content cache (useful for testing or refresh)
 */
export function clearContentCache() {
  contentCache.clear();
}
