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
									<a href='https://github.com/SebilleK/BubbleMap' className='hover:text-green-800 dark:hover:text-pink-400 ml-1' rel='noopener noreferrer' target='_blank'>
										@BubbleMap
									</a>{' '}
									— Check out this project on Github!
								</p>
								<p>
									<a href='https://github.com/SebilleK' className='hover:text-green-800 dark:hover:text-pink-400 ml-1' rel='noopener noreferrer' target='_blank'>
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
}
