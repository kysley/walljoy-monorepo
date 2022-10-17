import { Fragment, ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { styled } from "@stitches/react";

// import logoReference from '/Smile_Dark.svg';

import {
	// useAuthenticateSessionMutation,
	// useRegisterMutation,
	useCreateAccountMutation,
	useMeQuery,
} from "../graphql/gen";
import { Stack } from "../components/Stack";
import { Button } from "../components/Button";

export const SessionGate = ({ children }) => {
	// const [{ fetching, data: authData }, authenticateSession] =
	// 	useAuthenticateMutation();
	// const [{ fetching, data: authData }, authenticateSession] =
	// 	useAuthenticateSessionMutation();
	const [res] = useMeQuery();

	if (res.fetching) {
		return <span>...loading</span>;
	}

	if (res.data?.me) {
		return children;
	}

	// const navigate = useNavigate();

	// useEffect(() => {
	// 	const qs = new URLSearchParams(location.search);
	// 	const name = qs.get("name");
	// 	const deviceId = qs.get("name");
	// 	const sessionId = qs.get("name");

	// 	if (sessionId) {
	// 		console.log({ sessionId });
	// 		authenticateSession({ deviceID: sessionId });
	// 	}
	// }, []);

	// if (!fetching && authData?.authenticate?.valueOf()) {
	// 	// navigate('./');
	// }

	return children;

	// return (
	// 	<>
	// 		{/* <Container> */}
	// 		{fetching && <span>Loading...</span>}
	// 		{location.search.indexOf("sId") === -1 && <span>bad url yo</span>}
	// 		{!authData?.authenticate && !fetching && <span>maybe bad session</span>}
	// 		{/* </Container> */}
	// 		{authData?.authenticate?.valueOf() && children}
	// 	</>
	// );
};

export const Register = () => {
	const [params] = useSearchParams();

	const { register, handleSubmit } = useForm({
		defaultValues: {
			name: params.get("name"),
			deviceId: params.get("deviceId"),
			code: params.get("code"),
			email: "",
		},
	});

	const [step, setStep] = useState(0);
	const [dat, mut] = useCreateAccountMutation();

	const handleFormSubmit = async (data: any) => {
		console.log(data);
		mut(data);
	};

	return (
		<SessionGate>
			<Wrapper>
				<Container>
					{/* <img
						src={logoReference}
						style={{ height: "50px", width: "50px", marginBottom: "75px" }}
					/> */}
					<form onSubmit={handleSubmit(handleFormSubmit)}>
						<Stack>
							<Step
								nextStep={() => setStep((prev) => (prev += 1))}
								prevStep={() => setStep((prev) => (prev -= 1))}
								currentStep={step === 0}
							>
								<h1>Let's get started</h1>
								<span>What do you call this device?</span>
								<input {...register("name")} placeholder={params.name} />
							</Step>
							<Step
								nextStep={() => setStep((prev) => (prev += 1))}
								prevStep={() => setStep((prev) => (prev -= 1))}
								currentStep={step === 1}
								isFinalStep={true}
							>
								<input {...register("email")} placeholder="Email" />
								<Button type="submit">Register</Button>
							</Step>
						</Stack>
					</form>
					<div>
						<h2>already have an account?</h2>
						<Link to={`/authorize${location.search}`}>
							Add this device to your account
						</Link>
					</div>
				</Container>
			</Wrapper>
		</SessionGate>
	);
};

const Step = ({
	children,
	nextStep,
	prevStep,
	isFinalStep = false,
	currentStep,
}: {
	children: ReactNode;
	nextStep(): void;
	prevStep(): void;
	isFinalStep?: Boolean;
	currentStep: boolean;
}) => {
	if (!currentStep) {
		return null;
	}
	return (
		<Fragment>
			{children}
			{isFinalStep ? (
				<button type="submit">sign up</button>
			) : (
				<button onClick={nextStep}>continue</button>
			)}
			<button onClick={prevStep}>go back</button>
		</Fragment>
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
