import React from "react"
import { Link } from "gatsby"

const marginStyle = {
	margin: '1em 0 2em 0',
}

const flexStyle = {
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "space-between",
	alignItems: "center",
};

const navStyle = {
	padding: '.25em 1em',
	textDecoration: "none",
	boxShadow: 'none',
	borderRadius: '4px',
	color: "#ffffff",
	background: "#007acc",
};

const numberStyle = {
	margin: '0 .25em',
	padding: '.25em 1em',
	textDecoration: "none",
	boxShadow: 'none',
	borderRadius: '4px',
};

const Pagination = ({ numPages, currentPage, prevPage, nextPage, isFirst, isLast }) => {
	return (
		<div
			style={{...flexStyle, ...marginStyle}}
		>
			{!isFirst && (
				<Link to={prevPage} rel="prev" style={navStyle}>
					← Prev
				</Link>
			)}
			{isFirst && (
				<span>&nbsp;</span>
			)}

			<div className="numbering"
				style={flexStyle}>
				{Array.from({ length: numPages }, (_, i) => (
					<Link
						key={`pagination-number${i + 1}`}
						to={`/${i === 0 ? "" : i + 1}`}
						style={{
							...numberStyle,
							color: i + 1 === currentPage ? "#ffffff" : "",
							background: i + 1 === currentPage ? "#007acc" : "",
						}}
					>
						{i + 1}
					</Link>
				))}
			</div>

			{isLast && (
				<span>&nbsp;</span>
			)}
			{!isLast && (
				<Link to={nextPage} rel="next" style={navStyle}>
					Next →
				</Link>
			)}
		</div>
	)
}

export default Pagination
