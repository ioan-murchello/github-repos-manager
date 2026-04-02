
export interface IGithubProfile {
    login: string;
    name: string;
    avatar_url: string;
    html_url: string;
    email: string | null;
    location: string | null;
    bio: string | null;
    twitter_username?: string | null;

    // Stats
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;

    // Timestamps (often returned by GitHub API, useful for sorting)
    created_at?: string | null;
    updated_at?: string | null;
    id: number;
}

export interface IGithubUserHistoryItem {
    username: string;
    name: string;
    avatarUrl: string;
    html_url: string;
    _id: number;
    likedDate?: string; 
}
export interface IGithubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;

    // Stats
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;

    // Meta info
    language: string | null;
    visibility: "public" | "private";
    topics: string[];  
    clone_url: string;

    
    owner: {
        login: string;
        avatar_url: string;
        html_url: string;
    };

    // Timestamps
    created_at: string;
    updated_at: string;
    pushed_at: string;
}

export type RepoSortType = "recent" | "stars" | "forks";
