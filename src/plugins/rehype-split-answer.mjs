import { h } from "hastscript";
import { EXIT, visit } from "unist-util-visit";

function collectText(node) {
	if (node.type === "text") return node.value;
	if (Array.isArray(node.children)) {
		return node.children.map(collectText).join("");
	}
	return "";
}

/**
 * 将面试题正文里「## 参考答案」之后的内容，包裹进一个可折叠的
 * <details class="answer-section"> 容器，summary 文案为「查看答案」。
 * 递归查找标题，避免 remarkSectionize 把标题包进 <section> 后无法命中。
 */
export default function rehypeSplitAnswer() {
	return (tree) => {
		let answerParent = null;
		let answerIndex = -1;

		visit(tree, "element", (node, index, parent) => {
			if (
				node.tagName === "h2" &&
				collectText(node).trim() === "参考答案"
			) {
				answerParent = parent;
				answerIndex = index;
				return EXIT;
			}
		});

		if (!answerParent || answerIndex < 0) return;

		const answerNodes = answerParent.children.slice(answerIndex + 1);
		const details = h(
			"details",
			{ className: ["answer-section"] },
			[
				h("summary", ["查看答案"]),
				h("div", { className: ["answer-body"] }, answerNodes),
			],
		);

		answerParent.children = [
			...answerParent.children.slice(0, answerIndex),
			details,
		];
	};
}
