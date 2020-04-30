import React from 'react';
import FormLogin from '../../components/FormLogin'

const Login = () => {
	return (
		<div className="container h-100">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-8 col-lg-6 text-center">
					<div className="mb-4">
						<img src="./img/eReceta.png" className="w-100" alt="" />
						<div className="version mt-3">
							<span className="h4 mb-0 font-weight-bold text-uppercase">PRo</span>
						</div>
					</div>
					<FormLogin />
				</div>
			</div>
		</div>
	);
}

export default Login;
