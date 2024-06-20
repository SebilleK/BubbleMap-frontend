import { Github } from 'lucide-react';

export default function Footer() {
	return (
		<footer className='body-font shadow border-t bg-white mx-auto rounded-t-lg'>
			<div className='container mx-auto px-4 py-2 mx-auto flex items-center sm:flex-row flex-col'>
				<p className='text-sm text-500 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 mt-4'>
					BubbleMap — made by
					<a href='https://github.com/SebilleK' className='hover:text-green-800 ml-1' rel='noopener noreferrer' target='_blank'>
						@SebilleK
					</a>
				</p>
				<span className='inline-flex sm:ml-auto sm:mt-0 mt-4  justify-center sm:justify-start'>
					<a className='ml-3 text-gray-500 hover:text-green-800' href='https://github.com/SebilleK/BubbleMap' rel='noopener noreferrer' target='_blank'>
						<Github />
					</a>
				</span>
			</div>
		</footer>
	);
}
