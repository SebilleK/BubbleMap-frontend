import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '@/store/authSlice';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useEffect } from 'react';
import { CircleAlert } from 'lucide-react';

export default function AlertMessage() {
	const dispatch = useDispatch();

	const errorMessage = useSelector((state: any) => state.auth.alertMessage);
	const alertVisibility = useSelector((state: any) => state.auth.alert);

	useEffect(() => {
		if (alertVisibility) {
			const timer = setTimeout(() => {
				dispatch(setAlert(false));
			}, 4000); // 4 seconds

			return () => clearTimeout(timer);
		}
	}, [alertVisibility, dispatch]);
	return (
		<div className='fixed w-1/4 bottom-20 right-10 '>
			<Alert>
				<div className='flex items-center gap-2'>
					<CircleAlert />
					<AlertTitle>
						<h1 className='text-xl'>Error</h1>
					</AlertTitle>
				</div>
				<AlertDescription>{errorMessage}</AlertDescription>
			</Alert>

			<button onClick={() => dispatch(setAlert(false))}></button>
		</div>
	);
}
