'use client';
import React, { memo } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from 'lucide-react';
import Image from 'next/image';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	
	{
		label: 'Company',
		links: [
			{ title: 'FAQs', href: '/faqs' },
			{ title: 'About Us', href: '/about' },
			{ title: 'Privacy Policy', href: '/privacy' },
			{ title: 'Terms of Services', href: '/terms' },
		],
	},
	
	{
		label: 'Social Links',
		links: [
			{ title: 'Facebook', href: '#', icon: FacebookIcon },
			{ title: 'Instagram', href: '#', icon: InstagramIcon },
			{ title: 'Youtube', href: '#', icon: YoutubeIcon },
			{ title: 'LinkedIn', href: '#', icon: LinkedinIcon },
		],
	},
];

const Footer = memo(function Footer() {
	return (
		<footer className="relative w-full flex flex-col items-center justify-center rounded-t-4xl md:rounded-t-6xl border-t bg-black px-6 py-12 lg:py-16">
			<div className="absolute inset-0 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] pointer-events-none rounded-t-4xl md:rounded-t-6xl" />
			<div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="relative grid w-full max-w-7xl mx-auto gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4 flex flex-col items-center xl:items-start">
					<Image src="/trawerse.svg" alt="Trawerse Logo" width={120} height={24} className=" h-6 w-auto" />
					<p className="text-muted-foreground  text-sm md:mt-0 text-center xl:text-left">
						© {new Date().getFullYear()} Trawerse. All rights reserved.
					</p>
					<div className="flex items-center gap-2 text-base text-muted-foreground pt-4 border-t border-white/5">
						<span>Crafted by</span>
						<span className="font-semibold text-white text-lg">Abdul Shahid</span>
						<Image src="/sign.png" alt="Abdul Shahid Signature" width={120} height={32} className="h-8 w-auto ml-1" />
					</div>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs">{section.label}</h3>
								<ul className="text-muted-foreground mt-4 space-y-2 text-sm">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
												href={link.href}
												className="hover:text-foreground inline-flex items-center transition-all duration-300"
											>
												{link.icon && <link.icon className="me-1 size-4" />}
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
});

export { Footer };

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
};
