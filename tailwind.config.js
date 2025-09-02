/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				// CHOP DE PANELA Brand Colors
				'brand-amber': {
					DEFAULT: 'hsl(var(--brand-amber))',
					50: 'hsl(var(--brand-amber-50))',
					100: 'hsl(var(--brand-amber-100))',
					200: 'hsl(var(--brand-amber-200))',
					300: 'hsl(var(--brand-amber-300))',
					400: 'hsl(var(--brand-amber-400))',
					500: 'hsl(var(--brand-amber-500))',
					600: 'hsl(var(--brand-amber-600))',
					700: 'hsl(var(--brand-amber-700))',
					800: 'hsl(var(--brand-amber-800))',
					900: 'hsl(var(--brand-amber-900))',
				},
				'brand-foam': 'hsl(var(--brand-foam))',
				'brand-brown': 'hsl(var(--brand-brown))',
				'brand-wheat': 'hsl(var(--brand-wheat))',
				'brand-rose': 'hsl(var(--brand-rose))',
				'brand-olive': 'hsl(var(--brand-olive))',
				'brand-slate': 'hsl(var(--brand-slate))',
				'brand-steel': 'hsl(var(--brand-steel))'
			},
			backgroundImage: {
				'gradient-beer': 'var(--gradient-beer)',
				'gradient-foam': 'var(--gradient-foam)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-card': 'var(--gradient-card)'
			},
			boxShadow: {
				'beer': 'var(--shadow-beer)',
				'foam': 'var(--shadow-foam)',
				'glow': 'var(--shadow-glow)'
			},
			transitionTimingFunction: {
				'beer': 'var(--transition-beer)',
				'bubble': 'var(--transition-bubble)'
			},
			fontFamily: {
				'beer-heading': ['Bebas Neue', 'Arial Black', 'sans-serif'],
				'inter': ['Inter', 'system-ui', 'sans-serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'heart-pulse': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.1)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'confetti': {
					'0%': { transform: 'translateY(-100px) rotateZ(0deg)', opacity: '1' },
					'100%': { transform: 'translateY(100vh) rotateZ(720deg)', opacity: '0' }
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-out',
				'enter': 'fade-in 0.3s ease-out, scale-in 0.2s ease-out',
				'exit': 'fade-out 0.3s ease-out, scale-out 0.2s ease-out',
				'heart-pulse': 'heart-pulse 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'confetti': 'confetti 3s ease-out forwards',
				'wiggle': 'wiggle 1s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}
