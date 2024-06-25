import HomepageNavbar from '../HomepageNavbar';
import MoreInfo from '../MoreInfo.tsx';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardTitle } from '../ui/card';
export default function About() {
	return (
		<div className='bg-cover bg-center h-screen'>
			<div className='flex flex-col items-center mb-12'>
				<HomepageNavbar />
			</div>

			<div className='flex flex-col items-center '>
				<div className='w-1/2 mt-24 mb-12 px-12 py-8 bg-white rounded shadow text-lg'>
					<Accordion type='single' collapsible className='w-full'>
						<AccordionItem value='item-1'>
							<AccordionTrigger>What is this?</AccordionTrigger>
							<AccordionContent className='text-base'>
								It's a website that displays Bubble Tea stores close to you! You can login/register, review stores and check out the overall rating and reviews of each store.
							</AccordionContent>
							<AccordionContent></AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-2'>
							<AccordionTrigger>Why did you make it?</AccordionTrigger>
							<AccordionContent className='text-base'>I really like Bubble Tea and thought it would be a fun idea. It's also my Full Stack Webdev course final project!</AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-3'>
							<AccordionTrigger>What is Bubble Tea though?</AccordionTrigger>
							<AccordionContent className='text-base'>
								Wikipedia says that it's a "tea-based drink that originated in Taiwan in the early 1980s". It's really trendy in the west nowadays, and most stores are nice hangout places. More
								importantly, it's really good!
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>

				<Card className='w-1/2 mb-36 p-12 bg-white rounded shadow text-lg'>
					<CardTitle>Attribution</CardTitle>
					<CardContent className='py-4 flex flex-col gap-4'>
						<p className=''>
							Bubble Tea logo icon created by{' '}
							<a className='underline hover:text-green-800 hover:underline hover:underline-offset-4 hover:decoration-2 ' href='https://www.flaticon.com/free-icons/bubble-tea' target='_blank'>
								Luvdat on Flaticon
							</a>
						</p>
						<p className=''>
							Stores marker on Homepage map:{' '}
							<a className='underline hover:text-green-800 hover:underline hover:underline-offset-4 hover:decoration-2' href='https://lucide.dev/icons/store' target='_blank'>
								Store Icon on Lucide
							</a>
						</p>
						<p className=''>
							All remaining icons were also taken from{' '}
							<a className='underline hover:text-green-800 hover:underline hover:underline-offset-4 hover:decoration-2' href='https://lucide.dev/' target='_blank'>
								{' '}
								Lucide
							</a>
						</p>
					</CardContent>
				</Card>
			</div>

			<MoreInfo />
		</div>
	);
}
