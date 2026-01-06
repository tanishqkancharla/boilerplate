import { tool } from "@opencode-ai/plugin";

export default tool({
	description:
		"Read the contents of a web page at a given URL. Do NOT use for access to localhost or any other local or non-Internet-accessible URLs; use `curl` via the Bash instead.",
	args: {
		url: tool.schema.string().describe("The URL of the web page to read"),
		objective: tool.schema
			.string()
			.optional()
			.describe(
				"A natural-language description of the research goal. If set, only relevant excerpts will be returned. If not set, the full content of the web page will be returned."
			),
		forceRefetch: tool.schema
			.boolean()
			.optional()
			.describe(
				"Force a live fetch of the URL (default: use a cached version that may be a few days old)"
			),
	},
	async execute(args) {
		const apiKey = process.env.PARALLEL_API_KEY;
		if (!apiKey) {
			throw new Error("PARALLEL_API_KEY environment variable is not set");
		}

		const response = await fetch("https://api.parallel.ai/v1beta/extract", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": apiKey,
				"parallel-beta": "search-extract-2025-10-10",
			},
			body: JSON.stringify({
				url: args.url,
				objective: args.objective,
				force_refetch: args.forceRefetch,
			}),
		});

		if (!response.ok) {
			const error = await response.text();
			throw new Error(`Parallel API error (${response.status}): ${error}`);
		}

		const data = await response.json();

		return typeof data.content === "string"
			? data.content
			: JSON.stringify(data, null, 2);
	},
});
