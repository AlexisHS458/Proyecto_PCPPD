import {
  Commit,
  GetNodeFiles,
  GetNodeFilesQuery,
  GetRepo,
  GetRepoQuery,
  GetRepositories,
  GetRepositoriesQuery,
  Maybe,
  Repository,
  TreeEntry,
  Tree,
  Ref,
  CreateCommitOnBranchInput,
  MakeCommitMutation,
  MakeCommit
} from "@/generated/graphql";
import apollo_client from "@/utils/apollo_client";
class GitHubService {
  async getUserRepos(): Promise<Repository[]> {
    const response: GetRepositoriesQuery = (
      await apollo_client.query({
        query: GetRepositories
      })
    ).data;

    return response.viewer.repositories.nodes as any;
  }

  async getRepo(userName: string, repoName: string): Promise<Maybe<Repository> | undefined> {
    const response: GetRepoQuery = (
      await apollo_client.query({
        query: GetRepo,
        variables: {
          name: repoName,
          owner: userName
        },
        fetchPolicy: "network-only"
      })
    ).data;

    return response.repository as Repository;
  }

  async getNodeFiles(id: string): Promise<Maybe<TreeEntry[]> | undefined> {
    const response: GetNodeFilesQuery = (
      await apollo_client
        .query({
          query: GetNodeFiles,
          variables: {
            id
          },
          fetchPolicy: "network-only"
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

  async makeCommit(commitInput: CreateCommitOnBranchInput): Promise<string> {
    const response: MakeCommitMutation = (
      await apollo_client.mutate({
        mutation: MakeCommit,
        variables: {
          input: commitInput
        }
      })
    ).data;

    return response.createCommitOnBranch?.commit?.url;
  }
}

export default new GitHubService();
