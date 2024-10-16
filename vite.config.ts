import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cep, runAction } from "vite-cep-plugin";
import cepConfig from "./cep.config";
import path from "path";
import { extendscriptConfig } from "./vite.es.config";

const extensions = [".js", ".ts", ".tsx"];

const src = path.resolve(__dirname, "src");
const root = path.resolve(src, "js");
const outDir = path.resolve(__dirname, "dist", "cep");

const devDist = "dist";
const cepDist = "cep";

const debugReact = process.env.DEBUG_REACT === "true";
const isProduction = process.env.NODE_ENV === "production";
const isMetaPackage = process.env.ZIP_PACKAGE === "true";
const isPackage = process.env.ZXP_PACKAGE === "true" || isMetaPackage;
const isServe = process.env.SERVE_PANEL === "true" || !isProduction; // Default to true in development
const action = process.env.ACTION;

let input = {};
cepConfig.panels.forEach((panel) => {
  input[panel.name] = path.resolve(root, panel.mainPath);
});

const config = {
  cepConfig,
  isProduction,
  isPackage,
  isMetaPackage,
  isServe,
  debugReact,
  dir: `${__dirname}/${devDist}`,
  cepDist: cepDist,
  zxpDir: `${__dirname}/${devDist}/zxp`,
  zipDir: `${__dirname}/${devDist}/zip`,
  packages: cepConfig.installModules || [],
};

if (action) {
  runAction(config, action);
  process.exit();
}

export default defineConfig({
  plugins: [
    react(),
    cep(config),
  ],
  resolve: {
    alias: [{ find: "@esTypes", replacement: path.resolve(__dirname, "src") }],
  },
  root,
  clearScreen: false,
  server: {
    port: cepConfig.port,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: cepConfig.port,
    },
    watch: {
      usePolling: true, // Optional: Use polling if file changes aren't detected
      interval: 100,    // Optional: Adjust the polling interval
    },
  },
  build: {
    sourcemap: isPackage ? cepConfig.zxp.sourceMap : cepConfig.build?.sourceMap,
    rollupOptions: {
      input,
      output: {
        manualChunks: {},
        preserveModules: false,
        format: "cjs",
      },
    },
    target: "chrome74",
    outDir,
  },
});
