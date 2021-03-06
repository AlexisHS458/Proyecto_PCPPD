
      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "INTERFACE",
        "name": "Actor",
        "possibleTypes": [
          {
            "name": "Bot"
          },
          {
            "name": "EnterpriseUserAccount"
          },
          {
            "name": "Mannequin"
          },
          {
            "name": "Organization"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Assignable",
        "possibleTypes": [
          {
            "name": "Issue"
          },
          {
            "name": "PullRequest"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "Assignee",
        "possibleTypes": [
          {
            "name": "Bot"
          },
          {
            "name": "Mannequin"
          },
          {
            "name": "Organization"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "AuditEntry",
        "possibleTypes": [
          {
            "name": "MembersCanDeleteReposClearAuditEntry"
          },
          {
            "name": "MembersCanDeleteReposDisableAuditEntry"
          },
          {
            "name": "MembersCanDeleteReposEnableAuditEntry"
          },
          {
            "name": "OauthApplicationCreateAuditEntry"
          },
          {
            "name": "OrgAddBillingManagerAuditEntry"
          },
          {
            "name": "OrgAddMemberAuditEntry"
          },
          {
            "name": "OrgBlockUserAuditEntry"
          },
          {
            "name": "OrgConfigDisableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "OrgConfigEnableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "OrgCreateAuditEntry"
          },
          {
            "name": "OrgDisableOauthAppRestrictionsAuditEntry"
          },
          {
            "name": "OrgDisableSamlAuditEntry"
          },
          {
            "name": "OrgDisableTwoFactorRequirementAuditEntry"
          },
          {
            "name": "OrgEnableOauthAppRestrictionsAuditEntry"
          },
          {
            "name": "OrgEnableSamlAuditEntry"
          },
          {
            "name": "OrgEnableTwoFactorRequirementAuditEntry"
          },
          {
            "name": "OrgInviteMemberAuditEntry"
          },
          {
            "name": "OrgInviteToBusinessAuditEntry"
          },
          {
            "name": "OrgOauthAppAccessApprovedAuditEntry"
          },
          {
            "name": "OrgOauthAppAccessDeniedAuditEntry"
          },
          {
            "name": "OrgOauthAppAccessRequestedAuditEntry"
          },
          {
            "name": "OrgRemoveBillingManagerAuditEntry"
          },
          {
            "name": "OrgRemoveMemberAuditEntry"
          },
          {
            "name": "OrgRemoveOutsideCollaboratorAuditEntry"
          },
          {
            "name": "OrgRestoreMemberAuditEntry"
          },
          {
            "name": "OrgUnblockUserAuditEntry"
          },
          {
            "name": "OrgUpdateDefaultRepositoryPermissionAuditEntry"
          },
          {
            "name": "OrgUpdateMemberAuditEntry"
          },
          {
            "name": "OrgUpdateMemberRepositoryCreationPermissionAuditEntry"
          },
          {
            "name": "OrgUpdateMemberRepositoryInvitationPermissionAuditEntry"
          },
          {
            "name": "PrivateRepositoryForkingDisableAuditEntry"
          },
          {
            "name": "PrivateRepositoryForkingEnableAuditEntry"
          },
          {
            "name": "RepoAccessAuditEntry"
          },
          {
            "name": "RepoAddMemberAuditEntry"
          },
          {
            "name": "RepoAddTopicAuditEntry"
          },
          {
            "name": "RepoArchivedAuditEntry"
          },
          {
            "name": "RepoChangeMergeSettingAuditEntry"
          },
          {
            "name": "RepoConfigDisableAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoConfigDisableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigDisableContributorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigDisableSockpuppetDisallowedAuditEntry"
          },
          {
            "name": "RepoConfigEnableAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoConfigEnableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigEnableContributorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigEnableSockpuppetDisallowedAuditEntry"
          },
          {
            "name": "RepoConfigLockAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoConfigUnlockAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoCreateAuditEntry"
          },
          {
            "name": "RepoDestroyAuditEntry"
          },
          {
            "name": "RepoRemoveMemberAuditEntry"
          },
          {
            "name": "RepoRemoveTopicAuditEntry"
          },
          {
            "name": "RepositoryVisibilityChangeDisableAuditEntry"
          },
          {
            "name": "RepositoryVisibilityChangeEnableAuditEntry"
          },
          {
            "name": "TeamAddMemberAuditEntry"
          },
          {
            "name": "TeamAddRepositoryAuditEntry"
          },
          {
            "name": "TeamChangeParentTeamAuditEntry"
          },
          {
            "name": "TeamRemoveMemberAuditEntry"
          },
          {
            "name": "TeamRemoveRepositoryAuditEntry"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "AuditEntryActor",
        "possibleTypes": [
          {
            "name": "Bot"
          },
          {
            "name": "Organization"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Closable",
        "possibleTypes": [
          {
            "name": "Issue"
          },
          {
            "name": "Milestone"
          },
          {
            "name": "Project"
          },
          {
            "name": "ProjectNext"
          },
          {
            "name": "PullRequest"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "Closer",
        "possibleTypes": [
          {
            "name": "Commit"
          },
          {
            "name": "PullRequest"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Comment",
        "possibleTypes": [
          {
            "name": "CommitComment"
          },
          {
            "name": "Discussion"
          },
          {
            "name": "DiscussionComment"
          },
          {
            "name": "GistComment"
          },
          {
            "name": "Issue"
          },
          {
            "name": "IssueComment"
          },
          {
            "name": "PullRequest"
          },
          {
            "name": "PullRequestReview"
          },
          {
            "name": "PullRequestReviewComment"
          },
          {
            "name": "TeamDiscussion"
          },
          {
            "name": "TeamDiscussionComment"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Contribution",
        "possibleTypes": [
          {
            "name": "CreatedCommitContribution"
          },
          {
            "name": "CreatedIssueContribution"
          },
          {
            "name": "CreatedPullRequestContribution"
          },
          {
            "name": "CreatedPullRequestReviewContribution"
          },
          {
            "name": "CreatedRepositoryContribution"
          },
          {
            "name": "JoinedGitHubContribution"
          },
          {
            "name": "RestrictedContribution"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "CreatedIssueOrRestrictedContribution",
        "possibleTypes": [
          {
            "name": "CreatedIssueContribution"
          },
          {
            "name": "RestrictedContribution"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "CreatedPullRequestOrRestrictedContribution",
        "possibleTypes": [
          {
            "name": "CreatedPullRequestContribution"
          },
          {
            "name": "RestrictedContribution"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "CreatedRepositoryOrRestrictedContribution",
        "possibleTypes": [
          {
            "name": "CreatedRepositoryContribution"
          },
          {
            "name": "RestrictedContribution"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Deletable",
        "possibleTypes": [
          {
            "name": "CommitComment"
          },
          {
            "name": "Discussion"
          },
          {
            "name": "DiscussionComment"
          },
          {
            "name": "GistComment"
          },
          {
            "name": "IssueComment"
          },
          {
            "name": "PullRequestReview"
          },
          {
            "name": "PullRequestReviewComment"
          },
          {
            "name": "TeamDiscussion"
          },
          {
            "name": "TeamDiscussionComment"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "DeploymentReviewer",
        "possibleTypes": [
          {
            "name": "Team"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "EnterpriseAuditEntryData",
        "possibleTypes": [
          {
            "name": "MembersCanDeleteReposClearAuditEntry"
          },
          {
            "name": "MembersCanDeleteReposDisableAuditEntry"
          },
          {
            "name": "MembersCanDeleteReposEnableAuditEntry"
          },
          {
            "name": "OrgInviteToBusinessAuditEntry"
          },
          {
            "name": "PrivateRepositoryForkingDisableAuditEntry"
          },
          {
            "name": "PrivateRepositoryForkingEnableAuditEntry"
          },
          {
            "name": "RepositoryVisibilityChangeDisableAuditEntry"
          },
          {
            "name": "RepositoryVisibilityChangeEnableAuditEntry"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "EnterpriseMember",
        "possibleTypes": [
          {
            "name": "EnterpriseUserAccount"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "GitObject",
        "possibleTypes": [
          {
            "name": "Blob"
          },
          {
            "name": "Commit"
          },
          {
            "name": "Tag"
          },
          {
            "name": "Tree"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "GitSignature",
        "possibleTypes": [
          {
            "name": "GpgSignature"
          },
          {
            "name": "SmimeSignature"
          },
          {
            "name": "UnknownSignature"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "HovercardContext",
        "possibleTypes": [
          {
            "name": "GenericHovercardContext"
          },
          {
            "name": "OrganizationTeamsHovercardContext"
          },
          {
            "name": "OrganizationsHovercardContext"
          },
          {
            "name": "ReviewStatusHovercardContext"
          },
          {
            "name": "ViewerHovercardContext"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "IpAllowListOwner",
        "possibleTypes": [
          {
            "name": "App"
          },
          {
            "name": "Enterprise"
          },
          {
            "name": "Organization"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "IssueOrPullRequest",
        "possibleTypes": [
          {
            "name": "Issue"
          },
          {
            "name": "PullRequest"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "IssueTimelineItem",
        "possibleTypes": [
          {
            "name": "AssignedEvent"
          },
          {
            "name": "ClosedEvent"
          },
          {
            "name": "Commit"
          },
          {
            "name": "CrossReferencedEvent"
          },
          {
            "name": "DemilestonedEvent"
          },
          {
            "name": "IssueComment"
          },
          {
            "name": "LabeledEvent"
          },
          {
            "name": "LockedEvent"
          },
          {
            "name": "MilestonedEvent"
          },
          {
            "name": "ReferencedEvent"
          },
          {
            "name": "RenamedTitleEvent"
          },
          {
            "name": "ReopenedEvent"
          },
          {
            "name": "SubscribedEvent"
          },
          {
            "name": "TransferredEvent"
          },
          {
            "name": "UnassignedEvent"
          },
          {
            "name": "UnlabeledEvent"
          },
          {
            "name": "UnlockedEvent"
          },
          {
            "name": "UnsubscribedEvent"
          },
          {
            "name": "UserBlockedEvent"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "IssueTimelineItems",
        "possibleTypes": [
          {
            "name": "AddedToProjectEvent"
          },
          {
            "name": "AssignedEvent"
          },
          {
            "name": "ClosedEvent"
          },
          {
            "name": "CommentDeletedEvent"
          },
          {
            "name": "ConnectedEvent"
          },
          {
            "name": "ConvertedNoteToIssueEvent"
          },
          {
            "name": "CrossReferencedEvent"
          },
          {
            "name": "DemilestonedEvent"
          },
          {
            "name": "DisconnectedEvent"
          },
          {
            "name": "IssueComment"
          },
          {
            "name": "LabeledEvent"
          },
          {
            "name": "LockedEvent"
          },
          {
            "name": "MarkedAsDuplicateEvent"
          },
          {
            "name": "MentionedEvent"
          },
          {
            "name": "MilestonedEvent"
          },
          {
            "name": "MovedColumnsInProjectEvent"
          },
          {
            "name": "PinnedEvent"
          },
          {
            "name": "ReferencedEvent"
          },
          {
            "name": "RemovedFromProjectEvent"
          },
          {
            "name": "RenamedTitleEvent"
          },
          {
            "name": "ReopenedEvent"
          },
          {
            "name": "SubscribedEvent"
          },
          {
            "name": "TransferredEvent"
          },
          {
            "name": "UnassignedEvent"
          },
          {
            "name": "UnlabeledEvent"
          },
          {
            "name": "UnlockedEvent"
          },
          {
            "name": "UnmarkedAsDuplicateEvent"
          },
          {
            "name": "UnpinnedEvent"
          },
          {
            "name": "UnsubscribedEvent"
          },
          {
            "name": "UserBlockedEvent"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Labelable",
        "possibleTypes": [
          {
            "name": "Discussion"
          },
          {
            "name": "Issue"
          },
          {
            "name": "PullRequest"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Lockable",
        "possibleTypes": [
          {
            "name": "Discussion"
          },
          {
            "name": "Issue"
          },
          {
            "name": "PullRequest"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "MemberStatusable",
        "possibleTypes": [
          {
            "name": "Organization"
          },
          {
            "name": "Team"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "MilestoneItem",
        "possibleTypes": [
          {
            "name": "Issue"
          },
          {
            "name": "PullRequest"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Minimizable",
        "possibleTypes": [
          {
            "name": "CommitComment"
          },
          {
            "name": "DiscussionComment"
          },
          {
            "name": "GistComment"
          },
          {
            "name": "IssueComment"
          },
          {
            "name": "PullRequestReviewComment"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Node",
        "possibleTypes": [
          {
            "name": "AddedToProjectEvent"
          },
          {
            "name": "App"
          },
          {
            "name": "AssignedEvent"
          },
          {
            "name": "AutoMergeDisabledEvent"
          },
          {
            "name": "AutoMergeEnabledEvent"
          },
          {
            "name": "AutoRebaseEnabledEvent"
          },
          {
            "name": "AutoSquashEnabledEvent"
          },
          {
            "name": "AutomaticBaseChangeFailedEvent"
          },
          {
            "name": "AutomaticBaseChangeSucceededEvent"
          },
          {
            "name": "BaseRefChangedEvent"
          },
          {
            "name": "BaseRefDeletedEvent"
          },
          {
            "name": "BaseRefForcePushedEvent"
          },
          {
            "name": "Blob"
          },
          {
            "name": "Bot"
          },
          {
            "name": "BranchProtectionRule"
          },
          {
            "name": "CWE"
          },
          {
            "name": "CheckRun"
          },
          {
            "name": "CheckSuite"
          },
          {
            "name": "ClosedEvent"
          },
          {
            "name": "CodeOfConduct"
          },
          {
            "name": "CommentDeletedEvent"
          },
          {
            "name": "Commit"
          },
          {
            "name": "CommitComment"
          },
          {
            "name": "CommitCommentThread"
          },
          {
            "name": "ConnectedEvent"
          },
          {
            "name": "ConvertToDraftEvent"
          },
          {
            "name": "ConvertedNoteToIssueEvent"
          },
          {
            "name": "CrossReferencedEvent"
          },
          {
            "name": "DemilestonedEvent"
          },
          {
            "name": "DeployKey"
          },
          {
            "name": "DeployedEvent"
          },
          {
            "name": "Deployment"
          },
          {
            "name": "DeploymentEnvironmentChangedEvent"
          },
          {
            "name": "DeploymentReview"
          },
          {
            "name": "DeploymentStatus"
          },
          {
            "name": "DisconnectedEvent"
          },
          {
            "name": "Discussion"
          },
          {
            "name": "DiscussionCategory"
          },
          {
            "name": "DiscussionComment"
          },
          {
            "name": "Enterprise"
          },
          {
            "name": "EnterpriseAdministratorInvitation"
          },
          {
            "name": "EnterpriseIdentityProvider"
          },
          {
            "name": "EnterpriseRepositoryInfo"
          },
          {
            "name": "EnterpriseServerInstallation"
          },
          {
            "name": "EnterpriseServerUserAccount"
          },
          {
            "name": "EnterpriseServerUserAccountEmail"
          },
          {
            "name": "EnterpriseServerUserAccountsUpload"
          },
          {
            "name": "EnterpriseUserAccount"
          },
          {
            "name": "Environment"
          },
          {
            "name": "ExternalIdentity"
          },
          {
            "name": "Gist"
          },
          {
            "name": "GistComment"
          },
          {
            "name": "HeadRefDeletedEvent"
          },
          {
            "name": "HeadRefForcePushedEvent"
          },
          {
            "name": "HeadRefRestoredEvent"
          },
          {
            "name": "IpAllowListEntry"
          },
          {
            "name": "Issue"
          },
          {
            "name": "IssueComment"
          },
          {
            "name": "Label"
          },
          {
            "name": "LabeledEvent"
          },
          {
            "name": "Language"
          },
          {
            "name": "License"
          },
          {
            "name": "LockedEvent"
          },
          {
            "name": "Mannequin"
          },
          {
            "name": "MarkedAsDuplicateEvent"
          },
          {
            "name": "MarketplaceCategory"
          },
          {
            "name": "MarketplaceListing"
          },
          {
            "name": "MembersCanDeleteReposClearAuditEntry"
          },
          {
            "name": "MembersCanDeleteReposDisableAuditEntry"
          },
          {
            "name": "MembersCanDeleteReposEnableAuditEntry"
          },
          {
            "name": "MentionedEvent"
          },
          {
            "name": "MergedEvent"
          },
          {
            "name": "Milestone"
          },
          {
            "name": "MilestonedEvent"
          },
          {
            "name": "MovedColumnsInProjectEvent"
          },
          {
            "name": "OIDCProvider"
          },
          {
            "name": "OauthApplicationCreateAuditEntry"
          },
          {
            "name": "OrgAddBillingManagerAuditEntry"
          },
          {
            "name": "OrgAddMemberAuditEntry"
          },
          {
            "name": "OrgBlockUserAuditEntry"
          },
          {
            "name": "OrgConfigDisableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "OrgConfigEnableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "OrgCreateAuditEntry"
          },
          {
            "name": "OrgDisableOauthAppRestrictionsAuditEntry"
          },
          {
            "name": "OrgDisableSamlAuditEntry"
          },
          {
            "name": "OrgDisableTwoFactorRequirementAuditEntry"
          },
          {
            "name": "OrgEnableOauthAppRestrictionsAuditEntry"
          },
          {
            "name": "OrgEnableSamlAuditEntry"
          },
          {
            "name": "OrgEnableTwoFactorRequirementAuditEntry"
          },
          {
            "name": "OrgInviteMemberAuditEntry"
          },
          {
            "name": "OrgInviteToBusinessAuditEntry"
          },
          {
            "name": "OrgOauthAppAccessApprovedAuditEntry"
          },
          {
            "name": "OrgOauthAppAccessDeniedAuditEntry"
          },
          {
            "name": "OrgOauthAppAccessRequestedAuditEntry"
          },
          {
            "name": "OrgRemoveBillingManagerAuditEntry"
          },
          {
            "name": "OrgRemoveMemberAuditEntry"
          },
          {
            "name": "OrgRemoveOutsideCollaboratorAuditEntry"
          },
          {
            "name": "OrgRestoreMemberAuditEntry"
          },
          {
            "name": "OrgUnblockUserAuditEntry"
          },
          {
            "name": "OrgUpdateDefaultRepositoryPermissionAuditEntry"
          },
          {
            "name": "OrgUpdateMemberAuditEntry"
          },
          {
            "name": "OrgUpdateMemberRepositoryCreationPermissionAuditEntry"
          },
          {
            "name": "OrgUpdateMemberRepositoryInvitationPermissionAuditEntry"
          },
          {
            "name": "Organization"
          },
          {
            "name": "OrganizationIdentityProvider"
          },
          {
            "name": "OrganizationInvitation"
          },
          {
            "name": "Package"
          },
          {
            "name": "PackageFile"
          },
          {
            "name": "PackageTag"
          },
          {
            "name": "PackageVersion"
          },
          {
            "name": "PinnedDiscussion"
          },
          {
            "name": "PinnedEvent"
          },
          {
            "name": "PinnedIssue"
          },
          {
            "name": "PrivateRepositoryForkingDisableAuditEntry"
          },
          {
            "name": "PrivateRepositoryForkingEnableAuditEntry"
          },
          {
            "name": "Project"
          },
          {
            "name": "ProjectCard"
          },
          {
            "name": "ProjectColumn"
          },
          {
            "name": "ProjectNext"
          },
          {
            "name": "ProjectNextItem"
          },
          {
            "name": "ProjectNextItemFieldValue"
          },
          {
            "name": "PublicKey"
          },
          {
            "name": "PullRequest"
          },
          {
            "name": "PullRequestCommit"
          },
          {
            "name": "PullRequestCommitCommentThread"
          },
          {
            "name": "PullRequestReview"
          },
          {
            "name": "PullRequestReviewComment"
          },
          {
            "name": "PullRequestReviewThread"
          },
          {
            "name": "Push"
          },
          {
            "name": "PushAllowance"
          },
          {
            "name": "Reaction"
          },
          {
            "name": "ReadyForReviewEvent"
          },
          {
            "name": "Ref"
          },
          {
            "name": "ReferencedEvent"
          },
          {
            "name": "Release"
          },
          {
            "name": "ReleaseAsset"
          },
          {
            "name": "RemovedFromProjectEvent"
          },
          {
            "name": "RenamedTitleEvent"
          },
          {
            "name": "ReopenedEvent"
          },
          {
            "name": "RepoAccessAuditEntry"
          },
          {
            "name": "RepoAddMemberAuditEntry"
          },
          {
            "name": "RepoAddTopicAuditEntry"
          },
          {
            "name": "RepoArchivedAuditEntry"
          },
          {
            "name": "RepoChangeMergeSettingAuditEntry"
          },
          {
            "name": "RepoConfigDisableAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoConfigDisableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigDisableContributorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigDisableSockpuppetDisallowedAuditEntry"
          },
          {
            "name": "RepoConfigEnableAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoConfigEnableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigEnableContributorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigEnableSockpuppetDisallowedAuditEntry"
          },
          {
            "name": "RepoConfigLockAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoConfigUnlockAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoCreateAuditEntry"
          },
          {
            "name": "RepoDestroyAuditEntry"
          },
          {
            "name": "RepoRemoveMemberAuditEntry"
          },
          {
            "name": "RepoRemoveTopicAuditEntry"
          },
          {
            "name": "Repository"
          },
          {
            "name": "RepositoryInvitation"
          },
          {
            "name": "RepositoryTopic"
          },
          {
            "name": "RepositoryVisibilityChangeDisableAuditEntry"
          },
          {
            "name": "RepositoryVisibilityChangeEnableAuditEntry"
          },
          {
            "name": "RepositoryVulnerabilityAlert"
          },
          {
            "name": "ReviewDismissalAllowance"
          },
          {
            "name": "ReviewDismissedEvent"
          },
          {
            "name": "ReviewRequest"
          },
          {
            "name": "ReviewRequestRemovedEvent"
          },
          {
            "name": "ReviewRequestedEvent"
          },
          {
            "name": "SavedReply"
          },
          {
            "name": "SecurityAdvisory"
          },
          {
            "name": "SponsorsActivity"
          },
          {
            "name": "SponsorsListing"
          },
          {
            "name": "SponsorsTier"
          },
          {
            "name": "Sponsorship"
          },
          {
            "name": "SponsorshipNewsletter"
          },
          {
            "name": "Status"
          },
          {
            "name": "StatusCheckRollup"
          },
          {
            "name": "StatusContext"
          },
          {
            "name": "SubscribedEvent"
          },
          {
            "name": "Tag"
          },
          {
            "name": "Team"
          },
          {
            "name": "TeamAddMemberAuditEntry"
          },
          {
            "name": "TeamAddRepositoryAuditEntry"
          },
          {
            "name": "TeamChangeParentTeamAuditEntry"
          },
          {
            "name": "TeamDiscussion"
          },
          {
            "name": "TeamDiscussionComment"
          },
          {
            "name": "TeamRemoveMemberAuditEntry"
          },
          {
            "name": "TeamRemoveRepositoryAuditEntry"
          },
          {
            "name": "Topic"
          },
          {
            "name": "TransferredEvent"
          },
          {
            "name": "Tree"
          },
          {
            "name": "UnassignedEvent"
          },
          {
            "name": "UnlabeledEvent"
          },
          {
            "name": "UnlockedEvent"
          },
          {
            "name": "UnmarkedAsDuplicateEvent"
          },
          {
            "name": "UnpinnedEvent"
          },
          {
            "name": "UnsubscribedEvent"
          },
          {
            "name": "User"
          },
          {
            "name": "UserBlockedEvent"
          },
          {
            "name": "UserContentEdit"
          },
          {
            "name": "UserStatus"
          },
          {
            "name": "VerifiableDomain"
          },
          {
            "name": "Workflow"
          },
          {
            "name": "WorkflowRun"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "OauthApplicationAuditEntryData",
        "possibleTypes": [
          {
            "name": "OauthApplicationCreateAuditEntry"
          },
          {
            "name": "OrgOauthAppAccessApprovedAuditEntry"
          },
          {
            "name": "OrgOauthAppAccessDeniedAuditEntry"
          },
          {
            "name": "OrgOauthAppAccessRequestedAuditEntry"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "OrgRestoreMemberAuditEntryMembership",
        "possibleTypes": [
          {
            "name": "OrgRestoreMemberMembershipOrganizationAuditEntryData"
          },
          {
            "name": "OrgRestoreMemberMembershipRepositoryAuditEntryData"
          },
          {
            "name": "OrgRestoreMemberMembershipTeamAuditEntryData"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "OrganizationAuditEntry",
        "possibleTypes": [
          {
            "name": "MembersCanDeleteReposClearAuditEntry"
          },
          {
            "name": "MembersCanDeleteReposDisableAuditEntry"
          },
          {
            "name": "MembersCanDeleteReposEnableAuditEntry"
          },
          {
            "name": "OauthApplicationCreateAuditEntry"
          },
          {
            "name": "OrgAddBillingManagerAuditEntry"
          },
          {
            "name": "OrgAddMemberAuditEntry"
          },
          {
            "name": "OrgBlockUserAuditEntry"
          },
          {
            "name": "OrgConfigDisableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "OrgConfigEnableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "OrgCreateAuditEntry"
          },
          {
            "name": "OrgDisableOauthAppRestrictionsAuditEntry"
          },
          {
            "name": "OrgDisableSamlAuditEntry"
          },
          {
            "name": "OrgDisableTwoFactorRequirementAuditEntry"
          },
          {
            "name": "OrgEnableOauthAppRestrictionsAuditEntry"
          },
          {
            "name": "OrgEnableSamlAuditEntry"
          },
          {
            "name": "OrgEnableTwoFactorRequirementAuditEntry"
          },
          {
            "name": "OrgInviteMemberAuditEntry"
          },
          {
            "name": "OrgInviteToBusinessAuditEntry"
          },
          {
            "name": "OrgOauthAppAccessApprovedAuditEntry"
          },
          {
            "name": "OrgOauthAppAccessDeniedAuditEntry"
          },
          {
            "name": "OrgOauthAppAccessRequestedAuditEntry"
          },
          {
            "name": "OrgRemoveBillingManagerAuditEntry"
          },
          {
            "name": "OrgRemoveMemberAuditEntry"
          },
          {
            "name": "OrgRemoveOutsideCollaboratorAuditEntry"
          },
          {
            "name": "OrgRestoreMemberAuditEntry"
          },
          {
            "name": "OrgUnblockUserAuditEntry"
          },
          {
            "name": "OrgUpdateDefaultRepositoryPermissionAuditEntry"
          },
          {
            "name": "OrgUpdateMemberAuditEntry"
          },
          {
            "name": "OrgUpdateMemberRepositoryCreationPermissionAuditEntry"
          },
          {
            "name": "OrgUpdateMemberRepositoryInvitationPermissionAuditEntry"
          },
          {
            "name": "PrivateRepositoryForkingDisableAuditEntry"
          },
          {
            "name": "PrivateRepositoryForkingEnableAuditEntry"
          },
          {
            "name": "RepoAccessAuditEntry"
          },
          {
            "name": "RepoAddMemberAuditEntry"
          },
          {
            "name": "RepoAddTopicAuditEntry"
          },
          {
            "name": "RepoArchivedAuditEntry"
          },
          {
            "name": "RepoChangeMergeSettingAuditEntry"
          },
          {
            "name": "RepoConfigDisableAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoConfigDisableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigDisableContributorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigDisableSockpuppetDisallowedAuditEntry"
          },
          {
            "name": "RepoConfigEnableAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoConfigEnableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigEnableContributorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigEnableSockpuppetDisallowedAuditEntry"
          },
          {
            "name": "RepoConfigLockAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoConfigUnlockAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoCreateAuditEntry"
          },
          {
            "name": "RepoDestroyAuditEntry"
          },
          {
            "name": "RepoRemoveMemberAuditEntry"
          },
          {
            "name": "RepoRemoveTopicAuditEntry"
          },
          {
            "name": "RepositoryVisibilityChangeDisableAuditEntry"
          },
          {
            "name": "RepositoryVisibilityChangeEnableAuditEntry"
          },
          {
            "name": "TeamAddMemberAuditEntry"
          },
          {
            "name": "TeamAddRepositoryAuditEntry"
          },
          {
            "name": "TeamChangeParentTeamAuditEntry"
          },
          {
            "name": "TeamRemoveMemberAuditEntry"
          },
          {
            "name": "TeamRemoveRepositoryAuditEntry"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "OrganizationAuditEntryData",
        "possibleTypes": [
          {
            "name": "MembersCanDeleteReposClearAuditEntry"
          },
          {
            "name": "MembersCanDeleteReposDisableAuditEntry"
          },
          {
            "name": "MembersCanDeleteReposEnableAuditEntry"
          },
          {
            "name": "OauthApplicationCreateAuditEntry"
          },
          {
            "name": "OrgAddBillingManagerAuditEntry"
          },
          {
            "name": "OrgAddMemberAuditEntry"
          },
          {
            "name": "OrgBlockUserAuditEntry"
          },
          {
            "name": "OrgConfigDisableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "OrgConfigEnableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "OrgCreateAuditEntry"
          },
          {
            "name": "OrgDisableOauthAppRestrictionsAuditEntry"
          },
          {
            "name": "OrgDisableSamlAuditEntry"
          },
          {
            "name": "OrgDisableTwoFactorRequirementAuditEntry"
          },
          {
            "name": "OrgEnableOauthAppRestrictionsAuditEntry"
          },
          {
            "name": "OrgEnableSamlAuditEntry"
          },
          {
            "name": "OrgEnableTwoFactorRequirementAuditEntry"
          },
          {
            "name": "OrgInviteMemberAuditEntry"
          },
          {
            "name": "OrgInviteToBusinessAuditEntry"
          },
          {
            "name": "OrgOauthAppAccessApprovedAuditEntry"
          },
          {
            "name": "OrgOauthAppAccessDeniedAuditEntry"
          },
          {
            "name": "OrgOauthAppAccessRequestedAuditEntry"
          },
          {
            "name": "OrgRemoveBillingManagerAuditEntry"
          },
          {
            "name": "OrgRemoveMemberAuditEntry"
          },
          {
            "name": "OrgRemoveOutsideCollaboratorAuditEntry"
          },
          {
            "name": "OrgRestoreMemberAuditEntry"
          },
          {
            "name": "OrgRestoreMemberMembershipOrganizationAuditEntryData"
          },
          {
            "name": "OrgUnblockUserAuditEntry"
          },
          {
            "name": "OrgUpdateDefaultRepositoryPermissionAuditEntry"
          },
          {
            "name": "OrgUpdateMemberAuditEntry"
          },
          {
            "name": "OrgUpdateMemberRepositoryCreationPermissionAuditEntry"
          },
          {
            "name": "OrgUpdateMemberRepositoryInvitationPermissionAuditEntry"
          },
          {
            "name": "PrivateRepositoryForkingDisableAuditEntry"
          },
          {
            "name": "PrivateRepositoryForkingEnableAuditEntry"
          },
          {
            "name": "RepoAccessAuditEntry"
          },
          {
            "name": "RepoAddMemberAuditEntry"
          },
          {
            "name": "RepoAddTopicAuditEntry"
          },
          {
            "name": "RepoArchivedAuditEntry"
          },
          {
            "name": "RepoChangeMergeSettingAuditEntry"
          },
          {
            "name": "RepoConfigDisableAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoConfigDisableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigDisableContributorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigDisableSockpuppetDisallowedAuditEntry"
          },
          {
            "name": "RepoConfigEnableAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoConfigEnableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigEnableContributorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigEnableSockpuppetDisallowedAuditEntry"
          },
          {
            "name": "RepoConfigLockAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoConfigUnlockAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoCreateAuditEntry"
          },
          {
            "name": "RepoDestroyAuditEntry"
          },
          {
            "name": "RepoRemoveMemberAuditEntry"
          },
          {
            "name": "RepoRemoveTopicAuditEntry"
          },
          {
            "name": "RepositoryVisibilityChangeDisableAuditEntry"
          },
          {
            "name": "RepositoryVisibilityChangeEnableAuditEntry"
          },
          {
            "name": "TeamAddMemberAuditEntry"
          },
          {
            "name": "TeamAddRepositoryAuditEntry"
          },
          {
            "name": "TeamChangeParentTeamAuditEntry"
          },
          {
            "name": "TeamRemoveMemberAuditEntry"
          },
          {
            "name": "TeamRemoveRepositoryAuditEntry"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "PackageOwner",
        "possibleTypes": [
          {
            "name": "Organization"
          },
          {
            "name": "Repository"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "PermissionGranter",
        "possibleTypes": [
          {
            "name": "Organization"
          },
          {
            "name": "Repository"
          },
          {
            "name": "Team"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "PinnableItem",
        "possibleTypes": [
          {
            "name": "Gist"
          },
          {
            "name": "Repository"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "ProfileOwner",
        "possibleTypes": [
          {
            "name": "Organization"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "ProjectCardItem",
        "possibleTypes": [
          {
            "name": "Issue"
          },
          {
            "name": "PullRequest"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "ProjectNextItemContent",
        "possibleTypes": [
          {
            "name": "Issue"
          },
          {
            "name": "PullRequest"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "ProjectNextOwner",
        "possibleTypes": [
          {
            "name": "Organization"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "ProjectOwner",
        "possibleTypes": [
          {
            "name": "Organization"
          },
          {
            "name": "Repository"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "PullRequestTimelineItem",
        "possibleTypes": [
          {
            "name": "AssignedEvent"
          },
          {
            "name": "BaseRefDeletedEvent"
          },
          {
            "name": "BaseRefForcePushedEvent"
          },
          {
            "name": "ClosedEvent"
          },
          {
            "name": "Commit"
          },
          {
            "name": "CommitCommentThread"
          },
          {
            "name": "CrossReferencedEvent"
          },
          {
            "name": "DemilestonedEvent"
          },
          {
            "name": "DeployedEvent"
          },
          {
            "name": "DeploymentEnvironmentChangedEvent"
          },
          {
            "name": "HeadRefDeletedEvent"
          },
          {
            "name": "HeadRefForcePushedEvent"
          },
          {
            "name": "HeadRefRestoredEvent"
          },
          {
            "name": "IssueComment"
          },
          {
            "name": "LabeledEvent"
          },
          {
            "name": "LockedEvent"
          },
          {
            "name": "MergedEvent"
          },
          {
            "name": "MilestonedEvent"
          },
          {
            "name": "PullRequestReview"
          },
          {
            "name": "PullRequestReviewComment"
          },
          {
            "name": "PullRequestReviewThread"
          },
          {
            "name": "ReferencedEvent"
          },
          {
            "name": "RenamedTitleEvent"
          },
          {
            "name": "ReopenedEvent"
          },
          {
            "name": "ReviewDismissedEvent"
          },
          {
            "name": "ReviewRequestRemovedEvent"
          },
          {
            "name": "ReviewRequestedEvent"
          },
          {
            "name": "SubscribedEvent"
          },
          {
            "name": "UnassignedEvent"
          },
          {
            "name": "UnlabeledEvent"
          },
          {
            "name": "UnlockedEvent"
          },
          {
            "name": "UnsubscribedEvent"
          },
          {
            "name": "UserBlockedEvent"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "PullRequestTimelineItems",
        "possibleTypes": [
          {
            "name": "AddedToProjectEvent"
          },
          {
            "name": "AssignedEvent"
          },
          {
            "name": "AutoMergeDisabledEvent"
          },
          {
            "name": "AutoMergeEnabledEvent"
          },
          {
            "name": "AutoRebaseEnabledEvent"
          },
          {
            "name": "AutoSquashEnabledEvent"
          },
          {
            "name": "AutomaticBaseChangeFailedEvent"
          },
          {
            "name": "AutomaticBaseChangeSucceededEvent"
          },
          {
            "name": "BaseRefChangedEvent"
          },
          {
            "name": "BaseRefDeletedEvent"
          },
          {
            "name": "BaseRefForcePushedEvent"
          },
          {
            "name": "ClosedEvent"
          },
          {
            "name": "CommentDeletedEvent"
          },
          {
            "name": "ConnectedEvent"
          },
          {
            "name": "ConvertToDraftEvent"
          },
          {
            "name": "ConvertedNoteToIssueEvent"
          },
          {
            "name": "CrossReferencedEvent"
          },
          {
            "name": "DemilestonedEvent"
          },
          {
            "name": "DeployedEvent"
          },
          {
            "name": "DeploymentEnvironmentChangedEvent"
          },
          {
            "name": "DisconnectedEvent"
          },
          {
            "name": "HeadRefDeletedEvent"
          },
          {
            "name": "HeadRefForcePushedEvent"
          },
          {
            "name": "HeadRefRestoredEvent"
          },
          {
            "name": "IssueComment"
          },
          {
            "name": "LabeledEvent"
          },
          {
            "name": "LockedEvent"
          },
          {
            "name": "MarkedAsDuplicateEvent"
          },
          {
            "name": "MentionedEvent"
          },
          {
            "name": "MergedEvent"
          },
          {
            "name": "MilestonedEvent"
          },
          {
            "name": "MovedColumnsInProjectEvent"
          },
          {
            "name": "PinnedEvent"
          },
          {
            "name": "PullRequestCommit"
          },
          {
            "name": "PullRequestCommitCommentThread"
          },
          {
            "name": "PullRequestReview"
          },
          {
            "name": "PullRequestReviewThread"
          },
          {
            "name": "PullRequestRevisionMarker"
          },
          {
            "name": "ReadyForReviewEvent"
          },
          {
            "name": "ReferencedEvent"
          },
          {
            "name": "RemovedFromProjectEvent"
          },
          {
            "name": "RenamedTitleEvent"
          },
          {
            "name": "ReopenedEvent"
          },
          {
            "name": "ReviewDismissedEvent"
          },
          {
            "name": "ReviewRequestRemovedEvent"
          },
          {
            "name": "ReviewRequestedEvent"
          },
          {
            "name": "SubscribedEvent"
          },
          {
            "name": "TransferredEvent"
          },
          {
            "name": "UnassignedEvent"
          },
          {
            "name": "UnlabeledEvent"
          },
          {
            "name": "UnlockedEvent"
          },
          {
            "name": "UnmarkedAsDuplicateEvent"
          },
          {
            "name": "UnpinnedEvent"
          },
          {
            "name": "UnsubscribedEvent"
          },
          {
            "name": "UserBlockedEvent"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "PushAllowanceActor",
        "possibleTypes": [
          {
            "name": "App"
          },
          {
            "name": "Team"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Reactable",
        "possibleTypes": [
          {
            "name": "CommitComment"
          },
          {
            "name": "Discussion"
          },
          {
            "name": "DiscussionComment"
          },
          {
            "name": "Issue"
          },
          {
            "name": "IssueComment"
          },
          {
            "name": "PullRequest"
          },
          {
            "name": "PullRequestReview"
          },
          {
            "name": "PullRequestReviewComment"
          },
          {
            "name": "Release"
          },
          {
            "name": "TeamDiscussion"
          },
          {
            "name": "TeamDiscussionComment"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "Reactor",
        "possibleTypes": [
          {
            "name": "Bot"
          },
          {
            "name": "Mannequin"
          },
          {
            "name": "Organization"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "ReferencedSubject",
        "possibleTypes": [
          {
            "name": "Issue"
          },
          {
            "name": "PullRequest"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "RenamedTitleSubject",
        "possibleTypes": [
          {
            "name": "Issue"
          },
          {
            "name": "PullRequest"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "RepositoryAuditEntryData",
        "possibleTypes": [
          {
            "name": "OrgRestoreMemberMembershipRepositoryAuditEntryData"
          },
          {
            "name": "PrivateRepositoryForkingDisableAuditEntry"
          },
          {
            "name": "PrivateRepositoryForkingEnableAuditEntry"
          },
          {
            "name": "RepoAccessAuditEntry"
          },
          {
            "name": "RepoAddMemberAuditEntry"
          },
          {
            "name": "RepoAddTopicAuditEntry"
          },
          {
            "name": "RepoArchivedAuditEntry"
          },
          {
            "name": "RepoChangeMergeSettingAuditEntry"
          },
          {
            "name": "RepoConfigDisableAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoConfigDisableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigDisableContributorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigDisableSockpuppetDisallowedAuditEntry"
          },
          {
            "name": "RepoConfigEnableAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoConfigEnableCollaboratorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigEnableContributorsOnlyAuditEntry"
          },
          {
            "name": "RepoConfigEnableSockpuppetDisallowedAuditEntry"
          },
          {
            "name": "RepoConfigLockAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoConfigUnlockAnonymousGitAccessAuditEntry"
          },
          {
            "name": "RepoCreateAuditEntry"
          },
          {
            "name": "RepoDestroyAuditEntry"
          },
          {
            "name": "RepoRemoveMemberAuditEntry"
          },
          {
            "name": "RepoRemoveTopicAuditEntry"
          },
          {
            "name": "TeamAddRepositoryAuditEntry"
          },
          {
            "name": "TeamRemoveRepositoryAuditEntry"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "RepositoryDiscussionAuthor",
        "possibleTypes": [
          {
            "name": "Organization"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "RepositoryDiscussionCommentAuthor",
        "possibleTypes": [
          {
            "name": "Organization"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "RepositoryInfo",
        "possibleTypes": [
          {
            "name": "Repository"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "RepositoryNode",
        "possibleTypes": [
          {
            "name": "CommitComment"
          },
          {
            "name": "CommitCommentThread"
          },
          {
            "name": "Discussion"
          },
          {
            "name": "DiscussionCategory"
          },
          {
            "name": "Issue"
          },
          {
            "name": "IssueComment"
          },
          {
            "name": "PinnedDiscussion"
          },
          {
            "name": "PullRequest"
          },
          {
            "name": "PullRequestCommitCommentThread"
          },
          {
            "name": "PullRequestReview"
          },
          {
            "name": "PullRequestReviewComment"
          },
          {
            "name": "RepositoryVulnerabilityAlert"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "RepositoryOwner",
        "possibleTypes": [
          {
            "name": "Organization"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "RequestedReviewer",
        "possibleTypes": [
          {
            "name": "Mannequin"
          },
          {
            "name": "Team"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "RequirableByPullRequest",
        "possibleTypes": [
          {
            "name": "CheckRun"
          },
          {
            "name": "StatusContext"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "ReviewDismissalAllowanceActor",
        "possibleTypes": [
          {
            "name": "Team"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "SearchResultItem",
        "possibleTypes": [
          {
            "name": "App"
          },
          {
            "name": "Discussion"
          },
          {
            "name": "Issue"
          },
          {
            "name": "MarketplaceListing"
          },
          {
            "name": "Organization"
          },
          {
            "name": "PullRequest"
          },
          {
            "name": "Repository"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "Sponsor",
        "possibleTypes": [
          {
            "name": "Organization"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Sponsorable",
        "possibleTypes": [
          {
            "name": "Organization"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "SponsorableItem",
        "possibleTypes": [
          {
            "name": "Organization"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Starrable",
        "possibleTypes": [
          {
            "name": "Gist"
          },
          {
            "name": "Repository"
          },
          {
            "name": "Topic"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "StatusCheckRollupContext",
        "possibleTypes": [
          {
            "name": "CheckRun"
          },
          {
            "name": "StatusContext"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Subscribable",
        "possibleTypes": [
          {
            "name": "Commit"
          },
          {
            "name": "Discussion"
          },
          {
            "name": "Issue"
          },
          {
            "name": "PullRequest"
          },
          {
            "name": "Repository"
          },
          {
            "name": "Team"
          },
          {
            "name": "TeamDiscussion"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "TeamAuditEntryData",
        "possibleTypes": [
          {
            "name": "OrgRestoreMemberMembershipTeamAuditEntryData"
          },
          {
            "name": "TeamAddMemberAuditEntry"
          },
          {
            "name": "TeamAddRepositoryAuditEntry"
          },
          {
            "name": "TeamChangeParentTeamAuditEntry"
          },
          {
            "name": "TeamRemoveMemberAuditEntry"
          },
          {
            "name": "TeamRemoveRepositoryAuditEntry"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "TopicAuditEntryData",
        "possibleTypes": [
          {
            "name": "RepoAddTopicAuditEntry"
          },
          {
            "name": "RepoRemoveTopicAuditEntry"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "UniformResourceLocatable",
        "possibleTypes": [
          {
            "name": "Bot"
          },
          {
            "name": "CheckRun"
          },
          {
            "name": "ClosedEvent"
          },
          {
            "name": "Commit"
          },
          {
            "name": "ConvertToDraftEvent"
          },
          {
            "name": "CrossReferencedEvent"
          },
          {
            "name": "Gist"
          },
          {
            "name": "Issue"
          },
          {
            "name": "Mannequin"
          },
          {
            "name": "MergedEvent"
          },
          {
            "name": "Milestone"
          },
          {
            "name": "Organization"
          },
          {
            "name": "PullRequest"
          },
          {
            "name": "PullRequestCommit"
          },
          {
            "name": "ReadyForReviewEvent"
          },
          {
            "name": "Release"
          },
          {
            "name": "Repository"
          },
          {
            "name": "RepositoryTopic"
          },
          {
            "name": "ReviewDismissedEvent"
          },
          {
            "name": "TeamDiscussion"
          },
          {
            "name": "TeamDiscussionComment"
          },
          {
            "name": "User"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Updatable",
        "possibleTypes": [
          {
            "name": "CommitComment"
          },
          {
            "name": "Discussion"
          },
          {
            "name": "DiscussionComment"
          },
          {
            "name": "GistComment"
          },
          {
            "name": "Issue"
          },
          {
            "name": "IssueComment"
          },
          {
            "name": "Project"
          },
          {
            "name": "ProjectNext"
          },
          {
            "name": "PullRequest"
          },
          {
            "name": "PullRequestReview"
          },
          {
            "name": "PullRequestReviewComment"
          },
          {
            "name": "TeamDiscussion"
          },
          {
            "name": "TeamDiscussionComment"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "UpdatableComment",
        "possibleTypes": [
          {
            "name": "CommitComment"
          },
          {
            "name": "DiscussionComment"
          },
          {
            "name": "GistComment"
          },
          {
            "name": "Issue"
          },
          {
            "name": "IssueComment"
          },
          {
            "name": "PullRequest"
          },
          {
            "name": "PullRequestReview"
          },
          {
            "name": "PullRequestReviewComment"
          },
          {
            "name": "TeamDiscussion"
          },
          {
            "name": "TeamDiscussionComment"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "VerifiableDomainOwner",
        "possibleTypes": [
          {
            "name": "Enterprise"
          },
          {
            "name": "Organization"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Votable",
        "possibleTypes": [
          {
            "name": "Discussion"
          },
          {
            "name": "DiscussionComment"
          }
        ]
      }
    ]
  }
};
      export default result;
    