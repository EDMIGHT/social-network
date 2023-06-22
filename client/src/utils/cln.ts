import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cln = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export default cln;
