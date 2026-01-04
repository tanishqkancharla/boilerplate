import React from "react";
import ReactDOM from "react-dom/client";

export function add(x: number, y: number) {
	return x + y;
}

function Index() {
	return <div>Hi! 2+2={add(2, 2)}</div>;
}

function run() {
	const container = document.createElement("main");
	document.body.appendChild(container);
	const root = ReactDOM.createRoot(container);
	root.render(<Index />);
}

if (typeof window !== "undefined") {
	// If in browser context
	run();
}
