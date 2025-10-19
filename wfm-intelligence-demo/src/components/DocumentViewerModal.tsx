/**
 * Document Viewer Modal Component
 *
 * Displays full markdown documents in a scrollable modal dialog.
 * Fetches content from GitHub using the artifact's githubPath.
 *
 * FEATURES:
 * - Loads markdown from GitHub raw URLs
 * - Caches content to avoid re-fetching
 * - Shows loading spinner during fetch
 * - Displays error messages if fetch fails
 * - Renders markdown with syntax highlighting
 * - Shows artifact highlights at bottom
 *
 * DEVELOPERS:
 * - Content is fetched from GitHub, not local files
 * - See githubContent.ts for fetch logic
 * - To customize markdown styling, edit prose classes in the div
 */

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { fetchGitHubContentCached } from '@/utils/githubContent';
import type { PhaseArtifact } from '@/data/bmadPhases';

interface DocumentViewerModalProps {
  artifact: PhaseArtifact | null; // Artifact to display (null = modal closed)
  isOpen: boolean; // Whether modal is visible
  onClose: () => void; // Callback when user closes modal
}

export function DocumentViewerModal({
  artifact,
  isOpen,
  onClose,
}: DocumentViewerModalProps) {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!artifact || !isOpen) {
      setContent('');
      setError(null);
      return;
    }

    const loadContent = async () => {
      setIsLoading(true);
      setError(null);

      const result = await fetchGitHubContentCached(artifact.githubPath);

      if (result.error) {
        setError(result.error);
      } else {
        setContent(result.content);
      }

      setIsLoading(false);
    };

    loadContent();
  }, [artifact, isOpen]);

  if (!artifact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 pr-8">
            {artifact.name}
          </DialogTitle>
          <DialogDescription className="text-base">
            {artifact.description}
            {artifact.size && (
              <span className="ml-2 text-teal-600 font-medium">
                ({artifact.size})
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto min-h-0 pr-4">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
              <span className="ml-3 text-slate-600">Loading document...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 font-medium">Error Loading Document</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          )}

          {!isLoading && !error && content && (
            <div className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-2 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-strong:text-slate-900 prose-strong:font-semibold prose-code:text-teal-700 prose-code:bg-teal-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-800 prose-pre:text-slate-100 prose-blockquote:border-l-teal-500 prose-blockquote:bg-teal-50 prose-blockquote:py-2 prose-table:text-sm">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>

        {artifact.highlights && artifact.highlights.length > 0 && !isLoading && !error && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">
              Key Highlights:
            </h4>
            <ul className="grid grid-cols-2 gap-2">
              {artifact.highlights.map((highlight, idx) => (
                <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                  <span className="text-teal-500 mt-0.5">✓</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
