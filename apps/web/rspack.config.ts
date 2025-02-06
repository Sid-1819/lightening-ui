import * as dotenv from "dotenv";
dotenv.config();

import { rspack } from "@rspack/core";
import * as RefreshPlugin from "@rspack/plugin-react-refresh";
import { defineConfig } from "@rspack/cli";

// Load environment variables


const isDev = process.env.NODE_ENV === "development";
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
  context: __dirname,
  entry: {
    main: "./src/main.tsx"
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"]
  },
  output: {
    path: `${__dirname}/build`,
    filename: "main.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["postcss-loader"],
        type: "css"
      },
      {
        test: /\.svg$/,
        type: "asset"
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev
                  }
                }
              },
              env: { targets }
            }
          }
        ]
      }
    ]
  },
  plugins: [
	new rspack.DefinePlugin({
		'process.env': JSON.stringify({}),
		'import.meta.env.SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL),
		'import.meta.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_ANON_KEY),
		'import.meta.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
	  })
	  
	  
	  ,
    new rspack.HtmlRspackPlugin({
      template: "./index.html"
    }),
    isDev ? new RefreshPlugin() : null
  ].filter(Boolean),
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets }
      })
    ]
  },
  experiments: {
    css: true
  }
});