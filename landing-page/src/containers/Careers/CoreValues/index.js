import dynamic from 'next/dynamic';

export default dynamic(() => import('./CoreValues'), { ssr: false });
