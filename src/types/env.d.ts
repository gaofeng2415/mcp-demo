interface ImportMetaEnv {
  readonly VITE_OPENAI_BASE_URL: string;
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_OPENAI_AGENT_NAME: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
