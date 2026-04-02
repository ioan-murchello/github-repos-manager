import dotenv from "dotenv";
dotenv.config();
export const getRepositoriesByLanguage = async (req, res) => {
  try {
    const { language } = req.params;
    const response = await fetch(
      `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_API_KEY}`,
        },
      },
    );

    const repoData = await response.json();

    if (response.status === 404) {
      return res.status(404).json({ error: "Language not found" });
    }

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: repoData.message || "GitHub API Error" });
    }

    res.status(200).json(repoData);
  } catch (error) {
    console.error("error in getRepositoriesByLanguage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
