export default function Footer() {
	return (
		<footer className='w-full bg-gray-200 flex flex-col items-center text-center py-2.5 bottom-0 left-0  '>
			<nav className=' flex flex-col md:flex-row gap-4'>
				<h3 className='font-mono font-bold'>Attribution</h3>
				<ul className='flex gap-4'>
					<li>
						<a className='underline hover:text-green-800 hover:underline hover:underline-offset-4 hover:decoration-2 ' href='https://www.flaticon.com/free-icons/bubble-tea' target='_blank'>
							Bubble tea icons created by Luvdat - Flaticon
						</a>
					</li>
					<li>
						<a
							className='underline hover:text-green-800 hover:underline hover:underline-offset-4 hover:decoration-2 '
							href='https://unsplash.com/photos/clear-plastic-container-dHQQv-BKTjo'
							target='_blank'
						>
							Photo by Orimi Protograph on Unsplash
						</a>
					</li>
				</ul>
				<h3 className='font-mono font-bold'>Learn more</h3>
				<ul>
					<li>
						<a className='underline hover:text-green-800 hover:underline hover:underline-offset-4 hover:decoration-2 ' href='https://github.com/SebilleK/BubbleMap' target='_blank'>
							Github repository
						</a>
					</li>
				</ul>
			</nav>
		</footer>
	);
}
