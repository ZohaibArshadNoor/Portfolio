"use client";

import { useEffect, useState } from "react";

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  loading: boolean;
  error: boolean;
}

export function useGitHubStats(username: string): GitHubStats {
  const [stats, setStats] = useState<GitHubStats>({
    publicRepos: 0,
    followers: 0,
    following: 0,
    totalStars: 0,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
        ]);

        if (!userRes.ok) throw new Error("GitHub user fetch failed");

        const user = await userRes.json();
        const repos = reposRes.ok ? await reposRes.json() : [];
        const totalStars = Array.isArray(repos)
          ? repos.reduce(
              (sum: number, r: { stargazers_count?: number }) =>
                sum + (r.stargazers_count ?? 0),
              0
            )
          : 0;

        if (!cancelled) {
          setStats({
            publicRepos: user.public_repos ?? 0,
            followers: user.followers ?? 0,
            following: user.following ?? 0,
            totalStars,
            loading: false,
            error: false,
          });
        }
      } catch {
        if (!cancelled) {
          setStats((s) => ({ ...s, loading: false, error: true }));
        }
      }
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return stats;
}
