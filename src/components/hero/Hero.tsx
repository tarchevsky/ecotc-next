interface HeroProps {
	title: string
	subtitle: string
	buttonText: string
}

const Hero = ({ title, subtitle, buttonText }: HeroProps) => {
	return (
		<main className='hero min-h-screen bg-base-200'>
			<div className='hero-content text-center'>
				<div className='max-w-md'>
					<h1 className='text-5xl font-bold'>{title}</h1>
					<p className='py-6'>{subtitle}</p>
					<button className='btn btn-primary'>{buttonText}</button>
				</div>
			</div>
		</main>
	)
}

export default Hero
