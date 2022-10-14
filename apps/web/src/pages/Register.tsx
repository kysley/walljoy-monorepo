import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@stitches/react";

// import logoReference from '/Smile_Dark.svg';

import {
	// useAuthenticateSessionMutation,
	// useRegisterMutation,
	useAuthenticateMutation,
} from "../graphql/gen";
import { saveTokens } from "../utils";
import { Stack } from "../components/Stack";
import { Button } from "../components/Button";

export const SessionGate = ({ children }) => {
	const [{ fetching, data: authData }, authenticateSession] =
		useAuthenticateMutation();
	// const [{ fetching, data: authData }, authenticateSession] =
	// 	useAuthenticateSessionMutation();

	const navigate = useNavigate();

	useEffect(() => {
		const qs = new URLSearchParams(location.search);
		const sessionId = qs.get("sId");

		if (sessionId) {
			console.log({ sessionId });
			authenticateSession({ deviceID: sessionId });
		}
	}, []);

	if (!fetching && authData?.authenticate?.valueOf()) {
		// navigate('./');
	}

	return (
		<>
			{/* <Container> */}
			{fetching && <span>Loading...</span>}
			{location.search.indexOf("sId") === -1 && <span>bad url yo</span>}
			{!authData?.authenticate && !fetching && <span>maybe bad session</span>}
			{/* </Container> */}
			{authData?.authenticate?.valueOf() && children}
		</>
	);
};

export const Register = () => {
	const { register, handleSubmit } = useForm();
	// const [dat, mut] = useRegisterMutation();

	const handleFormSubmit = async (data: any) => {
		const qs = new URLSearchParams(location.search);
		const sessionId = qs.get("sId");
		if (!sessionId) {
			return;
		}

		// const res = await mut({ input: { email: data.email, sessionId } });
		// if (!res.error) {
		// 	const token = res.data?.register.token!;
		// 	const refresh = res.data?.register.refreshToken!;
		// 	saveTokens(token, refresh);
		// }
	};
	return (
		<SessionGate>
			<Wrapper>
				<Container>
					{/* <img
						src={logoReference}
						style={{ height: "50px", width: "50px", marginBottom: "75px" }}
					/> */}
					<Stack>
						<h1>Let's get you started!</h1>
						<span>
							All we need is an email, you will be authenticated with your
							current device
						</span>
						<form onSubmit={handleSubmit(handleFormSubmit)}>
							<input {...register("email")} placeholder="Email" />
							<Button type="submit">Register</Button>
						</form>

						<div>
							<h2>already have an account?</h2>
							<Link to={`/authorize${location.search}`}>
								Add this device to your account
							</Link>
						</div>
					</Stack>
				</Container>
			</Wrapper>
		</SessionGate>
	);
};

const Wrapper = styled("div", {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

const Container = styled("div", {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	background: "#e4e4e4",
	padding: "2em",
	borderRadius: "5px",
});
