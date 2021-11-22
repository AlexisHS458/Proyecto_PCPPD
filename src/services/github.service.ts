import {
  Commit,
  GetNodeFiles,
  GetNodeFilesQuery,
  GetRepo,
  GetRepoQuery,
  GetRepositories,
  GetRepositoriesQuery,
  Maybe,
  Node,
  TreeEntry,
  Tree
} from "@/generated/graphql";
import apollo_client from "@/utils/apollo_client";
class GitHubService {
  async getUserRepos(): Promise<Node[]> {
    const response: GetRepositoriesQuery = (
      await apollo_client.query({
        query: GetRepositories
      })
    ).data;

    return response.viewer.repositories.nodes as any;
  }

  async getRepo(userName: string, repoName: string): Promise<Maybe<TreeEntry[]> | undefined> {
    console.log(`userName: |${userName}|`);
    console.log(`repoName: |${repoName}|`);

    const response: GetRepoQuery = (
      await apollo_client.query({
        query: GetRepo,
        variables: {
          name: repoName,
          owner: userName
        }
      })
    ).data;

    const commit = response.repository?.defaultBranchRef?.target as Commit;
    return commit.tree.entries?.sort((a, b) => {
      const aType = a.type === "tree" ? -1 : 1;
      const bType = b.type === "tree" ? -1 : 1;
      return aType - bType;
    });
  }

  async getNodeFiles(id: string): Promise<Maybe<TreeEntry[]> | undefined> {
    const response: GetNodeFilesQuery = (
      await apollo_client
        .query({
          query: GetNodeFiles,
          variables: {
            id
          }
        })
        .then(res => {
          console.log(res);

          return res;
        })
    ).data;
    const tree = response.node as Tree;

    return tree.entries?.sort((a, b) => {
      const aType = a.type === "tree" ? -1 : 1;
      const bType = b.type === "tree" ? -1 : 1;
      return aType - bType;
    });
  }
}

export default new GitHubService();
