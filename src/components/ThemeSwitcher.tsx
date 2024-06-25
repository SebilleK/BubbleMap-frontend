import { Switch } from '../components/ui/switch';
import { useTheme } from '../../src/theme/ThemeProvider';
import { SunMoon } from 'lucide-react';
export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	const setThemeChange = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		<div className='flex justify-center items-center gap-1 hidden sm:flex'>
			<SunMoon />
			<Switch onCheckedChange={setThemeChange} />
		</div>
	);
}
