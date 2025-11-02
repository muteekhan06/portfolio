/**
 * GitHub API Client (Free)
 * Commits changes directly to GitHub repo
 * Uses Personal Access Token (PAT)
 */

const GITHUB_PAT = import.meta.env.VITE_GITHUB_PAT;
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO; // format: "username/repo"
const GITHUB_BRANCH = import.meta.env.VITE_GITHUB_BRANCH || 'main';
const API_BASE = 'https://api.github.com';

export interface GitHubCommitOptions {
  path: string;
  content: string;
  message: string;
  branch?: string;
}

/**
 * Get file content from GitHub
 */
export async function getFile(path: string): Promise<{ content: string; sha: string } | null> {
  try {
    const response = await fetch(
      `${API_BASE}/repos/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_PAT}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );
    
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    const content = atob(data.content); // Decode base64
    
    return {
      content,
      sha: data.sha
    };
  } catch (error) {
    console.error('Failed to get file from GitHub:', error);
    throw error;
  }
}

/**
 * Commit file to GitHub
 */
export async function commitFile(options: GitHubCommitOptions): Promise<boolean> {
  const { path, content, message, branch = GITHUB_BRANCH } = options;
  
  try {
    // First, get the current file SHA (required for updates)
    const existingFile = await getFile(path);
    
    // Encode content to base64
    const encodedContent = btoa(unescape(encodeURIComponent(content)));
    
    const payload: any = {
      message,
      content: encodedContent,
      branch
    };
    
    // If file exists, include SHA for update
    if (existingFile) {
      payload.sha = existingFile.sha;
    }
    
    const response = await fetch(
      `${API_BASE}/repos/${GITHUB_REPO}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_PAT}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );
    
    if (!response.ok) {
      throw new Error(`GitHub commit failed: ${response.statusText}`);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to commit to GitHub:', error);
    throw error;
  }
}

/**
 * Commit multiple files at once (batch commit)
 */
export async function commitMultipleFiles(
  files: Array<{ path: string; content: string }>,
  message: string
): Promise<boolean> {
  try {
    // Get the latest commit SHA
    const refResponse = await fetch(
      `${API_BASE}/repos/${GITHUB_REPO}/git/ref/heads/${GITHUB_BRANCH}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_PAT}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );
    
    if (!refResponse.ok) {
      throw new Error('Failed to get latest commit');
    }
    
    const refData = await refResponse.json();
    const latestCommitSha = refData.object.sha;
    
    // Get the tree SHA from the latest commit
    const commitResponse = await fetch(
      `${API_BASE}/repos/${GITHUB_REPO}/git/commits/${latestCommitSha}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_PAT}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );
    
    const commitData = await commitResponse.json();
    const baseTreeSha = commitData.tree.sha;
    
    // Create blobs for each file
    const tree = await Promise.all(
      files.map(async (file) => {
        const blobResponse = await fetch(
          `${API_BASE}/repos/${GITHUB_REPO}/git/blobs`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${GITHUB_PAT}`,
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              content: file.content,
              encoding: 'utf-8'
            })
          }
        );
        
        const blobData = await blobResponse.json();
        
        return {
          path: file.path,
          mode: '100644',
          type: 'blob',
          sha: blobData.sha
        };
      })
    );
    
    // Create new tree
    const treeResponse = await fetch(
      `${API_BASE}/repos/${GITHUB_REPO}/git/trees`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITHUB_PAT}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          base_tree: baseTreeSha,
          tree
        })
      }
    );
    
    const treeData = await treeResponse.json();
    
    // Create commit
    const newCommitResponse = await fetch(
      `${API_BASE}/repos/${GITHUB_REPO}/git/commits`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITHUB_PAT}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          tree: treeData.sha,
          parents: [latestCommitSha]
        })
      }
    );
    
    const newCommitData = await newCommitResponse.json();
    
    // Update reference
    const updateRefResponse = await fetch(
      `${API_BASE}/repos/${GITHUB_REPO}/git/refs/heads/${GITHUB_BRANCH}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${GITHUB_PAT}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sha: newCommitData.sha
        })
      }
    );
    
    return updateRefResponse.ok;
  } catch (error) {
    console.error('Batch commit failed:', error);
    throw error;
  }
}

/**
 * Trigger Vercel deployment (webhook)
 * This is optional - Vercel auto-deploys on push
 */
export async function triggerDeploy(): Promise<void> {
  // Vercel automatically deploys on GitHub push
  // No action needed - just a placeholder for future webhook integration
  console.log('Deployment triggered via GitHub push');
}
