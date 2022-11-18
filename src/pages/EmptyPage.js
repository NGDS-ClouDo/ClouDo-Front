import React from 'react';
import {useNavigate, useParams } from "react-router-dom";

const EmptyPage = ()=>{
	const navigate = useNavigate();
	return(
		<div onLoad={navigate(
			"/"
		)} onTransitionEnd={navigate(
			"/"
		)}>
		</div>);
}
export default EmptyPage;