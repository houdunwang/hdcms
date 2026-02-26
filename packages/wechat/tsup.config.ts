import { defineConfig } from "tsup"

export default defineConfig({
	entry: ["src/index.ts"],
	dts: true,
	format: ["esm", "cjs"],
	sourcemap: true,
	clean: true,
	external: ["react", "react-dom", "@tanstack/react-query", "axios", "lucide-react"]
})