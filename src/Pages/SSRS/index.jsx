import React from "react";
import { Link } from "react-router-dom";

export default function Ssrs() {
	return (
		<React.Fragment>
			<div className="p-5">
				<h1 className="text-success fs-4">
					CLICK THE BELOW BUTTON TO HAVE A LOOK AT SSRS REPORTS:
				</h1>
				<Link
					to="http://65.0.84.221/Reports/report/Report_for_Embedding_Task/Cross_tabulation"
					style={{ textDecoration: "none", color: "grey" }}>
					<button className="btn btn-warning py-2 px-5">Click Me !</button>
				</Link>
			</div>
		</React.Fragment>
	);
}
