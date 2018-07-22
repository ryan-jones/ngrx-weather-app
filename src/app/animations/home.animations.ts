import { trigger, transition, query, animate, style, keyframes } from '@angular/animations';

export const textReveal = trigger('textReveal', [
	transition(':enter', [
		query('h1, h2, p', style({ opacity: 0 })),
		query('h1, h2', [
			animate('600ms 100ms',
				keyframes([
					style({ opacity: 0, transform: `translateY(-50px)`, offset: 0 }),
					style({ opacity: 0.5, transform: `translateY(-10px)`, offset: 0.3 }),
					style({ opacity: 1, transform: `translateY(5px)`, offset: 0.7 }),
					style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
				])
			)
		], { optional: true }),
		query('p', [
			animate('600ms 100ms',
			keyframes([
				style({ opacity: 0, transform: `scale(0)`, offset: 0 }),
				style({ opacity: 0.5, transform: `scale(0.3)`, offset: 0.3 }),
				style({ opacity: 1, transform: `scale(1.2)`, offset: 0.7 }),
				style({ opacity: 1, transform: 'scale(1)', offset: 1 })
			])
		)
		], { optional: true })
	])
]);
