import { I18nKey } from "#/i18n/declaration";

export interface Tip {
  key: I18nKey;
  link?: string;
}

export const TIPS: Tip[] = [
  {
    key: I18nKey.TIPS$CUSTOMIZE_MICROAGENT,
    link: "https://VAgent-all.dev/docs/usage/prompting/microagents-repo",
  },
  {
    key: I18nKey.TIPS$SETUP_SCRIPT,
    link: "https://VAgent-all.dev/docs/usage/prompting/repository#setup-script",
  },
  { key: I18nKey.TIPS$VSCODE_INSTANCE },
  { key: I18nKey.TIPS$SAVE_WORK },
  {
    key: I18nKey.TIPS$SPECIFY_FILES,
    link: "https://VAgent-all.dev/docs/usage/prompting/prompting-best-practices",
  },
  {
    key: I18nKey.TIPS$HEADLESS_MODE,
    link: "https://VAgent-all.dev/docs/usage/how-to/headless-mode",
  },
  {
    key: I18nKey.TIPS$CLI_MODE,
    link: "https://VAgent-all.dev/docs/usage/how-to/cli-mode",
  },
  {
    key: I18nKey.TIPS$GITHUB_HOOK,
    link: "https://VAgent-all.dev/docs/usage/cloud/github-installation#working-on-github-issues-and-pull-requests",
  },
  {
    key: I18nKey.TIPS$BLOG_SIGNUP,
    link: "https://VAgent-all.dev/blog",
  },
  {
    key: I18nKey.TIPS$API_USAGE,
    link: "https://VAgent-all.dev/docs/api-reference/health-check",
  },
];

export function getRandomTip(): Tip {
  const randomIndex = Math.floor(Math.random() * TIPS.length);
  return TIPS[randomIndex];
}
