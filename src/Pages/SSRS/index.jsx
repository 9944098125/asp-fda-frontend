import React from "react";

const Ssrs = () => {
	const openExternalLink = (url) => {
		window.open(url, "_blank");
	};

	return (
		<div className="p-5">
			<p className="fs-4 text-success">
				Click the link to navigate to an external page without a full reload:
			</p>
			<button className="btn btn-warning py-2 px-5 text-white">
				<a
					href="http://65.0.84.221/Reports/report/Report_for_Embedding_Task/Cross_tabulation"
					target="_blank"
					rel="noopener noreferrer"
					onClick={(e) => {
						e.preventDefault();
						openExternalLink(e.currentTarget.href);
					}}
					style={{ textDecoration: "none", color: "inherit" }}>
					External Link
				</a>
			</button>
		</div>
	);
};

export default Ssrs;
