import React from 'react';
import { Paper } from '@material-ui/core'
import FormLogin from '../../components/FormLogin'

const Login = () => {
	return (
		<div className="container h-100">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-8 col-lg-6 text-center">
					<div className="mb-4">
						<img src="./img/eReceta.png" className="w-100" alt="" />
						<div className="version mt-3">
							<span className="h4 mb-0 font-weight-bold text-uppercase">{window.properties.version}</span>
						</div>
					</div>
					<Paper className="pb-2 pt-4" elevation={3}>
						<FormLogin />
					</Paper>
				</div>
			</div>
		</div>
	);
}

export default Login;
