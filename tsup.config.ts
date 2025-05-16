import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  entry: ["src/server/server-demo.ts"],
  format: ["esm"],
  minify: true,
  target: "esnext",
  outDir: "dist",
  outExtension: ({ format }) => ({
    js: ".js",
  }),
  // onSuccess: isDev ? "node dist/cli.js" : undefined,
});
