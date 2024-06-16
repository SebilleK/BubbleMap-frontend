import Navbar from './Navbar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function About() {
	return (
		<div className='bg-gray-100'>
			<Navbar />
			<div className='flex flex-col items-center'>
				<div className='w-1/2 mt-44 mb-44 p-14 bg-white rounded shadow'>
					<Accordion type='single' collapsible className='w-full'>
						<AccordionItem value='item-1'>
							<AccordionTrigger>What is this?</AccordionTrigger>
							<AccordionContent>
								It's a website that displays Bubble Tea stores close to you! You can login/register, review stores and check out the overall rating and reviews of each store.
							</AccordionContent>
							<AccordionContent></AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-2'>
							<AccordionTrigger>Why did you make it?</AccordionTrigger>
							<AccordionContent>I thought it would be a fun idea and it's also my Full Stack Webdev course final project! Check out its Github repository here.</AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-3'>
							<AccordionTrigger>What is Bubble Tea though?</AccordionTrigger>
							<AccordionContent>
								Wikipedia says that it's a "tea-based drink that originated in Taiwan in the early 1980s". It's really trendy in the west nowadays, and most stores are nice hangout places. More
								importantly, it's really good!
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
			<div className='flex flex-col items-center'>
				<h1>Attribution</h1>
				<h2>Icons</h2>
				<a className='text-blue-500 hover:underline' href='https://www.flaticon.com/free-icons/bubble-tea' title='bubble tea icons'>
					Bubble tea icons created by Luvdat - Flaticon
				</a>
				<h2>Homepage Image</h2>
				<div>
					Photo by{' '}
					<a className='text-blue-500 hover:underline' href='https://unsplash.com/@orimi_pic?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'>
						Orimi Protograph
					</a>{' '}
					on{' '}
					<a className='text-blue-500 hover:underline' href='https://unsplash.com/photos/clear-plastic-container-dHQQv-BKTjo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'>
						Unsplash
					</a>
				</div>
			</div>
		</div>
	);
}
