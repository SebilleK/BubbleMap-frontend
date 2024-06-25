import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Info } from 'lucide-react';

export default function MoreInfo() {
	return (
		<div className='fixed top-0 right-0 m-4'>
			<Dialog>
				<DialogTrigger>
					{' '}
					<Info />
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Extra Info</DialogTitle>
						<DialogDescription>
							<div className='flex flex-col gap-2'>
								<p>
									<a href='https://github.com/SebilleK/BubbleMap' className='hover:text-green-800 ml-1' rel='noopener noreferrer' target='_blank'>
										@BubbleMap
									</a>{' '}
									— Check out this project on Github!
								</p>
								<p>
									<a href='https://github.com/SebilleK' className='hover:text-green-800 ml-1' rel='noopener noreferrer' target='_blank'>
										@SebilleK
									</a>{' '}
								</p>
							</div>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
	{
		/* <footer className='body-font shadow border-t bg-white mx-auto rounded-t-lg'>
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
		</footer> */
	}
}
