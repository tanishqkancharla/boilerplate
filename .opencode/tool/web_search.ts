import { tool } from "@opencode-ai/plugin";

export default tool({
	description: "Search the web for information relevant to a research objective",
	args: {
		objective: tool.schema
			.string()
			.describe(
				"A natural-language description of the broader task or research goal, including any source or freshness guidance"
			),
		search_queries: tool.schema
			.array(tool.schema.string())
			.optional()
			.describe(
				"Optional keyword queries to ensure matches for specific terms are prioritized"
			),
		max_results: tool.schema
			.number()
			.optional()
			.default(5)
			.describe("The maximum number of results to return (default: 5)"),
	},
	async execute(args) {
		const apiKey = process.env.PARALLEL_API_KEY;
		if (!apiKey) {
			throw new Error("PARALLEL_API_KEY environment variable is not set");
		}

		const response = await fetch("https://api.parallel.ai/v1beta/search", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": apiKey,
				"parallel-beta": "search-extract-2025-10-10",
			},
			body: JSON.stringify({
				objective: args.objective,
				search_queries: args.search_queries,
				max_results: args.max_results,
				mode: "agentic",
			}),
		});

		if (!response.ok) {
			const error = await response.text();
			throw new Error(`Parallel API error (${response.status}): ${error}`);
		}

		const data = await response.json();

		const results = data.results.map(
			(result: {
				title?: string;
				url?: string;
				excerpt?: string;
			}) => ({
				title: result.title,
				url: result.url,
				excerpt: result.excerpt,
			})
		);

		return JSON.stringify(results, null, 2);
	},
});
